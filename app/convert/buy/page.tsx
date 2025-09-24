"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CountrySelector } from "@/components/country-selector"
import { getCountryName, getCurrencyByCountry } from "@/lib/country-services"
import { getStablecoinBySymbol } from "@/lib/token-contracts"

export default function BuyCryptoPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState("MX") // Default to Mexico
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [selectedToken, setSelectedToken] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [userName, setUserName] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")

  // If we're starting with Mexico selected, we can skip step 1
  const handleStart = () => {
    setStep(2)
  }

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode)
    setStep(2)
  }

  const handleAmountSubmit = () => {
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }
    setStep(3)
  }

  const handlePaymentMethodSubmit = () => {
    if (!paymentMethod) {
      toast({
        title: "Missing payment method",
        description: "Please select a payment method",
        variant: "destructive",
      })
      return
    }
    setStep(4)
  }

  const handleBankDetailsSubmit = () => {
    if (!userName || !bankName || !accountNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    setStep(5)
  }

  const handleTokenSelect = (token: string) => {
    setSelectedToken(token)
    setStep(6)
  }

  const handleConfirmTransaction = () => {
    setIsProcessing(true)

    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      setTxHash("0x" + Math.random().toString(16).substring(2, 34))
    }, 3000)
  }

  const currency = selectedCountry ? getCurrencyByCountry(selectedCountry) : ""
  const countryName = selectedCountry ? getCountryName(selectedCountry) : ""
  const tokenContract = selectedToken ? getStablecoinBySymbol(selectedToken) : undefined

  // Example exchange rates - in a real app, these would come from an API
  const exchangeRates = {
    CELO: {
      MXN: 75.5,
      EUR: 4.2,
      COP: 16500,
      ARS: 3600,
      UYU: 150,
      CLP: 3800,
      PEN: 15,
      USD: 4.2,
      BRL: 21,
      NGN: 6500,
      KES: 550,
      GHS: 55,
      ZAR: 75,
    },
    cUSD: {
      MXN: 18.5,
      EUR: 0.92,
      COP: 4000,
      ARS: 900,
      UYU: 38,
      CLP: 950,
      PEN: 3.7,
      USD: 1,
      BRL: 5.2,
      NGN: 1600,
      KES: 135,
      GHS: 13.5,
      ZAR: 18.5,
    },
    USDT: {
      MXN: 18.5,
      EUR: 0.92,
      COP: 4000,
      ARS: 900,
      UYU: 38,
      CLP: 950,
      PEN: 3.7,
      USD: 1,
      BRL: 5.2,
      NGN: 1600,
      KES: 135,
      GHS: 13.5,
      ZAR: 18.5,
    },
  }

  const getExchangeRate = () => {
    if (!selectedToken || !selectedCountry || !currency) return 0
    return (
      exchangeRates[selectedToken as keyof typeof exchangeRates]?.[currency as keyof typeof exchangeRates.CELO] || 0
    )
  }

  const exchangeRate = getExchangeRate()
  const cryptoAmount = amount && exchangeRate ? (Number(amount) / exchangeRate).toFixed(6) : "0.00"

  const renderStepIndicator = () => {
    return (
      <div className="w-full flex justify-between mb-4">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className={`h-1 flex-1 mx-0.5 rounded-full ${s <= step ? "bg-primary" : "bg-gray-200"}`} />
        ))}
      </div>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center mb-6">Select Your Country</h2>
            <CountrySelector onSelect={handleCountrySelect} defaultCountry="MX" />
          </div>
        )
      case 2:
        return (
          <Card className="border-none shadow-md">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ({currency})</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="rounded-xl text"
                />


\
