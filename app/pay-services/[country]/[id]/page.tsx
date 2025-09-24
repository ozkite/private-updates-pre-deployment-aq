"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, Loader2 } from "lucide-react"
import { getCountryName, getCurrencyByCountry } from "@/lib/country-services"
import { TransactionStatus } from "@/components/transaction-status"

export default function ServicePaymentPage({ params }: { params: { country: string; id: string } }) {
  const { country, id } = params
  const countryCode = country.toUpperCase()
  const countryName = getCountryName(countryCode)
  const currency = getCurrencyByCountry(countryCode)
  
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [provider, setProvider] = useState("")
  const [amount, setAmount] = useState("")

  // Get service name based on ID
  const getServiceName = () => {
    switch (id) {
      case "mobile-data":
        return "Mobile Data Packages"
      case "mobile-plan":
        return "Mobile Plan"
      case "electricity":
        return "Electricity"
      case "tv-phone-internet":
        return "TV / Phone / Internet"
      case "gas":
        return "Gas"
      case "water":
        return "Water"
      case "transportation":
        return "Transportation"
      case "memberships":
        return "Memberships"
      case "credit-card":
        return "Credit Card"
      case "taxes":
        return "Taxes"
      case "mortgage":
        return "Mortgage"
      default:
        return "Service"
    }
  }

  // Get providers based on service and country
  const getProviders = () => {
    const providers: Record<string, string[]> = {
      "mobile-data": {
        MX: ["Telcel", "AT&T", "Movistar"],
        ES: ["Movistar", "Orange", "Vodafone"],
      }[countryCode] || ["Provider 1", "Provider 2"],
      "electricity": {
        MX: ["CFE"],
        ES: ["Endesa", "Iberdrola"],
      }[countryCode] || ["Provider 1", "Provider 2"],
      // Add more service providers as needed
    }

    return providers[id] || ["Provider 1", "Provider 2"]
  }

  const handlePayment = () => {
    if (!accountNumber || !amount || !provider) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to continue",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setIsComplete(true)
      setTxHash("0x" + Math.random().toString(16).substring(2, 34))
    }, 3000)
  }

  if (isComplete) {
    return <TransactionStatus success txHash={txHash} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Link href={`/pay-services/${country}`} className="mr-4">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{getServiceName()}</h1>
            <p className="text-sm text-gray-500">{countryName}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select onValueChange={setProvider}>
                <SelectTrigger id="provider" className="rounded-xl">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {getProviders().map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number / Reference</Label>
              <Input
                id="account-number"
                placeholder="Enter account number"
                className="rounded-xl"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-amount">Amount ({currency})</Label>
              <Input
                id="payment-amount"
                type="number"
                placeholder="0.00"
                className="rounded-xl"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                You'll be paying with USDC stablecoin on the Celo blockchain. Transaction fees are minimal.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"\
