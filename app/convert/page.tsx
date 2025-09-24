"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, TrendingUp, Shield, Zap } from "lucide-react"
import { CryptoMarketplace } from "@/components/crypto-marketplace"

export default function ConvertPage() {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("cUSD")

  // Mock exchange rate
  const exchangeRate = 0.98
  const fee = 0.5 // 0.5%

  const handleSwap = () => {
    const tempCurrency = fromCurrency
    const tempAmount = fromAmount
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    if (value && !isNaN(Number(value))) {
      const converted = (Number(value) * exchangeRate * (1 - fee / 100)).toFixed(6)
      setToAmount(converted)
    } else {
      setToAmount("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Section - DigiPaga In-House Converter - Reduced Width */}
        <div className="w-1/3 bg-white shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-br from-sage-green to-sage-green-600 p-6 text-white rounded-br-3xl shadow-lg">
            <div className="flex items-center mb-3">
              <img src="/images/digipaga-logo.png" alt="DigiPaga" className="h-6 mr-2 filter brightness-0 invert" />
              <h1 className="text-xl font-bold">DigiPaga Converter</h1>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Convert between fiat currencies and Mento stablecoins with the best rates
            </p>
          </div>

          {/* Converter Form */}
          <div className="p-6">
            <Card className="border-none shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-sage-green-700 text-lg font-semibold">Quick Convert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* From Currency */}
                <div className="space-y-2">
                  <Label htmlFor="from-amount" className="text-sm font-medium text-sage-green-700">
                    From
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="from-amount"
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      className="flex-1 rounded-xl border-sage-green-200 focus:border-sage-green focus:ring-sage-green/20 bg-white shadow-sm"
                    />
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-20 rounded-xl border-sage-green-200 focus:border-sage-green focus:ring-sage-green/20 bg-white shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-sage-green-200">
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="MXN">MXN</SelectItem>
                        <SelectItem value="BRL">BRL</SelectItem>
                        <SelectItem value="KES">KES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center py-2">
                  <Button
                    onClick={handleSwap}
                    variant="outline"
                    size="icon"
                    className="rounded-full border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-white transition-all duration-300 hover:rotate-180 hover:scale-110 bg-white shadow-lg w-12 h-12"
                  >
                    <ArrowUpDown className="h-5 w-5" />
                  </Button>
                </div>

                {/* To Currency */}
                <div className="space-y-2">
                  <Label htmlFor="to-amount" className="text-sm font-medium text-sage-green-700">
                    To
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="to-amount"
                      type="number"
                      placeholder="0.00"
                      value={toAmount}
                      readOnly
                      className="flex-1 rounded-xl border-sage-green-200 bg-sage-green-50 shadow-sm"
                    />
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-20 rounded-xl border-sage-green-200 focus:border-sage-green focus:ring-sage-green/20 bg-white shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-sage-green-200">
                        <SelectItem value="cUSD">cUSD</SelectItem>
                        <SelectItem value="cEUR">cEUR</SelectItem>
                        <SelectItem value="cREAL">cREAL</SelectItem>
                        <SelectItem value="cKES">cKES</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Exchange Rate Info */}
                {fromAmount && (
                  <div className="bg-gradient-to-r from-sage-green-50 to-lime-green-50 rounded-xl p-4 space-y-2 border border-sage-green-200 shadow-sm">
                    <div className="flex justify-between text-sm">
                      <span className="text-sage-green-600 font-medium">Rate:</span>
                      <span className="font-semibold text-sage-green-700">
                        1 {fromCurrency} = {exchangeRate} {toCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sage-green-600 font-medium">Fee:</span>
                      <span className="font-semibold text-sage-green-700">
                        {((Number(fromAmount) * fee) / 100).toFixed(2)} {fromCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-sage-green-200">
                      <span className="text-sage-green-700 font-semibold">You'll receive:</span>
                      <span className="font-bold text-lime-green-600">
                        {toAmount} {toCurrency}
                      </span>
                    </div>
                  </div>
                )}

                {/* Convert Button */}
                <Button
                  className="w-full py-5 rounded-xl bg-gradient-to-r from-sage-green to-sage-green-600 hover:from-sage-green-600 hover:to-sage-green-700 text-white font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] shadow-lg"
                  disabled={!fromAmount || !toAmount}
                >
                  Convert Now
                </Button>
              </CardContent>
            </Card>

            {/* Compact Features */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center p-3 bg-gradient-to-r from-sage-green-50 to-lime-green-50 rounded-xl border border-sage-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-sage-green to-sage-green-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sage-green-700 text-sm">Best Rates</h3>
                  <p className="text-xs text-sage-green-600">Competitive exchange rates</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gradient-to-r from-sage-green-50 to-lime-green-50 rounded-xl border border-sage-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-sage-green to-sage-green-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sage-green-700 text-sm">Secure & Safe</h3>
                  <p className="text-xs text-sage-green-600">Bank-level security</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gradient-to-r from-sage-green-50 to-lime-green-50 rounded-xl border border-sage-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-sage-green to-sage-green-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sage-green-700 text-sm">Instant Processing</h3>
                  <p className="text-xs text-sage-green-600">Lightning fast conversions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gradient-to-b from-sage-green-200 via-sage-green-300 to-sage-green-200 shadow-sm"></div>

        {/* Right Section - Person 2 Person Marketplace - Expanded Width */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-sage-green-50 overflow-y-auto">
          <CryptoMarketplace />
        </div>
      </div>
    </div>
  )
}
