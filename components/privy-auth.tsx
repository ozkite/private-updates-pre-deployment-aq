"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Wallet, Loader2 } from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"

export function PrivyAuth() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { login, authenticated, ready } = usePrivy()

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      await login()

      toast({
        title: "Wallet connected",
        description: "You've successfully connected your wallet",
      })

      setIsOpen(false)
    } catch (error) {
      console.error("Connection error:", error)
      toast({
        title: "Connection failed",
        description: "There was an error connecting your wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        size="lg"
        className="rounded-xl bg-white text-primary border-2 border-primary hover:bg-primary/10"
        onClick={() => (authenticated ? setIsOpen(false) : setIsOpen(true))}
      >
        <Wallet className="h-5 w-5 mr-2" />
        <span>{authenticated ? "Wallet Connected" : "Connect Wallet"}</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>
              Connect your wallet to access Digipaga services and pay with stablecoins on Celo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Button
              onClick={handleConnect}
              className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading || !ready}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect with Privy"
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>New to Web3? We'll help you create a wallet.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
