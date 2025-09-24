"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Wallet, Receipt, Banknote, FileText, ArrowLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useState, useEffect } from "react"
import { type Language, detectLanguage } from "@/lib/translations"
import { InvoiceDashboardInline } from "@/components/invoice-dashboard-inline"
import { UtilityBillMarketplace } from "@/components/utility-bill-marketplace"

export function TopNavigation() {
  const pathname = usePathname()
  const [language, setLanguage] = useState<Language>("en")
  const [showInvoiceDashboard, setShowInvoiceDashboard] = useState(false)
  const [showUtilityBillMarketplace, setShowUtilityBillMarketplace] = useState(false)

  // Detect browser language on client side
  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  const navItems = [{ name: "Convert Crypto", href: "/convert", icon: <Banknote className="mr-2 h-4 w-4" /> }]

  // Pay Utility Bill trigger
  const payUtilityTrigger = (
    <button
      onClick={() => {
        setShowUtilityBillMarketplace(!showUtilityBillMarketplace)
        if (showInvoiceDashboard) setShowInvoiceDashboard(false)
      }}
      className={cn(
        "text-sm font-medium transition-all duration-300 px-4 py-1.5 rounded-md border flex items-center hover:shadow-md transform hover:scale-105",
        pathname === "/pay-services" || pathname.startsWith("/pay-services/") || showUtilityBillMarketplace
          ? "text-white bg-primary border-primary shadow-lg"
          : "text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5",
      )}
    >
      <Receipt className="mr-2 h-4 w-4" />
      Pay Utility Bill
    </button>
  )

  // Digi Pay dropdown trigger
  const digiPayTrigger = (
    <button
      onClick={() => {
        setShowInvoiceDashboard(!showInvoiceDashboard)
        if (showUtilityBillMarketplace) setShowUtilityBillMarketplace(false)
      }}
      className={cn(
        "text-sm font-medium transition-all duration-300 px-4 py-1.5 rounded-md border flex items-center hover:shadow-md transform hover:scale-105",
        pathname === "/invoices" || pathname.startsWith("/invoices/") || showInvoiceDashboard
          ? "text-white bg-primary border-primary shadow-lg"
          : "text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5",
      )}
    >
      <FileText className="mr-2 h-4 w-4" />
      Digi Pay
    </button>
  )

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/images/digipaga-logo.png" alt="DigiPaga" className="h-8" />
        </Link>

        {/* Centered navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-6">
            {/* Pay Utility Bill - now with click functionality */}
            {payUtilityTrigger}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 px-4 py-1.5 rounded-md border flex items-center hover:shadow-md transform hover:scale-105",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-white bg-primary border-primary shadow-lg"
                    : "text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5",
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {/* Digi Pay - now with click functionality */}
            {digiPayTrigger}

            {/* Swap button positioned between Digi Pay and Connect Wallet */}
            <Link
              href="/swap"
              className={cn(
                "text-sm font-medium transition-all duration-300 px-4 py-1.5 rounded-md border flex items-center hover:shadow-md transform hover:scale-105",
                pathname === "/swap" || pathname.startsWith("/swap/")
                  ? "text-white bg-primary border-primary shadow-lg"
                  : "text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5",
              )}
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Swap
            </Link>
          </div>
        </nav>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 bg-transparent"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
          <LanguageSwitcher onChange={setLanguage} currentLanguage={language} />
        </div>
      </div>

      {/* Utility Bill Marketplace - shown inline when Pay Utility Bill is clicked */}
      {showUtilityBillMarketplace && (
        <div className="bg-white border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setShowUtilityBillMarketplace(false)}
              className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-110"
            >
              ✕
            </button>
            <UtilityBillMarketplace />
          </div>
        </div>
      )}

      {/* Invoice Dashboard - shown inline when Digi Pay is clicked */}
      {showInvoiceDashboard && (
        <div className="bg-white border-t border-gray-200">
          <InvoiceDashboardInline onClose={() => setShowInvoiceDashboard(false)} />
        </div>
      )}

      {/* Mobile navigation */}
      <div className="md:hidden flex overflow-x-auto scrollbar-hide py-2 px-4 border-t border-gray-100 justify-center">
        <button
          onClick={() => {
            setShowUtilityBillMarketplace(!showUtilityBillMarketplace)
            if (showInvoiceDashboard) setShowInvoiceDashboard(false)
          }}
          className={cn(
            "text-sm font-medium transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-md border mx-1 flex items-center hover:shadow-md transform hover:scale-105",
            pathname === "/pay-services" || pathname.startsWith("/pay-services/") || showUtilityBillMarketplace
              ? "bg-primary text-white border-primary shadow-lg"
              : "text-gray-600 border-gray-200 hover:border-primary hover:bg-primary/5",
          )}
        >
          <Receipt className="mr-2 h-4 w-4" />
          Pay Utility Bill
        </button>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-md border mx-1 flex items-center hover:shadow-md transform hover:scale-105",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-primary text-white border-primary shadow-lg"
                : "text-gray-600 border-gray-200 hover:border-primary hover:bg-primary/5",
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
        <button
          onClick={() => {
            setShowInvoiceDashboard(!showInvoiceDashboard)
            if (showUtilityBillMarketplace) setShowUtilityBillMarketplace(false)
          }}
          className={cn(
            "text-sm font-medium transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-md border mx-1 flex items-center hover:shadow-md transform hover:scale-105",
            pathname === "/invoices" || pathname.startsWith("/invoices/") || showInvoiceDashboard
              ? "bg-primary text-white border-primary shadow-lg"
              : "text-gray-600 border-gray-200 hover:border-primary hover:bg-primary/5",
          )}
        >
          <FileText className="mr-2 h-4 w-4" />
          Digi Pay
        </button>
        <Link
          href="/swap"
          className={cn(
            "text-sm font-medium transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-md border mx-1 flex items-center hover:shadow-md transform hover:scale-105",
            pathname === "/swap" || pathname.startsWith("/swap/")
              ? "bg-primary text-white border-primary shadow-lg"
              : "text-gray-600 border-gray-200 hover:border-primary hover:bg-primary/5",
          )}
        >
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Swap
        </Link>
      </div>
    </div>
  )
}
