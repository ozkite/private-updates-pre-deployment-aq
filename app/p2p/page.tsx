"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Plus, Info, MessageCircle, Shield } from "lucide-react"
import { CryptoSelectorModal } from "@/components/crypto-selector-modal"

export default function P2PMarketplacePage() {
  const [tradeType, setTradeType] = useState("buy")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("MXN")
  const [selectedCrypto, setSelectedCrypto] = useState("USDT")
  const [paymentMethod, setPaymentMethod] = useState("all")
  const [sortBy, setSortBy] = useState("price")
  const [showTooltip, setShowTooltip] = useState(false)

  // Mock data for offers
  const offers = [
    {
      id: 1,
      trader: {
        name: "InstantSwap",
        avatar: "⚡",
        completionRate: 99.8,
        orderCount: 2782,
        isOnline: true,
        lastSeen: "Active now",
        verified: true,
      },
      price: 19.3,
      available: "19,629.76 USDT",
      limits: "400.00 MXN - 360,000.00 MXN",
      paymentMethods: ["SPEI", "Santander"],
      isPromoted: true,
    },
    {
      id: 2,
      trader: {
        name: "CryptoColores",
        avatar: "🌈",
        completionRate: 99.6,
        orderCount: 3467,
        isOnline: true,
        lastSeen: "Active now",
        verified: true,
      },
      price: 18.45,
      available: "39,960.03 USDT",
      limits: "3,000.00 MXN - 360,000.00 MXN",
      paymentMethods: ["Bank Transfer", "Banorte"],
    },
    {
      id: 3,
      trader: {
        name: "BitInstante",
        avatar: "⚡",
        completionRate: 100.0,
        orderCount: 1531,
        isOnline: true,
        lastSeen: "15 min",
        verified: true,
      },
      price: 18.46,
      available: "25.48 USDT",
      limits: "470.00 MXN - 470.00 MXN",
      paymentMethods: ["SPEI", "Banorte"],
    },
    {
      id: 4,
      trader: {
        name: "MiReyCrypto",
        avatar: "👑",
        completionRate: 99.5,
        orderCount: 1175,
        isOnline: true,
        lastSeen: "Active now",
        verified: true,
      },
      price: 18.46,
      available: "8,390.47 USDT",
      limits: "5,000.00 MXN - 154,888.00 MXN",
      paymentMethods: ["SPEI", "STP"],
    },
    {
      id: 5,
      trader: {
        name: "AbuelaBlockchain",
        avatar: "👵",
        completionRate: 97.6,
        orderCount: 2417,
        isOnline: true,
        lastSeen: "15 min",
        verified: true,
      },
      price: 18.47,
      available: "10,301.53 USDT",
      limits: "1,000.00 MXN - 190,269.00 MXN",
      paymentMethods: ["Bank Transfer", "BBVA"],
    },
  ]

  const mainCryptos = [
    { symbol: "USDT", name: "Tether", icon: "₮" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", icon: "Ξ" },
    { symbol: "DAI", name: "Dai", icon: "◈" },
    { symbol: "BNB", name: "BNB", icon: "🔶" },
    { symbol: "ADA", name: "Cardano", icon: "♠" },
    { symbol: "SOL", name: "Solana", icon: "◉" },
    { symbol: "LINK", name: "Chainlink", icon: "🔗" },
    { symbol: "MNT", name: "Mantle", icon: "🏔️" },
    { symbol: "HYPE", name: "Hyperliquid", icon: "⚡" },
    { symbol: "AVAX", name: "Avalanche", icon: "🔺" },
    { symbol: "ALGO", name: "Algorand", icon: "△" },
    { symbol: "CELO", name: "Celo", icon: "🌱" },
    { symbol: "SUI", name: "Sui", icon: "💧" },
    { symbol: "XLM", name: "Stellar", icon: "✦" },
    { symbol: "HBAR", name: "Hedera", icon: "ℏ" },
    { symbol: "LTC", name: "Litecoin", icon: "Ł" },
    { symbol: "TON", name: "Toncoin", icon: "💎" },
    { symbol: "DOT", name: "Polkadot", icon: "●" },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9F4]">
      {/* Banxico Rate Banner */}
      <div className="bg-[#296253] text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm font-medium">1 USD = 18.45 MXN (Banxico Official Rate)</span>
            <Info className="h-4 w-4 cursor-pointer hover:text-[#B7DF30]" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0D1004] mb-2">P2P Marketplace</h1>
          <p className="text-[#DFE2D4]">Buy and sell crypto with Mexican Pesos using local payment methods</p>
        </div>

        {/* Trade Type Toggle */}
        <div className="mb-6">
          <Tabs value={tradeType} onValueChange={setTradeType} className="w-fit">
            <TabsList className="bg-[#EDF0E3] border border-[#296253]">
              <TabsTrigger
                value="buy"
                className="data-[state=active]:bg-[#B7DF30] data-[state=active]:text-[#0D1004] font-semibold"
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="sell"
                className="data-[state=active]:bg-[#B7DF30] data-[state=active]:text-[#0D1004] font-semibold"
                onClick={() => (window.location.href = "/p2p/sell")}
              >
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          {/* Amount Input */}
          <div className="md:col-span-2 relative">
            <div className="flex">
              <Input
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                className="rounded-r-none border-r-0 bg-white border-[#296253] focus:border-[#B7DF30]"
              />
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-20 rounded-l-none bg-white border-[#296253] focus:border-[#B7DF30]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MXN">MXN</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {showTooltip && (
              <div className="absolute top-full left-0 mt-2 bg-[#0D1004] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10">
                Daily limits: 20,000 MXN | 50,000 MXN | 100,000 MXN
                <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[#0D1004]"></div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="bg-white border-[#296253] focus:border-[#B7DF30]">
                <SelectValue placeholder="All payment methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All payment methods</SelectItem>
                <SelectItem value="spei">SPEI</SelectItem>
                <SelectItem value="stp">STP</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="wire">Wire</SelectItem>
                <SelectItem value="albo">Albo</SelectItem>
                <SelectItem value="banorte">Banorte</SelectItem>
                <SelectItem value="bbva">BBVA</SelectItem>
                <SelectItem value="citibank">Citibank</SelectItem>
                <SelectItem value="santander">Santander</SelectItem>
                <SelectItem value="scotiabank">ScotiaBank</SelectItem>
                <SelectItem value="mercadopago">MercadoPago</SelectItem>
                <SelectItem value="banregio">Banregio</SelectItem>
                <SelectItem value="oxxo">Oxxo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white border-[#296253] focus:border-[#B7DF30]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="activity">Activity</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="min">Min</SelectItem>
                <SelectItem value="max">Max</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex space-x-2">
            <Button className="flex-1 bg-[#B7DF30] hover:bg-[#B7DF30]/90 text-[#0D1004] font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Create an offer
            </Button>
            <Button
              variant="outline"
              className="border-[#296253] text-[#296253] hover:bg-[#296253] hover:text-white bg-transparent"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Crypto Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {mainCryptos.map((crypto) => (
              <Button
                key={crypto.symbol}
                variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCrypto(crypto.symbol)}
                className={`flex-shrink-0 ${
                  selectedCrypto === crypto.symbol
                    ? "bg-[#B7DF30] text-[#0D1004] border-[#B7DF30]"
                    : "border-[#296253] text-[#296253] hover:bg-[#296253] hover:text-white bg-gray-100"
                }`}
              >
                {crypto.symbol}
              </Button>
            ))}
            <CryptoSelectorModal selectedCrypto={selectedCrypto} onSelectCrypto={setSelectedCrypto} />
          </div>
        </div>

        {/* Offer List */}
        <Card className="bg-white border-[#296253] shadow-lg">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-[#EDF0E3] border-b border-[#296253] text-sm font-semibold text-[#0D1004]">
              <div className="col-span-3">Advertisers</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Available/Order Limit</div>
              <div className="col-span-3">Payment</div>
              <div className="col-span-2">Trade</div>
            </div>

            {/* Offer Rows */}
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-[#F8F9F4] transition-colors"
              >
                {/* Advertiser */}
                <div className="col-span-3">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{offer.trader.avatar}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-[#0D1004]">{offer.trader.name}</span>
                        {offer.trader.verified && <Shield className="h-4 w-4 text-[#B7DF30]" />}
                        {offer.isPromoted && <Badge className="bg-[#B7DF30] text-[#0D1004] text-xs">Promoted Ad</Badge>}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-[#DFE2D4]">
                        <span>{offer.trader.orderCount} orders</span>
                        <span>•</span>
                        <span>{offer.trader.completionRate}% completion</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-[#DFE2D4]">
                        <div
                          className={`w-2 h-2 rounded-full ${offer.trader.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                        />
                        <span>{offer.trader.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2">
                  <div className="text-xl font-bold text-[#B7DF30]">Mex$ {offer.price}</div>
                </div>

                {/* Available/Limits */}
                <div className="col-span-2">
                  <div className="text-sm">
                    <div className="font-semibold text-[#0D1004]">{offer.available}</div>
                    <div className="text-[#DFE2D4]">{offer.limits}</div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-1">
                    {offer.paymentMethods.map((method, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-[#296253] text-[#296253]">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Trade Button */}
                <div className="col-span-2">
                  <Button className="w-full bg-[#B7DF30] hover:bg-[#B7DF30]/90 text-[#0D1004] font-semibold">
                    Buy USDT
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Assistant Floating Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative group">
            <Button
              size="lg"
              className="rounded-full bg-[#296253] hover:bg-[#296253]/90 text-white shadow-lg border-2 border-[#B7DF30] w-14 h-14"
            >
              <MessageCircle className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#B7DF30] rounded-full flex items-center justify-center text-xs font-bold text-[#0D1004]">
                AI
              </div>
            </Button>

            {/* Tooltip */}
            <div className="absolute bottom-16 right-0 bg-[#0D1004] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              AI found 3 offers with {">"}99% completion
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0D1004]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
