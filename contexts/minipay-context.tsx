"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { ethers } from "ethers"
import { isMiniPay } from "@/lib/minipay"
import { STABLECOIN_CONTRACTS } from "@/lib/token-contracts"

interface MiniPayContextType {
  isConnected: boolean
  account: string | null
  provider: ethers.BrowserProvider | null
  isMiniPayBrowser: boolean
  tokenBalances: Record<string, bigint>
  refreshBalances: () => Promise<void>
}

const MiniPayContext = createContext<MiniPayContextType>({
  isConnected: false,
  account: null,
  provider: null,
  isMiniPayBrowser: false,
  tokenBalances: {},
  refreshBalances: async () => {},
})

export const useMiniPay = () => useContext(MiniPayContext)

interface MiniPayProviderProps {
  children: ReactNode
}

export function MiniPayProvider({ children }: MiniPayProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [isMiniPayBrowser, setIsMiniPayBrowser] = useState(false)
  const [tokenBalances, setTokenBalances] = useState<Record<string, bigint>>({})

  useEffect(() => {
    const init = async () => {
      // Check if running in MiniPay browser
      const miniPayDetected = isMiniPay()
      setIsMiniPayBrowser(miniPayDetected)

      if (miniPayDetected && window.ethereum) {
        // Get provider
        const provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(provider)

        try {
          // Request accounts
          await provider.send("eth_requestAccounts", [])

          // Get connected account
          const signer = await provider.getSigner()
          const connectedAccount = await signer.getAddress()

          if (connectedAccount) {
            setAccount(connectedAccount)
            setIsConnected(true)

            // Refresh balances
            await refreshBalances(provider, connectedAccount)
          }
        } catch (error) {
          console.error("Error connecting to MiniPay:", error)
        }
      }
    }

    init()

    // Setup account change listener
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
          if (provider) {
            await refreshBalances(provider, accounts[0])
          }
        } else {
          setAccount(null)
          setIsConnected(false)
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  const refreshBalances = async (currentProvider?: ethers.BrowserProvider | null, currentAccount?: string | null) => {
    const providerToUse = currentProvider || provider
    const accountToUse = currentAccount || account

    if (!providerToUse || !accountToUse) return

    const balances: Record<string, bigint> = {}

    // Get balances for active stablecoins
    for (const [symbol, token] of Object.entries(STABLECOIN_CONTRACTS)) {
      if (token.isActive) {
        try {
          const tokenContract = new ethers.Contract(
            token.address,
            ["function balanceOf(address owner) view returns (uint256)"],
            providerToUse,
          )

          const balance = await tokenContract.balanceOf(accountToUse)
          balances[symbol] = balance
        } catch (error) {
          console.error(`Error getting ${symbol} balance:`, error)
        }
      }
    }

    setTokenBalances(balances)
  }

  return (
    <MiniPayContext.Provider
      value={{
        isConnected,
        account,
        provider,
        isMiniPayBrowser,
        tokenBalances,
        refreshBalances: async () => refreshBalances(),
      }}
    >
      {children}
    </MiniPayContext.Provider>
  )
}
