"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { DEFAULT_CHAIN } from "@/lib/privy-config"

interface WalletContextType {
  isConnected: boolean
  account: string | null
  chainId: number
  connectWallet: () => void
  disconnectWallet: () => void
  isLoading: boolean
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  account: null,
  chainId: DEFAULT_CHAIN.id,
  connectWallet: () => {},
  disconnectWallet: () => {},
  isLoading: false,
})

export const useWallet = () => useContext(WalletContext)

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const { login, logout, authenticated, ready, user } = usePrivy()
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Update connection status when Privy auth state changes
  useEffect(() => {
    if (ready) {
      setIsConnected(authenticated)
      setAccount(user?.wallet?.address || null)
      setIsLoading(false)
    }
  }, [authenticated, ready, user])

  // Connect wallet
  const connectWallet = () => {
    if (!authenticated) {
      login()
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    if (authenticated) {
      logout()
    }
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        account,
        chainId: DEFAULT_CHAIN.id,
        connectWallet,
        disconnectWallet,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
