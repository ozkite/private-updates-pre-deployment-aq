"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings, CreditCard, History, Wallet } from "lucide-react"
import Link from "next/link"

export function UserAvatar() {
  const authenticated = false
  const address = null

  // Generate initials from address
  const getInitials = () => {
    if (!address) return "G"
    return "DG"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer group">
          {/* Wider green border with purple accent */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-green-400 to-green-500 p-[3px]">
            <div className="h-full w-full rounded-full bg-white"></div>
          </div>

          {/* Avatar with image */}
          <Avatar className="relative h-10 w-10">
            {authenticated ? (
              <AvatarImage src="/diverse-user-avatars.png" alt="User" className="object-cover" />
            ) : (
              <AvatarFallback className="bg-gray-200 text-gray-500">
                <Wallet className="h-5 w-5" />
              </AvatarFallback>
            )}
            <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {authenticated ? (
          <>
            <DropdownMenuLabel className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/diverse-user-avatars.png" alt="User" />
              </Avatar>
              <div>
                <span>User</span>
                <p className="text-xs text-gray-500 truncate">{address}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/transactions">
              <DropdownMenuItem className="cursor-pointer">
                <History className="mr-2 h-4 w-4" />
                <span>Transaction History</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/saved-items">
              <DropdownMenuItem className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Saved Items</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="cursor-pointer">
            <Wallet className="mr-2 h-4 w-4" />
            <span>Connect Wallet</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
