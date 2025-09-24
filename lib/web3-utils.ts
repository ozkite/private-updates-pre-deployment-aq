import { ethers } from "ethers"
import { STABLECOIN_CONTRACTS } from "./token-contracts"

// Send ERC20 token
export async function sendToken(
  signer: ethers.Signer,
  tokenAddress: string,
  to: string,
  amount: string | ethers.BigNumber,
): Promise<ethers.providers.TransactionResponse | null> {
  try {
    if (!signer) throw new Error("Signer not available")

    // ERC20 transfer function signature
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function transfer(address to, uint256 amount) returns (bool)"],
      signer,
    )

    // Send transaction
    return await tokenContract.transfer(to, amount)
  } catch (error) {
    console.error("Error sending token:", error)
    return null
  }
}

// Get token balance
export async function getTokenBalance(
  provider: ethers.providers.Provider,
  tokenAddress: string,
  address: string,
): Promise<ethers.BigNumber | null> {
  try {
    if (!provider) throw new Error("Provider not available")
    if (!address) throw new Error("No account address provided")

    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address owner) view returns (uint256)"],
      provider,
    )

    return await tokenContract.balanceOf(address)
  } catch (error) {
    console.error("Error getting token balance:", error)
    return null
  }
}

// Format token amount with proper decimals
export function formatTokenAmount(amount: ethers.BigNumber, decimals: number): string {
  return ethers.utils.formatUnits(amount, decimals)
}

// Parse token amount from string to BigNumber
export function parseTokenAmount(amount: string, decimals: number): ethers.BigNumber {
  return ethers.utils.parseUnits(amount, decimals)
}

// Get token contract by symbol
export function getTokenContract(provider: ethers.providers.Provider, symbol: string): ethers.Contract | null {
  const token = STABLECOIN_CONTRACTS[symbol as keyof typeof STABLECOIN_CONTRACTS]
  if (!token) return null

  return new ethers.Contract(
    token.address,
    [
      "function balanceOf(address owner) view returns (uint256)",
      "function transfer(address to, uint256 amount) returns (bool)",
      "function allowance(address owner, address spender) view returns (uint256)",
      "function approve(address spender, uint256 amount) returns (bool)",
    ],
    provider,
  )
}
