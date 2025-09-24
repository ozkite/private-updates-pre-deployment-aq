"use client"

import { useState, useEffect } from "react"
import { TopNavigation } from "@/components/top-navigation"
import { AppFooter } from "@/components/app-footer"
import { FiatToCryptoConverter } from "@/components/fiat-to-crypto-converter"
import { CryptoToFiatConverter } from "@/components/crypto-to-fiat-converter"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight } from "lucide-react"
import { type Language, detectLanguage } from "@/lib/translations"

export default function SwapPage() {
  const [swapDirection, setSwapDirection] = useState<"fiat-to-crypto" | "crypto-to-fiat">("fiat-to-crypto")
  const [language, setLanguage] = useState<Language>("en")

  // Detect browser language on client side
  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  const toggleSwapDirection = () => {
    setSwapDirection((prev) => (prev === "fiat-to-crypto" ? "crypto-to-fiat" : "fiat-to-crypto"))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === "es" ? "Intercambiar" : language === "pt" ? "Trocar" : "Swap"}
            </h1>
            <p className="text-gray-600">
              {language === "es"
                ? "Convierte entre criptomonedas y monedas fiduciarias fácilmente"
                : language === "pt"
                  ? "Converta entre criptomoedas e moedas fiduciárias facilmente"
                  : "Convert between cryptocurrencies and fiat currencies easily"}
            </p>
          </div>

          {/* Swap Direction Toggle */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white rounded-lg p-1 shadow-sm border">
              <Button
                variant={swapDirection === "fiat-to-crypto" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSwapDirection("fiat-to-crypto")}
                className="mr-1"
              >
                {language === "es" ? "Fiat → Cripto" : language === "pt" ? "Fiat → Cripto" : "Fiat → Crypto"}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleSwapDirection} className="mx-1 p-2">
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
              <Button
                variant={swapDirection === "crypto-to-fiat" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSwapDirection("crypto-to-fiat")}
                className="ml-1"
              >
                {language === "es" ? "Cripto → Fiat" : language === "pt" ? "Cripto → Fiat" : "Crypto → Fiat"}
              </Button>
            </div>
          </div>

          {/* Converter Component */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {swapDirection === "fiat-to-crypto" ? <FiatToCryptoConverter /> : <CryptoToFiatConverter />}
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === "es"
                  ? "Tarifas Competitivas"
                  : language === "pt"
                    ? "Taxas Competitivas"
                    : "Competitive Rates"}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === "es"
                  ? "Obtén las mejores tasas de cambio del mercado con tarifas transparentes y sin sorpresas."
                  : language === "pt"
                    ? "Obtenha as melhores taxas de câmbio do mercado com taxas transparentes e sem surpresas."
                    : "Get the best market exchange rates with transparent fees and no surprises."}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === "es"
                  ? "Transacciones Seguras"
                  : language === "pt"
                    ? "Transações Seguras"
                    : "Secure Transactions"}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === "es"
                  ? "Todas las transacciones están protegidas con encriptación de nivel bancario y autenticación multifactor."
                  : language === "pt"
                    ? "Todas as transações são protegidas com criptografia de nível bancário e autenticação multifator."
                    : "All transactions are protected with bank-level encryption and multi-factor authentication."}
              </p>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
