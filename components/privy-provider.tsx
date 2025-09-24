"use client"

import { PrivyProvider as PrivyClientProvider } from "@privy-io/react-auth"
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector"
import { PRIVY_APP_ID, WALLET_CONFIG, SUPPORTED_CHAINS } from "@/lib/privy-config"
import type { ReactNode } from "react"
import { WagmiConfig, createConfig } from "wagmi"

interface PrivyProviderProps {
  children: ReactNode
}

// Configure wagmi with a simpler setup
const config = createConfig({
  autoConnect: true,
  // Use a simplified provider setup
  publicClient: () => ({
    chain: SUPPORTED_CHAINS[0],
    transport: {
      type: "http",
      url: SUPPORTED_CHAINS[0].rpcUrls.default.http[0],
    },
  }),
})

export function PrivyProvider({ children }: PrivyProviderProps) {
  return (
    <WagmiConfig config={config}>
      <PrivyClientProvider
        appId={PRIVY_APP_ID}
        config={{
          loginMethods: ["email", "wallet"],
          appearance: {
            theme: "light",
            accentColor: "#5945FD", // Match the primary color
            logo: "https://raw.githubusercontent.com/digimercados/Graphics/refs/heads/main/D%20of%20DigiPaya%20Fury%20logo.jpg",
          },
          embeddedWallets: WALLET_CONFIG.embeddedWallets,
        }}
      >
        <PrivyWagmiConnector wagmiChainsConfig={SUPPORTED_CHAINS}>{children}</PrivyWagmiConnector>
      </PrivyClientProvider>
    </WagmiConfig>
  )
}
