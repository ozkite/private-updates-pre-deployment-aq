"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/top-navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CryptoSelectorModal } from "@/components/crypto-selector-modal"

// P2P Offer type
interface P2POffer {
  id: string
  trader: string
  initials: string
  completionRate: number
  orderCount: number
  status: string
  price: string
  available: string
  limits: string
  paymentMethods: string[]
}

export default function P2PSellPage() {
  const [selectedCrypto, setSelectedCrypto] = useState({
    symbol: "USDT",
    name: "Tether",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  })
  const [selectedFiat, setSelectedFiat] = useState("MXN")
  const [selectedPayment, setSelectedPayment] = useState("All payments")
  const [amount, setAmount] = useState("")
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false)

  // Mock P2P offers data with 10 specific advertisers
  const offers: P2POffer[] = [
    {
      id: "1",
      trader: "DigiMSwaper",
      initials: "DS",
      completionRate: 98.5,
      orderCount: 1234,
      status: "online",
      price: "20.45",
      available: "50,000",
      limits: "500 - 10,000",
      paymentMethods: ["SPEI", "OXXO"],
    },
    {
      id: "2",
      trader: "BitInstante",
      initials: "BI",
      completionRate: 99.2,
      orderCount: 2156,
      status: "online",
      price: "20.43",
      available: "75,000",
      limits: "1,000 - 15,000",
      paymentMethods: ["SPEI", "Banco"],
    },
    {
      id: "3",
      trader: "CryptoColor",
      initials: "CC",
      completionRate: 97.8,
      orderCount: 891,
      status: "online",
      price: "20.47",
      available: "30,000",
      limits: "500 - 8,000",
      paymentMethods: ["OXXO", "7-Eleven"],
    },
    {
      id: "4",
      trader: "InstantSwap",
      initials: "IS",
      completionRate: 99.5,
      orderCount: 3421,
      status: "online",
      price: "20.42",
      available: "100,000",
      limits: "2,000 - 25,000",
      paymentMethods: ["SPEI", "OXXO", "Banco"],
    },
    {
      id: "5",
      trader: "StableStation",
      initials: "SS",
      completionRate: 96.9,
      orderCount: 567,
      status: "online",
      price: "20.48",
      available: "25,000",
      limits: "500 - 5,000",
      paymentMethods: ["OXXO"],
    },
    {
      id: "6",
      trader: "OldBlocks",
      initials: "OB",
      completionRate: 98.1,
      orderCount: 1876,
      status: "online",
      price: "20.44",
      available: "60,000",
      limits: "1,000 - 12,000",
      paymentMethods: ["SPEI", "Banco"],
    },
    {
      id: "7",
      trader: "MarketPool",
      initials: "MP",
      completionRate: 99.0,
      orderCount: 2789,
      status: "online",
      price: "20.43",
      available: "85,000",
      limits: "1,500 - 20,000",
      paymentMethods: ["SPEI", "OXXO", "7-Eleven"],
    },
    {
      id: "8",
      trader: "StableBasket",
      initials: "SB",
      completionRate: 97.5,
      orderCount: 432,
      status: "online",
      price: "20.49",
      available: "20,000",
      limits: "500 - 4,000",
      paymentMethods: ["OXXO"],
    },
    {
      id: "9",
      trader: "CoronaSwap",
      initials: "CS",
      completionRate: 98.8,
      orderCount: 1654,
      status: "online",
      price: "20.44",
      available: "55,000",
      limits: "1,000 - 11,000",
      paymentMethods: ["SPEI", "Banco", "OXXO"],
    },
    {
      id: "10",
      trader: "LocalDesk",
      initials: "LD",
      completionRate: 99.3,
      orderCount: 3012,
      status: "online",
      price: "20.42",
      available: "95,000",
      limits: "2,000 - 22,000",
      paymentMethods: ["SPEI", "Banco"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <TopNavigation />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0D1004] mb-2">P2P Marketplace - Sell Crypto</h1>
          <p className="text-[#296253]">Trade directly with other users at competitive rates</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-[#B3B7A5]/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Crypto Selection */}
            <div>
              <Label className="text-sm font-medium text-[#0D1004] mb-2">Cryptocurrency</Label>
              <Button
                variant="outline"
                className="w-full justify-between border-[#B3B7A5] hover:border-[#296253] bg-transparent"
                onClick={() => setIsCryptoModalOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={selectedCrypto.logo || "/placeholder.svg"}
                    alt={selectedCrypto.name}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="font-semibold">{selectedCrypto.symbol}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Fiat Selection */}
            <div>
              <Label className="text-sm font-medium text-[#0D1004] mb-2">Fiat Currency</Label>
              <Button
                variant="outline"
                className="w-full justify-between border-[#B3B7A5] hover:border-[#296253] bg-transparent"
              >
                <span className="font-semibold">{selectedFiat}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Payment Method */}
            <div>
              <Label className="text-sm font-medium text-[#0D1004] mb-2">Payment Method</Label>
              <Button
                variant="outline"
                className="w-full justify-between border-[#B3B7A5] hover:border-[#296253] bg-transparent"
              >
                <span>{selectedPayment}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Amount */}
            <div>
              <Label className="text-sm font-medium text-[#0D1004] mb-2">Amount ({selectedFiat})</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-[#B3B7A5] focus:border-[#296253]"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B3B7A5]" />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="border-[#B3B7A5] hover:bg-[#B7DF30]/10 bg-transparent">
              Verified Only
            </Button>
            <Button variant="outline" size="sm" className="border-[#B3B7A5] hover:bg-[#B7DF30]/10 bg-transparent">
              High Completion Rate
            </Button>
            <Button variant="outline" size="sm" className="border-[#B3B7A5] hover:bg-[#B7DF30]/10 bg-transparent">
              Low Fees
            </Button>
          </div>
        </div>

        {/* Offers Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#B3B7A5]/20">
          {/* Table Header */}
          <div className="bg-[#B3B7A5]/10 px-4 py-3 border-b border-[#B3B7A5]/20">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#0D1004]">Available Offers ({offers.length})</h2>
              <Button size="sm" className="bg-[#296253] hover:bg-[#296253]/90 text-white">
                Refresh Offers
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F5F0] border-b border-[#B3B7A5]/20">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Advertiser</th>
                  <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Price</th>
                  <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Available</th>
                  <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Limit</th>
                  <th className="text-left p-4 text-sm font-semibold text-[#0D1004]">Payment</th>
                  <th className="text-right p-4 text-sm font-semibold text-[#0D1004]">Trade</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-[#B3B7A5]/10 hover:bg-[#B7DF30]/5 transition-colors">
                    {/* Advertiser */}
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

                    {/* Price */}
                    <td className="p-4">
                      <div className="font-semibold text-[#0D1004]">
                        {offer.price} {selectedFiat}
                      </div>
                      <div className="text-xs text-[#B3B7A5]">per {selectedCrypto.symbol}</div>
                    </td>

                    {/* Available */}
                    <td className="p-4">
                      <div className="font-medium text-[#0D1004]">
                        {offer.available} {selectedCrypto.symbol}
                      </div>
                    </td>

                    {/* Limit */}
                    <td className="p-4">
                      <div className="text-[#296253] font-medium text-sm">
                        {offer.limits} {selectedFiat}
                      </div>
                    </td>

                    {/* Payment Methods */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {offer.paymentMethods.map((method) => (
                          <span
                            key={method}
                            className="px-2 py-1 bg-[#B7DF30]/20 text-[#296253] text-xs rounded-md font-medium"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Trade Button */}
                    <td className="p-4 text-right">
                      <Button className="bg-[#B7DF30] hover:bg-[#B7DF30]/90 text-[#0D1004] font-semibold">
                        Sell {selectedCrypto.symbol}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#B3B7A5]/20">
            <h3 className="font-semibold text-[#0D1004] mb-2">Secure Trading</h3>
            <p className="text-sm text-[#296253]">
              All trades are protected with escrow service and dispute resolution
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#B3B7A5]/20">
            <h3 className="font-semibold text-[#0D1004] mb-2">Instant Settlement</h3>
            <p className="text-sm text-[#296253]">Fast payment confirmation and crypto release within minutes</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-[#B3B7A5]/20">
            <h3 className="font-semibold text-[#0D1004] mb-2">24/7 Support</h3>
            <p className="text-sm text-[#296253]">Customer support available around the clock for any issues</p>
          </div>
        </div>
      </main>

      {/* Crypto Selector Modal */}
      <CryptoSelectorModal
        isOpen={isCryptoModalOpen}
        onClose={() => setIsCryptoModalOpen(false)}
        onSelect={(crypto) => {
          setSelectedCrypto(crypto)
          setIsCryptoModalOpen(false)
        }}
        selectedSymbol={selectedCrypto.symbol}
      />
    </div>
  )
}
