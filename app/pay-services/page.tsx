"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Search } from "lucide-react"
import { CountryGrid } from "@/components/country-grid"
import { LanguageSwitcher, type Language } from "@/components/language-switcher"
import { detectLanguage, getTranslation } from "@/lib/translations"

export default function SelectCountryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState<Language>("en")

  // Detect browser language on client side
  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ChevronLeft className="h-6 w-6 text-primary" />
            </Link>
            <h1 className="text-xl font-bold text-gray-800">{getTranslation("selectCountry", language)}</h1>
          </div>
          <LanguageSwitcher onChange={setLanguage} currentLanguage={language} />
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={getTranslation("searchCountries", language)}
              className="pl-10 rounded-xl border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <CountryGrid searchQuery={searchQuery} />
      </main>
    </div>
  )
}
