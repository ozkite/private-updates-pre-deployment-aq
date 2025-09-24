"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Wallet, ChevronDown } from "lucide-react"
import { RecentTransactions } from "@/components/recent-transactions"
import { ServiceCategory } from "@/components/service-category"
import { ExchangeRates } from "@/components/exchange-rates"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getCountryName } from "@/lib/country-services"
import { PurpleRefreshIcon } from "@/components/icons/purple-refresh"
import type { Language } from "@/components/language-switcher"
import { detectLanguage, getTranslation } from "@/lib/translations"

export default function WelcomePage() {
  const [selectedCountry, setSelectedCountry] = useState("MX")
  const [language, setLanguage] = useState<Language>("en")

  // Detect browser language on client side
  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  // List of supported countries
  const countries = [
    { code: "MX", name: "Mexico" },
    { code: "ES", name: "Spain" },
    { code: "CO", name: "Colombia" },
    { code: "AR", name: "Argentina" },
    { code: "UY", name: "Uruguay" },
    { code: "CL", name: "Chile" },
    { code: "PE", name: "Peru" },
    { code: "SV", name: "El Salvador" },
    { code: "BR", name: "Brazil" },
    { code: "NG", name: "Nigeria" },
    { code: "KE", name: "Kenya" },
    { code: "GH", name: "Ghana" },
    { code: "ZA", name: "South Africa" },
  ]

  // Convert country code to regional indicator symbols for flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  // Updated service categories - removed Mobile Plan and Phone, added Carbon Offset
  const serviceCategories = [
    { id: "mobile-data", name: "Mobile Data", icon: "smartphone" },
    { id: "electricity", name: "Electricity", icon: "lightbulb" },
    { id: "tv-phone-internet", name: "Internet", icon: "wifi" },
    { id: "tv-phone-internet", name: "TV Service", icon: "tv" },
    { id: "memberships", name: "Memberships", icon: "gift" },
    { id: "water", name: "Water", icon: "droplet" },
    { id: "gas", name: "Gas", icon: "flame" },
    { id: "carbon-offset", name: "Carbon Offset", icon: "leaf" },
    { id: "taxes", name: "Taxes", icon: "landmark" },
    { id: "mortgage", name: "Mortgage", icon: "home" },
    { id: "insurance", name: "Insurance", icon: "shield" },
    { id: "car-loan", name: "Car Loan", icon: "car" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex flex-col p-4 pt-6 space-y-6">
        {/* Single Wide Button */}
        <Link href="/pay-services" className="block w-full">
          <Button className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-custom-green text-white transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
            Pay utility bill instantly with crypto 🪙
          </Button>
        </Link>

        {/* Country Selector */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-gray-300 hover:border-primary hover:text-primary transition-all duration-300 bg-transparent"
              >
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{getFlagEmoji(selectedCountry)}</span>
                  <span>{getCountryName(selectedCountry)}</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
              {countries.map((country) => (
                <DropdownMenuItem
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className="cursor-pointer hover:bg-primary/10"
                >
                  <span className="mr-2">{getFlagEmoji(country.code)}</span>
                  {country.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Service Categories - Updated list */}
        <div className="grid grid-cols-4 gap-2">
          {serviceCategories.map((category) => (
            <ServiceCategory
              key={`${category.id}-${category.name}`}
              id={category.id}
              name={category.name}
              icon={category.icon}
              country={selectedCountry}
            />
          ))}
        </div>

        {/* Additional space after service buttons - reduced to one line */}
        <div className="h-8"></div>

        {/* Divider with CRYPTO CONVERSION title */}
        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-gray-200 flex-1"></div>
          <h2 className="text-xl font-bold text-gray-800 uppercase">CRYPTO CONVERSION</h2>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Wallet Icon centered between title and button */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Wallet className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* CRYPTO CONVERSION Section - Just the button and content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Button - Removing text, keeping only the icon */}
          <Link href="/convert" className="block w-full mb-4">
            <Button
              className="w-full py-6 text-lg rounded-xl bg-secondary hover:bg-primary text-white font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
              size="lg"
            >
              <PurpleRefreshIcon className="h-8 w-8" />
            </Button>
          </Link>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 text-center mb-6">
            Swap your local currency for crypto and vice versa instantly with the lowest fee available
          </p>

          {/* Exchange Rates */}
          <ExchangeRates />
        </div>

        {/* More space before Recent Transactions */}
        <div className="h-4"></div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{getTranslation("recentActivity", language)}</h2>
            <Link
              href="/transactions"
              className="text-primary text-sm flex items-center hover:text-custom-green transition-colors duration-300"
            >
              {getTranslation("viewAll", language)}
              <Clock className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <RecentTransactions />
        </div>

        {/* Wallet Notice - Only shows when not connected */}
        <WalletNoticeSimple language={language} />
      </main>
    </div>
  )
}

// Simplified components to avoid circular dependencies
function UserAvatarSimple() {
  return (
    <div className="relative cursor-pointer group">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-custom-green to-secondary p-[3px]">
        <div className="h-full w-full rounded-full bg-white"></div>
      </div>
      <div className="relative h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
        <Wallet className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  )
}

function WalletStatusSimple() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="text-center py-2">
        <p className="text-amber-600 text-sm font-medium">Wallet not connected</p>
        <p className="text-xs text-gray-500 mt-1">Please connect your wallet to continue.</p>
      </div>
    </div>
  )
}

function WalletNoticeSimple({ language }: { language: Language }) {
  return (
    <div className="bg-white rounded-xl shadow-md mt-6 p-4">
      <div className="text-center py-2">
        <p className="text-amber-600 text-sm font-medium">Wallet not connected</p>
        <p className="text-xs text-gray-500 mt-1 mb-3">Connect your wallet to access all features.</p>
        <Button
          variant="outline"
          size="sm"
          className="text-primary border-primary hover:bg-primary hover:text-white transition-all duration-300 bg-transparent"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </div>
    </div>
  )
}
