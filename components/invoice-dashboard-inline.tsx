"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  CreditCard,
  Users,
  DollarSign,
  X,
  Search,
  Plus,
  FileText,
  Send,
  Eye,
  RefreshCw,
  Coins,
  ArrowLeftRight,
  Wallet,
  Receipt,
} from "lucide-react"

interface InvoiceDashboardInlineProps {
  onClose: () => void
}

export function InvoiceDashboardInline({ onClose }: InvoiceDashboardInlineProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all-invoices")

  return (
    <div className="bg-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-16 bg-gray-50 border-r border-gray-200 p-2">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <img src="/images/self-protocol-logo.png" alt="Self" className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <Send className="h-5 w-5 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <Receipt className="h-5 w-5 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <ArrowLeftRight className="h-5 w-5 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <Shield className="h-5 w-5 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Search and New Invoice */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-lg border-gray-300"
                />
              </div>
              <Button className="bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg ml-4">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
                <TabsTrigger
                  value="all-invoices"
                  className="border-b-2 border-transparent data-[state=active]:border-[#B3B7A5] data-[state=active]:bg-transparent rounded-none px-4 py-2"
                >
                  All Invoices
                </TabsTrigger>
                <TabsTrigger
                  value="accounts-receivable"
                  className="border-b-2 border-transparent data-[state=active]:border-[#B3B7A5] data-[state=active]:bg-transparent rounded-none px-4 py-2"
                >
                  Accounts Receivable
                </TabsTrigger>
                <TabsTrigger
                  value="accounts-payable"
                  className="border-b-2 border-transparent data-[state=active]:border-[#B3B7A5] data-[state=active]:bg-transparent rounded-none px-4 py-2"
                >
                  Accounts Payable
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Dashboard Cards Grid */}
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4">
              {/* Row 1 */}
              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Invoicing Management</h3>
                  <p className="text-sm text-gray-600 mb-4">Visualize all your activity</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Send className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ask for Payment</h3>
                  <p className="text-sm text-gray-600 mb-4">Send payment petitions</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Send Petition
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Payroll Management</h3>
                  <p className="text-sm text-gray-600 mb-4">Manage payouts by date</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Manage Payroll
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Receipt className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Expense Management</h3>
                  <p className="text-sm text-gray-600 mb-4">Monitor business expenses</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Track Expenses
                  </Button>
                </CardContent>
              </Card>

              {/* Row 2 */}
              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Coins className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Currency</h3>
                  <p className="text-sm text-gray-600 mb-4">Multiple Mento Stablecoins</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Select Currency
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">DigiPaga Virtual Card</h3>
                  <p className="text-sm text-gray-600 mb-4">Pay worldwide</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Order Card
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Invoice Creation</h3>
                  <p className="text-sm text-gray-600 mb-4">Step-by-step creation</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Create Invoice
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Account Payable</h3>
                  <p className="text-sm text-gray-600 mb-4">Manage payment obligations</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Manage Payables
                  </Button>
                </CardContent>
              </Card>

              {/* Row 3 */}
              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <RefreshCw className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Recurring Invoices</h3>
                  <p className="text-sm text-gray-600 mb-4">Automated billing cycles</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Setup Recurring
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Signature Safe</h3>
                  <p className="text-sm text-gray-600 mb-4">Secure team transactions</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Setup Multi-Sig
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ArrowLeftRight className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Crypto Conversions</h3>
                  <p className="text-sm text-gray-600 mb-4">Convert between currencies</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Convert Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Wallet Integration</h3>
                  <p className="text-sm text-gray-600 mb-4">Connect crypto wallets</p>
                  <Button className="w-full bg-[#B3B7A5] hover:bg-[#B3B7A5]/90 text-white rounded-lg">
                    Connect Wallet
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
