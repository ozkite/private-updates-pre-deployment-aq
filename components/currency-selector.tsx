"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SUPPORTED_CURRENCIES, type Currency, getPopularCurrencies } from "@/lib/currency-utils"

interface CurrencySelectorProps {
  onSelect: (currency: Currency) => void
  defaultCurrency?: string
}

export function CurrencySelector({ onSelect, defaultCurrency }: CurrencySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("popular")
  const popularCurrencies = getPopularCurrencies()

  // Filter currencies based on search query
  const filteredCurrencies = SUPPORTED_CURRENCIES.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // If default currency is provided, select it initially
  useEffect(() => {
    if (defaultCurrency) {
      const currency = SUPPORTED_CURRENCIES.find((c) => c.code.toLowerCase() === defaultCurrency.toLowerCase())
      if (currency) {
        onSelect(currency)
      }
    }
  }, [defaultCurrency, onSelect])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search currencies"
          className="pl-10 rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="popular" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="all">All Currencies</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-0">
          <div className="grid grid-cols-1 gap-2">
            {popularCurrencies.map((currency) => (
              <CurrencyCard key={currency.code} currency={currency} onClick={() => onSelect(currency)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto">
            {filteredCurrencies.map((currency) => (
              <CurrencyCard key={currency.code} currency={currency} onClick={() => onSelect(currency)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CurrencyCardProps {
  currency: Currency
  onClick: () => void
}

// Update the CurrencyCard component to show more information
function CurrencyCard({ currency, onClick }: CurrencyCardProps) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <span className="font-bold">{currency.code.substring(0, 2)}</span>
          </div>
          <div>
            <p className="font-medium">
              {currency.code} <span className="text-gray-500">- {currency.name}</span>
            </p>
          </div>
        </div>
        <div className="text-gray-500">{currency.symbol}</div>
      </CardContent>
    </Card>
  )
}
