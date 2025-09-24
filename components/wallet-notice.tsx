"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Language } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

interface WalletNoticeProps {
  language: Language
}

export function WalletNotice({ language }: WalletNoticeProps) {
  const authenticated = false

  // Only show if not connected
  if (authenticated) {
    return null
  }

  return (
    <Card className="border-none shadow-md mt-6">
      <CardContent className="p-4">
        <div className="text-center py-2">
          <p className="text-amber-600 text-sm font-medium">Wallet not connected</p>
          <p className="text-xs text-gray-500 mt-1 mb-3">Connect your wallet to access all features.</p>
          <Button variant="outline" size="sm" className="text-primary border-primary">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
