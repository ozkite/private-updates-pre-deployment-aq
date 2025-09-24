import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { TopNavigation } from "@/components/top-navigation"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digipaga - Web3 Bill Payments",
  description: "Your all-in-one app to pay bills with crypto and fiat converter.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TopNavigation />
          <div className="pt-0 md:pt-0">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
