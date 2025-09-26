"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Filter, Plus } from "lucide-react"
import Link from "next/link"
import { CryptoSelectorModal } from "@/components/crypto-selector-modal"

export default function P2PSellPage() {
  const [selectedCrypto, setSelectedCrypto] = useState("USDT")
  const [amount, setAmount] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [showTooltip, setShowTooltip] = useState(false)

  // Available cryptocurrencies (removed LTC as requested, but keeping the main ones visible)
  const cryptos = [
    "USDT",
    "BTC",
    "ETH",
    "DAI",
    "BNB",
    "ADA",
    "SOL",
    "LINK",
    "AVAX",
    "ALGO",
    "CELO",
    "SUI",
    "XLM",
    "HBAR",
    "TON",
    "DOT",
  ]

  // Mock offers data with the 10 specific trader names - NO EMOJIS
  const offers = [
    {
      id: 1,
      trader: "DigiMSwaper",
      initials: "DS",
      completionRate: 99.8,
      orderCount: 1247,
      status: "Active now",
      price: 18.67,
      available: 19629.76,
      orderLimit: { min: 400, max: 360000 },
      paymentMethods: ["SPEI", "Banorte"],
    },
    {
      id: 2,
      trader: "BitInstante",
      initials: "BI",
      completionRate: 100.0,
      orderCount: 892,
      status: "Active now",
      price: 18.45,
      available: 39960.03,
      orderLimit: { min: 3000, max: 360000 },
      paymentMethods: ["SPEI", "BBVA"],
    },
    {
      id: 3,
      trader: "CryptoColor",
      initials: "CC",
      completionRate: 99.2,
      orderCount: 567,
      status: "2 min ago",
      price: 18.46,
      available: 25480,
      orderLimit: { min: 470, max: 470000 },
      paymentMethods: ["Bank Transfer", "Santander"],
    },
    {
      id: 4,
      trader: "InstantSwap",
      initials: "IS",
      completionRate: 99.9,
      orderCount: 1156,
      status: "Active now",
      price: 18.46,
      available: 8390.47,
      orderLimit: { min: 5000, max: 154888 },
      paymentMethods: ["SPEI", "STP"],
    },
    {
      id: 5,
      trader: "StableStation",
      initials: "SS",
      completionRate: 98.7,
      orderCount: 743,
      status: "5 min ago",
      price: 18.47,
      available: 10301.53,
      orderLimit: { min: 1000, max: 190269 },
      paymentMethods: ["Wire", "BBVA"],
    },
    {
      id: 6,
      trader: "OldBlocks",
      initials: "OB",
      completionRate: 100.0,
      orderCount: 2156,
      status: "Active now",
      price: 18.49,
      available: 13637.87,
      orderLimit: { min: 3500, max: 252164 },
      paymentMethods: ["Bank Transfer", "Citibank"],
    },
    {
      id: 7,
      trader: "MarketPool",
      initials: "MP",
      completionRate: 99.5,
      orderCount: 834,
      status: "1 min ago",
      price: 18.52,
      available: 22450.12,
      orderLimit: { min: 2000, max: 180000 },
      paymentMethods: ["SPEI", "ScotiaBank"],
    },
    {
      id: 8,
      trader: "StableBasket",
      initials: "SB",
      completionRate: 98.9,
      orderCount: 1089,
      status: "Active now",
      price: 18.55,
      available: 15789.33,
      orderLimit: { min: 1500, max: 220000 },
      paymentMethods: ["MercadoPago", "Albo"],
    },
    {
      id: 9,
      trader: "CoronaSwap",
      initials: "CS",
      completionRate: 99.7,
      orderCount: 945,
      status: "3 min ago",
      price: 18.58,
      available: 18234.67,
      orderLimit: { min: 800, max: 175000 },
      paymentMethods: ["Banregio", "Oxxo"],
    },
    {
      id: 10,
      trader: "LocalDesk",
      initials: "LD",
      completionRate: 100.0,
      orderCount: 1567,
      status: "Active now",
      price: 18.61,
      available: 31245.89,
      orderLimit: { min: 2500, max: 300000 },
      paymentMethods: ["SPEI", "Bank Transfer"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9F4] p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-[#DFE2D4]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[#0D1004]">P2P Marketplace - Sell</h1>
            <h2 className="text-[#296253] font-semibold">
              Buy and sell crypto with Mexican Pesos using local payment methods
            </h2>
          </div>

          {/* Buy/Sell Toggle */}
          <div className="flex space-x-2 mb-6">
            <Link href="/p2p">
              <Button
                variant="outline"
                className="border-[#296253] text-[#296253] hover:bg-[#296253] hover:text-white bg-transparent"
              >
                Buy
              </Button>
            </Link>
            <Button className="bg-[#B7DF30] text-[#0D1004] hover:bg-[#A5C928]">Sell</Button>
          </div>

          {/* Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                className="border-[#296253] focus:border-[#B7DF30]"
              />
              {showTooltip && (
                <div className="absolute top-full left-0 mt-1 bg-[#0D1004] text-[#F8F9F4] text-xs p-2 rounded shadow-lg z-10">
                  Daily limits: 20,000 MXN | 50,000 MXN | 100,000 MXN
                </div>
              )}
            </div>

            <Select defaultValue="MXN">
              <SelectTrigger className="border-[#296253] focus:border-[#B7DF30]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MXN">MXN</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-[#296253] focus:border-[#B7DF30]">
                <SelectValue placeholder="Sort by" />
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

            <div className="flex space-x-2">
              <Button size="sm" className="bg-[#B7DF30] text-[#0D1004] hover:bg-[#A5C928]">
                <Plus className="h-4 w-4 mr-1" />
                Create an offer
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#296253] text-[#296253] hover:bg-[#296253] hover:text-white bg-transparent"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>

          {/* Crypto Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[#0D1004]">Select Cryptocurrency</h3>
            <div className="flex flex-wrap gap-3 items-center">
              {cryptos.map((crypto) => (
                <Button
                  key={crypto}
                  variant={selectedCrypto === crypto ? "default" : "outline"}
                  size="default"
                  onClick={() => setSelectedCrypto(crypto)}
                  className={
                    selectedCrypto === crypto
                      ? "bg-[#B7DF30] text-[#0D1004] hover:bg-[#A5C928] px-4 py-2"
                      : "border-[#DFE2D4] text-[#0D1004] hover:bg-[#EDF0E3] px-4 py-2"
                  }
                >
                  {crypto}
                </Button>
              ))}
              <CryptoSelectorModal selectedCrypto={selectedCrypto} onSelectCrypto={setSelectedCrypto} />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-[#0D1004] mb-3">Payment Methods</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "SPEI",
                "STP",
                "Bank Transfer",
                "Wire",
                "Albo",
                "Banorte",
                "BBVA",
                "Citibank",
                "Santander",
                "ScotiaBank",
                "MercadoPago",
                "Banregio",
                "Oxxo",
              ].map((method) => (
                <Badge
                  key={method}
                  variant="outline"
                  className="border-[#296253] text-[#296253] hover:bg-[#296253] hover:text-white cursor-pointer"
                >
                  {method}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Offers List */}
        <div className="bg-white rounded-lg shadow-sm border border-[#DFE2D4]">
          <div className="p-4 border-b border-[#DFE2D4]">
            <h2 className="text-lg font-semibold text-[#0D1004]">Offer list ({offers.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#EDF0E3]">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-[#0D1004]">Advertisers</th>
                  <th className="text-left p-4 text-sm font-medium text-[#0D1004]">Price</th>
                  <th className="text-left p-4 text-sm font-medium text-[#0D1004]">Available/Order Limit</th>
                  <th className="text-left p-4 text-sm font-medium text-[#0D1004]">Payment</th>
                  <th className="text-left p-4 text-sm font-medium text-[#0D1004]">Trade</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-[#DFE2D4] hover:bg-[#F8F9F4]">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-[#296253] text-white font-semibold">
                            {offer.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-[#0D1004]">{offer.trader}</div>
                          <div className="text-[#296253] text-sm font-medium">
                            {offer.completionRate}% • {offer.orderCount} orders • {offer.status}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-2xl font-bold text-[#B7DF30]">{offer.price.toFixed(2)} MXN</div>
                    </td>
                    <td className="p-4">
                      <div className="text-[#0D1004]">{offer.available.toLocaleString()} USDT</div>
                      <div className="text-[#296253] font-medium">
                        {offer.orderLimit.min.toLocaleString()}.00 MXN - {offer.orderLimit.max.toLocaleString()}.00 MXN
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {offer.paymentMethods.map((method) => (
                          <Badge key={method} variant="outline" className="text-xs border-[#DFE2D4] text-[#0D1004]">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <Button size="sm" className="bg-[#B7DF30] text-[#0D1004] hover:bg-[#A5C928]">
                        Sell USDT
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Assistant Floating Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            size="lg"
            className="rounded-full bg-[#296253] text-white hover:bg-[#1f4a3d] shadow-lg"
            title="AI found 3 offers with >99% completion"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            AI
          </Button>
        </div>
      </div>
    </div>
  )
}
