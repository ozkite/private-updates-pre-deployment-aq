"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check } from "lucide-react"
import Image from "next/image"

interface CryptoSelectorModalProps {
  selectedCrypto: string
  onSelectCrypto: (crypto: string) => void
}

const cryptoData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    symbol: "USDT",
    name: "Tether",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  {
    symbol: "BNB",
    name: "BNB",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  },
  {
    symbol: "SOL",
    name: "Solana",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  {
    symbol: "XRP",
    name: "XRP",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  },
  {
    symbol: "SHIB",
    name: "Shiba Inu",
    logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  },
  {
    symbol: "TON",
    name: "Toncoin",
    logo: "https://cryptologos.cc/logos/toncoin-ton-logo.png",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.png",
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
  {
    symbol: "TRX",
    name: "TRON",
    logo: "https://cryptologos.cc/logos/tron-trx-logo.png",
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    logo: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  },
  {
    symbol: "BCH",
    name: "Bitcoin Cash",
    logo: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png",
  },
  {
    symbol: "APT",
    name: "Aptos",
    logo: "https://cryptologos.cc/logos/aptos-apt-logo.png",
  },
  {
    symbol: "ICP",
    name: "Internet Computer",
    logo: "https://cryptologos.cc/logos/internet-computer-icp-logo.png",
  },
  {
    symbol: "FIL",
    name: "Filecoin",
    logo: "https://cryptologos.cc/logos/filecoin-fil-logo.png",
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
  },
  {
    symbol: "NEAR",
    name: "NEAR Protocol",
    logo: "https://cryptologos.cc/logos/near-protocol-near-logo.png",
  },
  {
    symbol: "OP",
    name: "Optimism",
    logo: "https://cryptologos.cc/logos/optimism-op-logo.png",
  },
  {
    symbol: "PEPE",
    name: "Pepe",
    logo: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
  },
  {
    symbol: "MKR",
    name: "Maker",
    logo: "https://cryptologos.cc/logos/maker-mkr-logo.png",
  },
  {
    symbol: "RUNE",
    name: "THORChain",
    logo: "https://cryptologos.cc/logos/thorchain-rune-logo.png",
  },
  {
    symbol: "GRT",
    name: "The Graph",
    logo: "https://cryptologos.cc/logos/the-graph-grt-logo.png",
  },
  {
    symbol: "INJ",
    name: "Injective",
    logo: "https://cryptologos.cc/logos/injective-inj-logo.png",
  },
  {
    symbol: "STX",
    name: "Stacks",
    logo: "https://cryptologos.cc/logos/stacks-stx-logo.png",
  },
  {
    symbol: "AAVE",
    name: "Aave",
    logo: "https://cryptologos.cc/logos/aave-aave-logo.png",
  },
  {
    symbol: "ATOM",
    name: "Cosmos",
    logo: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
  },
  {
    symbol: "SUI",
    name: "Sui",
    logo: "https://cryptologos.cc/logos/sui-sui-logo.png",
  },
  {
    symbol: "HBAR",
    name: "Hedera",
    logo: "https://cryptologos.cc/logos/hedera-hbar-logo.png",
  },
  {
    symbol: "ALGO",
    name: "Algorand",
    logo: "https://cryptologos.cc/logos/algorand-algo-logo.png",
  },
  {
    symbol: "CELO",
    name: "Celo",
    logo: "https://cryptologos.cc/logos/celo-celo-logo.png",
  },
  {
    symbol: "XLM",
    name: "Stellar",
    logo: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
  },
  {
    symbol: "FLOW",
    name: "Flow",
    logo: "https://cryptologos.cc/logos/flow-flow-logo.png",
  },
  {
    symbol: "MANA",
    name: "Decentraland",
    logo: "https://cryptologos.cc/logos/decentraland-mana-logo.png",
  },
  {
    symbol: "ENJ",
    name: "Enjin Coin",
    logo: "https://cryptologos.cc/logos/enjin-coin-enj-logo.png",
  },
  {
    symbol: "ZEC",
    name: "Zcash",
    logo: "https://cryptologos.cc/logos/zcash-zec-logo.png",
  },
  {
    symbol: "KDA",
    name: "Kadena",
    logo: "https://cryptologos.cc/logos/kadena-kda-logo.png",
  },
  {
    symbol: "FLR",
    name: "Flare",
    logo: "https://cryptologos.cc/logos/flare-flr-logo.png",
  },
  {
    symbol: "FET",
    name: "Fetch.ai",
    logo: "https://cryptologos.cc/logos/fetch-ai-fet-logo.png",
  },
  {
    symbol: "RNDR",
    name: "Render",
    logo: "https://cryptologos.cc/logos/render-rndr-logo.png",
  },
  {
    symbol: "GLM",
    name: "Golem",
    logo: "https://cryptologos.cc/logos/golem-glm-logo.png",
  },
]

export function CryptoSelectorModal({ selectedCrypto, onSelectCrypto }: CryptoSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredCryptos = cryptoData.filter(
    (crypto) =>
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelect = (symbol: string) => {
    onSelectCrypto(symbol)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="border-[#296253] text-[#296253] hover:bg-[#296253] hover:text-white bg-transparent px-4 py-2"
        >
          See all Crypto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[600px] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-[#0D1004]">Select Cryptocurrency</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#296253] focus:border-[#B7DF30]"
            />
          </div>

          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {filteredCryptos.map((crypto) => (
              <div
                key={crypto.symbol}
                onClick={() => handleSelect(crypto.symbol)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCrypto === crypto.symbol ? "bg-[#B7DF30] text-[#0D1004]" : "hover:bg-[#EDF0E3]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative w-8 h-8">
                    <Image
                      src={crypto.logo || "/placeholder.svg"}
                      alt={crypto.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/crypto-digital-landscape.png"
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0D1004]">{crypto.symbol}</div>
                    <div className="text-sm text-gray-600">{crypto.name}</div>
                  </div>
                </div>
                {selectedCrypto === crypto.symbol && <Check className="h-5 w-5 text-[#296253]" />}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
