"use client"

import type React from "react"

import { useState } from "react"
import { Search, Zap, Wifi, Phone, Home, CreditCard, MapPin, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UtilityService {
  id: string
  name: string
  category: string
  country: string
  icon: React.ReactNode
  rating: number
  processingTime: string
  fee: string
  description: string
  acceptedCurrencies: string[]
  minAmount: number
  maxAmount: number
}

const utilityServices: UtilityService[] = [
  {
    id: "1",
    name: "Electric Company Kenya",
    category: "Electricity",
    country: "Kenya",
    icon: <Zap className="h-5 w-5" />,
    rating: 4.8,
    processingTime: "Instant",
    fee: "2.5%",
    description: "Pay your electricity bills instantly with crypto",
    acceptedCurrencies: ["cUSD", "cKES", "USDC"],
    minAmount: 10,
    maxAmount: 5000,
  },
  {
    id: "2",
    name: "Safaricom Kenya",
    category: "Mobile/Internet",
    country: "Kenya",
    icon: <Phone className="h-5 w-5" />,
    rating: 4.9,
    processingTime: "< 5 min",
    fee: "1.8%",
    description: "Top up your Safaricom mobile credit and data bundles",
    acceptedCurrencies: ["cUSD", "cKES", "USDT"],
    minAmount: 5,
    maxAmount: 2000,
  },
  {
    id: "3",
    name: "COPEL Brazil",
    category: "Electricity",
    country: "Brazil",
    icon: <Zap className="h-5 w-5" />,
    rating: 4.7,
    processingTime: "Instant",
    fee: "3.0%",
    description: "Pay COPEL electricity bills with Brazilian Real stablecoin",
    acceptedCurrencies: ["cREAL", "cUSD", "USDC"],
    minAmount: 20,
    maxAmount: 8000,
  },
  {
    id: "4",
    name: "Globe Telecom Philippines",
    category: "Mobile/Internet",
    country: "Philippines",
    icon: <Wifi className="h-5 w-5" />,
    rating: 4.6,
    processingTime: "< 2 min",
    fee: "2.2%",
    description: "Load your Globe prepaid and pay postpaid bills",
    acceptedCurrencies: ["PUSO", "cUSD", "USDT"],
    minAmount: 15,
    maxAmount: 3000,
  },
  {
    id: "5",
    name: "British Gas UK",
    category: "Gas",
    country: "United Kingdom",
    icon: <Home className="h-5 w-5" />,
    rating: 4.5,
    processingTime: "< 10 min",
    fee: "2.8%",
    description: "Pay your British Gas bills with cryptocurrency",
    acceptedCurrencies: ["cEUR", "cUSD", "USDC"],
    minAmount: 25,
    maxAmount: 10000,
  },
  {
    id: "6",
    name: "Enel Colombia",
    category: "Electricity",
    country: "Colombia",
    icon: <Zap className="h-5 w-5" />,
    rating: 4.4,
    processingTime: "Instant",
    fee: "2.5%",
    description: "Pay Enel electricity bills in Colombian Peso equivalent",
    acceptedCurrencies: ["cUSD", "USDC", "USDT"],
    minAmount: 30,
    maxAmount: 6000,
  },
]

const categories = ["All", "Electricity", "Mobile/Internet", "Gas", "Water", "Internet"]
const countries = ["All", "Kenya", "Brazil", "Philippines", "United Kingdom", "Colombia", "Ghana", "South Africa"]

export function UtilityBillMarketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("All")

  const filteredServices = utilityServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    const matchesCountry = selectedCountry === "All" || service.country === selectedCountry

    return matchesSearch && matchesCategory && matchesCountry
  })

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 p-6 text-white">
        <div className="flex items-center mb-2">
          <CreditCard className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold">Global Utility Bill Payment</h1>
        </div>
        <p className="text-sm opacity-90">
          Pay utility bills worldwide with cryptocurrency - Fast, secure, and convenient
        </p>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pay Bills Across 50+ Countries</h2>
          <p className="text-lg text-gray-600 mb-6">Electricity • Mobile • Internet • Gas • Water • Insurance</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-green-600" />
              Instant Processing
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              4.8/5 Rating
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              50+ Countries
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search utility providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                {/* Service Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center text-white mr-3">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-yellow-600">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {service.rating}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                  {service.category}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                {/* Service Details */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-gray-500">Processing Time</p>
                    <p className="font-semibold text-green-600">{service.processingTime}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-gray-500">Service Fee</p>
                    <p className="font-semibold text-gray-800">{service.fee}</p>
                  </div>
                </div>

                {/* Payment Limits */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Payment Limits</p>
                  <p className="text-sm font-medium text-gray-700">
                    ${service.minAmount} - ${service.maxAmount.toLocaleString()}
                  </p>
                </div>

                {/* Accepted Currencies */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Accepted Currencies</p>
                  <div className="flex flex-wrap gap-1">
                    {service.acceptedCurrencies.map((currency) => (
                      <span
                        key={currency}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                      >
                        {currency}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Pay Bill Now</Button>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8 py-2 bg-transparent">
              Load More Services
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose DigiPaga?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Instant Processing</h4>
              <p className="text-sm text-gray-600">Most payments are processed instantly or within minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Global Coverage</h4>
              <p className="text-sm text-gray-600">Pay bills in over 50 countries with local currency support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Crypto Payments</h4>
              <p className="text-sm text-gray-600">Pay with your favorite cryptocurrencies and stablecoins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
