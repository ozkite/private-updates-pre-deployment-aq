"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CountryGridProps {
  searchQuery?: string
}

export function CountryGrid({ searchQuery = "" }: CountryGridProps) {
  // Focus on Latin American countries
  const countries = [
    { code: "MX", name: "Mexico" },
    { code: "CO", name: "Colombia" },
    { code: "BR", name: "Brazil" },
    { code: "AR", name: "Argentina" },
    { code: "PE", name: "Peru" },
    { code: "CL", name: "Chile" },
    { code: "SV", name: "El Salvador" },
    { code: "UY", name: "Uruguay" },
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Convert country code to regional indicator symbols for flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return (
    <div className="space-y-3">
      {filteredCountries.map((country) => (
        <Link key={country.code} href={`/pay-services/${country.code.toLowerCase()}`}>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <span className="text-xl">{getFlagEmoji(country.code)}</span>
              </div>
              <span className="font-medium">{country.name}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
