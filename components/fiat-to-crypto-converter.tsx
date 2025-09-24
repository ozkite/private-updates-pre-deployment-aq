"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, RefreshCw } from "lucide-react"
import { getActiveStablecoins } from "@/lib/token-contracts"
import { type Currency, formatCurrencyAmount, getExchangeRate, getPopularCurrencies } from "@/lib/currency-utils"
import { CurrencySelector } from "@/components/currency-selector"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function FiatToCryptoConverter() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [fiatAmount, setFiatAmount] = useState("")
  const [selectedToken, setSelectedToken] = useState("cUSD")
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [cryptoAmount, setCryptoAmount] = useState("")
  const [showCurrencySelector, setShowCurrencySelector] = useState(false)

  const activeStablecoins = getActiveStablecoins()

  // Update exchange rate when token or currency changes
  useEffect(() => {
    if (selectedToken && selectedCurrency) {
      updateExchangeRate()
    }
  }, [selectedToken, selectedCurrency])

  // Update crypto amount when fiat amount or exchange rate changes
  useEffect(() => {
    if (fiatAmount && exchangeRate) {
      const amount = Number.parseFloat(fiatAmount) / exchangeRate
      setCryptoAmount(amount.toFixed(6))
    } else {
      setCryptoAmount("")
    }
  }, [fiatAmount, exchangeRate])

  const updateExchangeRate = async () => {
    if (!selectedToken || !selectedCurrency) return

    setIsLoading(true)
    try {
      const rate = await getExchangeRate(selectedToken, selectedCurrency.code)
      setExchangeRate(rate)
    } catch (error) {
      toast({
        title: "Error fetching exchange rate",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency)
    setShowCurrencySelector(false)
  }

  const handleFiatAmountChange = (value: string) => {
    setFiatAmount(value)
  }

  const handleTokenChange = (value: string) => {
    setSelectedToken(value)
  }

  const handleRefreshRate = () => {
    updateExchangeRate()
  }

  return (
    <Card className="border-none shadow-md mb-6">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fiat-currency">Select Fiat Currency</Label>
          <Dialog open={showCurrencySelector} onOpenChange={setShowCurrencySelector}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-between rounded-xl h-10 px-3 py-2">
                {selectedCurrency ? (
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold">{selectedCurrency.code.substring(0, 2)}</span>
                    </div>
                    <span>{selectedCurrency.code}</span>
                    <span className="ml-2 text-gray-500">- {selectedCurrency.name}</span>
                  </div>
                ) : (
                  <span>Select currency</span>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogTitle>Select Currency</DialogTitle>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Featured Currencies</h3>
                <div className="grid grid-cols-2 gap-2">
                  {getPopularCurrencies()
                    .slice(0, 6)
                    .map((currency) => (
                      <Button
                        key={currency.code}
                        variant="outline"
                        className="justify-start h-auto py-2"
                        onClick={() => handleCurrencySelect(currency)}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold">{currency.code.substring(0, 2)}</span>
                          </div>
                          <span>{currency.code}</span>
                        </div>
                      </Button>
                    ))}
                </div>
              </div>
              <CurrencySelector onSelect={handleCurrencySelect} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fiat-amount">Amount {selectedCurrency?.code && `(${selectedCurrency.code})`}</Label>
          <Input
            id="fiat-amount"
            type="number"
            placeholder="0.00"
            className="rounded-xl"
            value={fiatAmount}
            onChange={(e) => handleFiatAmountChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="crypto-token">Select Crypto Token</Label>
          <Select value={selectedToken} onValueChange={handleTokenChange}>
            <SelectTrigger id="crypto-token" className="rounded-xl">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              {activeStablecoins.map((token) => (
                <SelectItem key={token.symbol} value={token.symbol}>
                  <div className="flex items-center">
                    <span className="mr-2">{token.logo}</span>
                    {token.name} ({token.symbol})
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCurrency && exchangeRate && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Exchange Rate</p>
                <p className="font-medium">
                  1 {selectedToken} = {exchangeRate.toFixed(4)} {selectedCurrency.code}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRefreshRate} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        {selectedToken && cryptoAmount && (
          <div className="space-y-2">
            <Label>You'll Receive (estimated)</Label>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 flex justify-between items-center">
              <span className="text-lg font-medium">{cryptoAmount}</span>
              <span className="text-gray-500">{selectedToken}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
          disabled={!selectedCurrency || !fiatAmount || isLoading}
          onClick={() => {
            toast({
              title: "Conversion Ready",
              description: `You can buy ${cryptoAmount} ${selectedToken} with ${
                selectedCurrency ? formatCurrencyAmount(Number.parseFloat(fiatAmount), selectedCurrency.code) : ""
              }`,
            })
          }}
        >
          Continue to Buy
        </Button>
      </CardFooter>
    </Card>
  )
}
