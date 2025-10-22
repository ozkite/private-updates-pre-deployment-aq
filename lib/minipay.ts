import { ethers } from "ethers"
import { STABLECOIN_CONTRACTS } from "./token-contracts"

// Default fee currency (cUSD)
export const DEFAULT_FEE_CURRENCY = STABLECOIN_CONTRACTS.cUSD.address

// Check if running in MiniPay
export function isMiniPay(): boolean {
  return !!(window.ethereum && window.ethereum.isMiniPay)
}

// Get provider from MiniPay
export function getMiniPayProvider(): ethers.BrowserProvider | null {
  if (!isMiniPay()) return null
  return new ethers.BrowserProvider(window.ethereum)
}

// Get signer from MiniPay
export async function getMiniPaySigner(): Promise<ethers.Signer | null> {
  const provider = getMiniPayProvider()
  if (!provider) return null
  return provider.getSigner()
}

// Get connected account address
export async function getConnectedAccount(): Promise<string | null> {
  try {
    const provider = getMiniPayProvider()
    if (!provider) return null

    const accounts = await provider.listAccounts()
    return accounts[0]?.address || null
  } catch (error) {
    console.error("Error getting connected account:", error)
    return null
  }
}

// Create transaction with fee currency
export function createTransaction(
  to: string,
  value: string | bigint,
  data = "0x",
  feeCurrency: string = DEFAULT_FEE_CURRENCY,
): ethers.TransactionRequest {
  return {
    to,
    value,
    data,
    feeCurrency,
    gasLimit: 200000, // Default gas limit
  } as ethers.TransactionRequest
}

// Send transaction with fee abstraction
export async function sendTransaction(
  to: string,
  value: string | bigint,
  data = "0x",
  feeCurrency: string = DEFAULT_FEE_CURRENCY,
): Promise<ethers.TransactionResponse | null> {
  try {
    const signer = await getMiniPaySigner()
    if (!signer) throw new Error("MiniPay signer not available")

    const tx = createTransaction(to, value, data, feeCurrency)
    return await signer.sendTransaction(tx)
  } catch (error) {
    console.error("Error sending transaction:", error)
    return null
  }
}

// Send ERC20 token
export async function sendToken(
  tokenAddress: string,
  to: string,
  amount: string | bigint,
  feeCurrency: string = DEFAULT_FEE_CURRENCY,
): Promise<ethers.TransactionResponse | null> {
  try {
    const signer = await getMiniPaySigner()
    if (!signer) throw new Error("MiniPay signer not available")

    // ERC20 transfer function signature
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function transfer(address to, uint256 amount) returns (bool)"],
      signer,
    )

    // Create transaction with fee currency
    const tx = await tokenContract.transfer.populateTransaction(to, amount)
    tx.feeCurrency = feeCurrency
    tx.gasLimit = 200000

    return await signer.sendTransaction(tx)
  } catch (error) {
    console.error("Error sending token:", error)
    return null
  }
}

// Get token balance
export async function getTokenBalance(tokenAddress: string, address?: string): Promise<bigint | null> {
  try {
    const provider = getMiniPayProvider()
    if (!provider) throw new Error("MiniPay provider not available")

    const account = address || (await getConnectedAccount())
    if (!account) throw new Error("No account available")

    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address owner) view returns (uint256)"],
      provider,
    )

    return await tokenContract.balanceOf(account)
  } catch (error) {
    console.error("Error getting token balance:", error)
    return null
  }
}
