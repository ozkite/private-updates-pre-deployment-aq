"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, ChevronDown } from "lucide-react"
import { CryptoSelectorModal } from "@/components/crypto-selector-modal"

export default function P2PSellPage() {
  const [selectedCrypto, setSelectedCrypto] = useState("USDT")
  const [selectedFiat, setSelectedFiat] = useState("MXN")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCryptoModal, setShowCryptoModal] = useState(false)

  // 10 specific advertisers with no emojis
  const offers = [
    {
      id: 1,
      trader: "DigiMSwaper",
      initials: "DS",
      completionRate: 98.5,
      orderCount: 1250,
      status: "Online",
      price: 19.45,
      available: 50000,
      limit: "500 - 50,000",
      paymentMethods: ["SPEI", "Oxxo Pay"],
    },
    {
      id: 2,
      trader: "BitInstante",
      initials: "BI",
      completionRate: 99.2,
      orderCount: 2100,
      status: "Online",
      price: 19.42,
      available: 75000,
      limit: "1,000 - 75,000",
      paymentMethods: ["SPEI", "Transferencia"],
    },
    {
      id: 3,
      trader: "CryptoColor",
      initials: "CC",
      completionRate: 97.8,
      orderCount: 890,
      status: "Online",
      price: 19.48,
      available: 30000,
      limit: "200 - 30,000",
      paymentMethods: ["SPEI", "Oxxo Pay", "Mercado Pago"],
    },
    {
      id: 4,
      trader: "InstantSwap",
      initials: "IS",
      completionRate: 99.5,
      orderCount: 3200,
      status: "Online",
      price: 19.4,
      available: 100000,
      limit: "2,000 - 100,000",
      paymentMethods: ["SPEI", "Transferencia"],
    },
    {
      id: 5,
      trader: "StableStation",
      initials: "SS",
      completionRate: 98.9,
      orderCount: 1680,
      status: "Online",
      price: 19.43,
      available: 60000,
      limit: "800 - 60,000",
      paymentMethods: ["SPEI", "Oxxo Pay"],
    },
    {
      id: 6,
      trader: "OldBlocks",
      initials: "OB",
      completionRate: 99.1,
      orderCount: 2450,
      status: "Online",
      price: 19.41,
      available: 85000,
      limit: "1,500 - 85,000",
      paymentMethods: ["SPEI", "Transferencia", "Mercado Pago"],
    },
    {
      id: 7,
      trader: "MarketPool",
      initials: "MP",
      completionRate: 98.3,
      orderCount: 1120,
      status: "Online",
      price: 19.46,
      available: 40000,
      limit: "300 - 40,000",
      paymentMethods: ["SPEI", "Oxxo Pay"],
    },
    {
      id: 8,
      trader: "StableBasket",
      initials: "SB",
      completionRate: 99.7,
      orderCount: 3800,
      status: "Online",
      price: 19.39,
      available: 120000,
      limit: "2,500 - 120,000",
      paymentMethods: ["SPEI", "Transferencia"],
    },
    {
      id: 9,
      trader: "CoronaSwap",
      initials: "CS",
      completionRate: 98.1,
      orderCount: 750,
      status: "Online",
      price: 19.49,
      available: 25000,
      limit: "150 - 25,000",
      paymentMethods: ["SPEI", "Oxxo Pay", "Mercado Pago"],
    },
    {
      id: 10,
      trader: "LocalDesk",
      initials: "LD",
      completionRate: 99.3,
      orderCount: 2900,
      status: "Online",
      price: 19.41,
      available: 95000,
      limit: "1,800 - 95,000",
      paymentMethods: ["SPEI", "Transferencia"],
    },
  ]

  const filteredOffers = offers.filter(
    (offer) =>
      offer.trader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.paymentMethods.some((method) => method.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">P2P Trading</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Buy
              </Button>
              <Button size="sm" className="bg-[#296253] hover:bg-[#296253]/90 text-white">
                Sell
              </Button>
            </div>
          </div>

          {/* Crypto and Fiat Selectors */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Button
              variant="outline"
              className="rounded-full border-2 border-[#B7DF30] bg-[#B7DF30]/10 hover:bg-[#B7DF30]/20"
              onClick={() => setShowCryptoModal(true)}
            >
              <span className="font-bold mr-2">{selectedCrypto}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="rounded-full border-2 border-gray-300 hover:bg-gray-50 bg-transparent">
              <span className="font-bold mr-2">{selectedFiat}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-[#296253] hover:text-[#296253]/80 hover:bg-[#296253]/10"
              onClick={() => setShowCryptoModal(true)}
            >
              See all Crypto
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by advertiser or payment method..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="border-none shadow-md">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-600">
              <div className="col-span-3">Advertiser</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Available</div>
              <div className="col-span-2 text-center">Limit</div>
              <div className="col-span-2">Payment</div>
              <div className="col-span-1"></div>
            </div>

            {/* Offers List */}
            <div className="divide-y divide-gray-100">
              {filteredOffers.map((offer) => (
                <div key={offer.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
                  {/* Advertiser */}
                  <div className="col-span-3">
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
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-right">
                    <div className="font-bold text-lg text-[#0D1004]">${offer.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">{selectedFiat}</div>
                  </div>

                  {/* Available */}
                  <div className="col-span-2 text-right">
                    <div className="font-semibold text-[#0D1004]">{offer.available.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{selectedCrypto}</div>
                  </div>

                  {/* Limit */}
                  <div className="col-span-2 text-center">
                    <div className="text-[#296253] font-medium text-sm">
                      {selectedFiat} {offer.limit}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {offer.paymentMethods.map((method, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="col-span-1 flex items-center justify-end">
                    <Button
                      size="sm"
                      className="bg-[#B7DF30] hover:bg-[#B7DF30]/90 text-[#0D1004] font-semibold rounded-xl"
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No offers found matching your search.</p>
          </div>
        )}
      </div>

      {/* Crypto Selector Modal */}
      <CryptoSelectorModal
        isOpen={showCryptoModal}
        onClose={() => setShowCryptoModal(false)}
        selectedCrypto={selectedCrypto}
        onSelectCrypto={(crypto) => {
          setSelectedCrypto(crypto)
          setShowCryptoModal(false)
        }}
      />
    </div>
  )
}
