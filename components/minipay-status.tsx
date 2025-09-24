"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function MiniPayStatus() {
  const authenticated = false
  const address = null

  if (!authenticated || !address) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="text-center py-2">
            <p className="text-amber-600 text-sm font-medium">Wallet not connected</p>
            <p className="text-xs text-gray-500 mt-1">Please connect your wallet to continue.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Wallet</h3>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm mb-3">
          <span className="text-gray-500">Address: </span>
          <span className="font-mono">{formatAddress("0x1234567890123456789012345678901234567890")}</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Connected with:</h4>
          <div className="flex items-center">
            <span className="font-medium">Wallet</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
