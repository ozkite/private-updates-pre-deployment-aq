"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Crypto {
  symbol: string
  name: string
  logo: string
}

const CRYPTOCURRENCIES: Crypto[] = [
  { symbol: "BTC", name: "Bitcoin", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { symbol: "ETH", name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { symbol: "USDT", name: "Tether", logo: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  { symbol: "BNB", name: "BNB", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png" },
  { symbol: "SOL", name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  { symbol: "USDC", name: "USD Coin", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png" },
  { symbol: "XRP", name: "XRP", logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png" },
  { symbol: "DOGE", name: "Dogecoin", logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png" },
  { symbol: "ADA", name: "Cardano", logo: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
  { symbol: "AVAX", name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png" },
  { symbol: "SHIB", name: "Shiba Inu", logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png" },
  { symbol: "DOT", name: "Polkadot", logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png" },
  { symbol: "TON", name: "Toncoin", logo: "https://cryptologos.cc/logos/toncoin-ton-logo.png" },
  { symbol: "LINK", name: "Chainlink", logo: "https://cryptologos.cc/logos/chainlink-link-logo.png" },
  { symbol: "MATIC", name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.png" },
  { symbol: "TRX", name: "TRON", logo: "https://cryptologos.cc/logos/tron-trx-logo.png" },
  { symbol: "UNI", name: "Uniswap", logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png" },
  { symbol: "BCH", name: "Bitcoin Cash", logo: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png" },
  { symbol: "APT", name: "Aptos", logo: "https://cryptologos.cc/logos/aptos-apt-logo.png" },
  { symbol: "ICP", name: "Internet Computer", logo: "https://cryptologos.cc/logos/internet-computer-icp-logo.png" },
  { symbol: "FIL", name: "Filecoin", logo: "https://cryptologos.cc/logos/filecoin-fil-logo.png" },
  { symbol: "ARB", name: "Arbitrum", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png" },
  { symbol: "NEAR", name: "NEAR Protocol", logo: "https://cryptologos.cc/logos/near-protocol-near-logo.png" },
  { symbol: "OP", name: "Optimism", logo: "https://cryptologos.cc/logos/optimism-op-logo.png" },
  { symbol: "PEPE", name: "Pepe", logo: "https://cryptologos.cc/logos/pepe-pepe-logo.png" },
  { symbol: "MKR", name: "Maker", logo: "https://cryptologos.cc/logos/maker-mkr-logo.png" },
  { symbol: "RUNE", name: "THORChain", logo: "https://cryptologos.cc/logos/thorchain-rune-logo.png" },
  { symbol: "GRT", name: "The Graph", logo: "https://cryptologos.cc/logos/the-graph-grt-logo.png" },
  { symbol: "INJ", name: "Injective", logo: "https://cryptologos.cc/logos/injective-inj-logo.png" },
  { symbol: "STX", name: "Stacks", logo: "https://cryptologos.cc/logos/stacks-stx-logo.png" },
  { symbol: "AAVE", name: "Aave", logo: "https://cryptologos.cc/logos/aave-aave-logo.png" },
  { symbol: "ATOM", name: "Cosmos", logo: "https://cryptologos.cc/logos/cosmos-atom-logo.png" },
  { symbol: "SUI", name: "Sui", logo: "https://cryptologos.cc/logos/sui-sui-logo.png" },
  { symbol: "HBAR", name: "Hedera", logo: "https://cryptologos.cc/logos/hedera-hbar-logo.png" },
  { symbol: "ALGO", name: "Algorand", logo: "https://cryptologos.cc/logos/algorand-algo-logo.png" },
  { symbol: "CELO", name: "Celo", logo: "https://cryptologos.cc/logos/celo-celo-logo.png" },
  { symbol: "XLM", name: "Stellar", logo: "https://cryptologos.cc/logos/stellar-xlm-logo.png" },
  { symbol: "FLOW", name: "Flow", logo: "https://cryptologos.cc/logos/flow-flow-logo.png" },
  { symbol: "MANA", name: "Decentraland", logo: "https://cryptologos.cc/logos/decentraland-mana-logo.png" },
  { symbol: "ENJ", name: "Enjin Coin", logo: "https://cryptologos.cc/logos/enjin-coin-enj-logo.png" },
  { symbol: "ZEC", name: "Zcash", logo: "https://cryptologos.cc/logos/zcash-zec-logo.png" },
  { symbol: "KDA", name: "Kadena", logo: "https://cryptologos.cc/logos/kadena-kda-logo.png" },
  { symbol: "FLR", name: "Flare", logo: "https://cryptologos.cc/logos/flare-flr-logo.png" },
  { symbol: "FET", name: "Fetch.ai", logo: "https://cryptologos.cc/logos/fetch-ai-fet-logo.png" },
  { symbol: "RNDR", name: "Render", logo: "https://cryptologos.cc/logos/render-rndr-logo.png" },
  { symbol: "GLM", name: "Golem", logo: "https://cryptologos.cc/logos/golem-glm-logo.png" },
]

interface CryptoSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (crypto: Crypto) => void
  selectedSymbol?: string
}

export function CryptoSelectorModal({ isOpen, onClose, onSelect, selectedSymbol }: CryptoSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCryptos = CRYPTOCURRENCIES.filter(
    (crypto) =>
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#0D1004]">Select Cryptocurrency</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B3B7A5]" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#B3B7A5] focus:border-[#296253]"
          />
        </div>

        {/* Crypto List */}
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-1">
            {filteredCryptos.map((crypto) => {
              const isSelected = selectedSymbol === crypto.symbol

              return (
                <button
                  key={crypto.symbol}
                  onClick={() => onSelect(crypto)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isSelected
                      ? "bg-[#B7DF30]/20 border border-[#296253]"
                      : "hover:bg-[#B3B7A5]/10 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={crypto.logo || "/placeholder.svg"}
                      alt={crypto.name}
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                      }}
                    />
                    <div className="text-left">
                      <div className="font-semibold text-[#0D1004]">{crypto.symbol}</div>
                      <div className="text-sm text-[#296253]">{crypto.name}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#296253] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
