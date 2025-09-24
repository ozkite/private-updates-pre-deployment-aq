// Privy configuration for wallet connection

export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cloning-digipaga"

// Supported chains for the app
export const SUPPORTED_CHAINS = [
  {
    id: 42220,
    name: "Celo",
    network: "celo",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://forno.celo.org"],
      },
      public: {
        http: ["https://forno.celo.org"],
      },
    },
    blockExplorers: {
      default: {
        name: "Celo Explorer",
        url: "https://explorer.celo.org",
      },
    },
  },
  {
    id: 44787,
    name: "Celo Alfajores",
    network: "celo-alfajores",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://alfajores-forno.celo-testnet.org"],
      },
      public: {
        http: ["https://alfajores-forno.celo-testnet.org"],
      },
    },
    blockExplorers: {
      default: {
        name: "Celo Explorer",
        url: "https://explorer.celo.org/alfajores",
      },
    },
    testnet: true,
  },
]

// Default chain to connect to
export const DEFAULT_CHAIN = SUPPORTED_CHAINS[0]

// Wallet configuration options
export const WALLET_CONFIG = {
  embeddedWallets: {
    createOnLogin: true,
    noPromptOnSignature: true,
  },
  defaultChain: DEFAULT_CHAIN,
  supportedChains: SUPPORTED_CHAINS,
}

// Get explorer URL for a transaction hash
export function getExplorerUrl(txHash: string, chainId: number = DEFAULT_CHAIN.id): string {
  const chain = SUPPORTED_CHAINS.find((c) => c.id === chainId) || DEFAULT_CHAIN
  return `${chain.blockExplorers?.default.url}/tx/${txHash}`
}

// Get explorer URL for an address
export function getAddressExplorerUrl(address: string, chainId: number = DEFAULT_CHAIN.id): string {
  const chain = SUPPORTED_CHAINS.find((c) => c.id === chainId) || DEFAULT_CHAIN
  return `${chain.blockExplorers?.default.url}/address/${address}`
}
