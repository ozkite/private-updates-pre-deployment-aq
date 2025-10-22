"use client"

import { useState } from "react"
import { Search, ChevronDown, Filter, TrendingUp, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CryptoSelectorModal } from "@/components/crypto-selector-modal"

interface P2POffer {
  id: string
  trader: string
  initials: string
  completionRate: number
  orderCount: number
  status: string
  price: number
  available: number
  limit: string
  paymentMethods: string[]
}

export default function P2PSellPage() {
  const [selectedCrypto, setSelectedCrypto] = useState("USDT")
  const [selectedFiat, setSelectedFiat] = useState("MXN")
  const [amount, setAmount] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCryptoModal, setShowCryptoModal] = useState(false)

  const offers: P2POffer[] = [
    {
      id: "1",
      trader: "DigiMSwaper",
      initials: "DS",
      completionRate: 98.5,
      orderCount: 1247,
      status: "Online",
      price: 20.15,
      available: 50000,
      limit: "500 - 10,000",
      paymentMethods: ["SPEI", "Banco Azteca", "BBVA"],
    },
    {
      id: "2",
      trader: "BitInstante",
      initials: "BI",
      completionRate: 99.2,
      orderCount: 2156,
      status: "Online",
      price: 20.12,
      available: 75000,
      limit: "1,000 - 25,000",
      paymentMethods: ["SPEI", "Santander", "Banamex"],
    },
    {
      id: "3",
      trader: "CryptoColor",
      initials: "CC",
      completionRate: 97.8,
      orderCount: 892,
      status: "Online",
      price: 20.18,
      available: 30000,
      limit: "300 - 8,000",
      paymentMethods: ["SPEI", "BBVA", "Scotiabank"],
    },
    {
      id: "4",
      trader: "InstantSwap",
      initials: "IS",
      completionRate: 99.5,
      orderCount: 3421,
      status: "Online",
      price: 20.1,
      available: 100000,
      limit: "2,000 - 50,000",
      paymentMethods: ["SPEI", "Banco Azteca", "Santander", "BBVA"],
    },
    {
      id: "5",
      trader: "StableStation",
      initials: "SS",
      completionRate: 96.7,
      orderCount: 654,
      status: "Online",
      price: 20.2,
      available: 25000,
      limit: "200 - 5,000",
      paymentMethods: ["SPEI", "Banamex"],
    },
    {
      id: "6",
      trader: "OldBlocks",
      initials: "OB",
      completionRate: 98.9,
      orderCount: 1876,
      status: "Online",
      price: 20.13,
      available: 60000,
      limit: "800 - 15,000",
      paymentMethods: ["SPEI", "BBVA", "Santander", "Scotiabank"],
    },
    {
      id: "7",
      trader: "MarketPool",
      initials: "MP",
      completionRate: 97.5,
      orderCount: 1123,
      status: "Online",
      price: 20.16,
      available: 45000,
      limit: "600 - 12,000",
      paymentMethods: ["SPEI", "Banco Azteca", "Banamex"],
    },
    {
      id: "8",
      trader: "StableBasket",
      initials: "SB",
      completionRate: 99.8,
      orderCount: 4532,
      status: "Online",
      price: 20.09,
      available: 150000,
      limit: "5,000 - 100,000",
      paymentMethods: ["SPEI", "BBVA", "Santander", "Banamex", "Scotiabank"],
    },
    {
      id: "9",
      trader: "CoronaSwap",
      initials: "CS",
      completionRate: 96.2,
      orderCount: 487,
      status: "Online",
      price: 20.22,
      available: 20000,
      limit: "100 - 3,000",
      paymentMethods: ["SPEI", "Banco Azteca"],
    },
    {
      id: "10",
      trader: "LocalDesk",
      initials: "LD",
      completionRate: 98.1,
      orderCount: 1654,
      status: "Online",
      price: 20.14,
      available: 55000,
      limit: "700 - 18,000",
      paymentMethods: ["SPEI", "BBVA", "Banamex", "Scotiabank"],
    },
  ]

  const handleCryptoSelect = (crypto: string) => {
    setSelectedCrypto(crypto)
    setShowCryptoModal(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0D1004]">P2P Marketplace</h1>
            <p className="text-[#296253] mt-1">Buy and sell crypto directly with other users</p>
          </div>
          <Button className="bg-[#B7DF30] hover:bg-[#a5c929] text-[#0D1004] font-semibold">
            <TrendingUp className="mr-2 h-4 w-4" />
            Post Ad
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-[#B3B7A5]/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#0D1004]">Active Traders</CardTitle>
              <Users className="h-4 w-4 text-[#296253]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0D1004]">2,847</div>
              <p className="text-xs text-[#296253] mt-1">+12% from last week</p>
            </CardContent>
          </Card>
          <Card className="border-[#B3B7A5]/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#0D1004]">24h Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-[#296253]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0D1004]">$1.2M</div>
              <p className="text-xs text-[#296253] mt-1">Across all pairs</p>
            </CardContent>
          </Card>
          <Card className="border-[#B3B7A5]/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#0D1004]">Avg. Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#296253]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0D1004]">20.15</div>
              <p className="text-xs text-[#296253] mt-1">MXN per USDT</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Trading Form */}
          <div className="lg:col-span-1">
            <Card className="border-[#B3B7A5]/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#296253] to-[#296253]/80">
                <CardTitle className="text-white">Sell Crypto</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Crypto Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0D1004]">Cryptocurrency</label>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12 text-left border-[#B3B7A5]/30 hover:border-[#296253] bg-transparent"
                    onClick={() => setShowCryptoModal(true)}
                  >
                    <span className="font-semibold text-[#0D1004]">{selectedCrypto}</span>
                    <ChevronDown className="h-4 w-4 text-[#296253]" />
                  </Button>
                </div>

                {/* Fiat Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0D1004]">Fiat Currency</label>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12 text-left border-[#B3B7A5]/30 hover:border-[#296253] bg-transparent"
                  >
                    <span className="font-semibold text-[#0D1004]">{selectedFiat}</span>
                    <ChevronDown className="h-4 w-4 text-[#296253]" />
                  </Button>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0D1004]">Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 border-[#B3B7A5]/30 focus:border-[#296253] text-lg"
                  />
                </div>

                {/* Payment Methods Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0D1004]">Payment Method</label>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12 text-left border-[#B3B7A5]/30 hover:border-[#296253] bg-transparent"
                  >
                    <span className="text-[#0D1004]">All Payment Methods</span>
                    <ChevronDown className="h-4 w-4 text-[#296253]" />
                  </Button>
                </div>

                {/* Search Button */}
                <Button className="w-full h-12 bg-[#B7DF30] hover:bg-[#a5c929] text-[#0D1004] font-semibold text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Find Offers
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Offers List */}
          <div className="lg:col-span-2">
            <Card className="border-[#B3B7A5]/20 shadow-lg">
              <CardHeader className="border-b border-[#B3B7A5]/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#0D1004]">Available Offers ({offers.length})</CardTitle>
                  <Button variant="outline" size="sm" className="border-[#B3B7A5]/30 bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#B3B7A5]/10 border-b border-[#B3B7A5]/20">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Advertiser</th>
                        <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Price</th>
                        <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Available</th>
                        <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Limit</th>
                        <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Payment</th>
                        <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offers.map((offer) => (
                        <tr key={offer.id} className="border-b border-[#B3B7A5]/10 hover:bg-[#B3B7A5]/5">
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
                            <div className="font-semibold text-[#0D1004]">{offer.price.toFixed(2)}</div>
                            <div className="text-xs text-[#296253]">MXN</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-[#0D1004]">{offer.available.toLocaleString()}</div>
                            <div className="text-xs text-[#296253]">{selectedCrypto}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-[#296253] font-medium text-sm">{offer.limit} MXN</div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {offer.paymentMethods.slice(0, 2).map((method) => (
                                <Badge
                                  key={method}
                                  variant="outline"
                                  className="text-xs border-[#296253] text-[#296253]"
                                >
                                  {method}
                                </Badge>
                              ))}
                              {offer.paymentMethods.length > 2 && (
                                <Badge variant="outline" className="text-xs border-[#296253] text-[#296253]">
                                  +{offer.paymentMethods.length - 2}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <Button size="sm" className="bg-[#296253] hover:bg-[#296253]/90 text-white font-semibold">
                              Sell
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Crypto Selector Modal */}
      <CryptoSelectorModal
        isOpen={showCryptoModal}
        onClose={() => setShowCryptoModal(false)}
        onSelect={handleCryptoSelect}
        selectedCrypto={selectedCrypto}
      />
    </div>
  )
}
