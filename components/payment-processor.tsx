"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PaymentProcessorProps {
  amount: string
  tokenSymbol: string
  recipientAddress: string
  onSuccess: (txHash: string) => void
  onError: (error: string) => void
}

export function PaymentProcessor({ amount, tokenSymbol, recipientAddress, onSuccess, onError }: PaymentProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const authenticated = false

  const handlePayment = async () => {
    if (!authenticated) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to continue",
        variant: "destructive",
      })
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // For demo purposes, we'll simulate a successful transaction
      setTimeout(() => {
        // Generate a mock transaction hash
        const mockTxHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
        onSuccess(mockTxHash)
      }, 2000)
    } catch (error) {
      console.error("Payment error:", error)
      onError(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button
      className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
      onClick={handlePayment}
      disabled={isProcessing || !authenticated}
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing Payment...
        </>
      ) : (
        "Pay Now"
      )}
    </Button>
  )
}
