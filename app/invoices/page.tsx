"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Send,
  CreditCard,
  Users,
  RefreshCw,
  Receipt,
  Shield,
  Coins,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  Building2,
  UserPlus,
  Eye,
} from "lucide-react"

export default function InvoiceManagementDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Self Protocol - Updated styling */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/images/self-protocol-logo.png" alt="Self Protocol" className="h-8 mr-2" />
              <h1 className="text-lg font-medium text-gray-700">validate your identity with self protocol</h1>
            </div>
          </div>

          {/* Main Dashboard Grid - Symmetric Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* DigiPaga Monitor */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <Eye className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">DigiPaga Monitor</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Visualize all your activity</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">View Dashboard</Button>
                </CardContent>
              </Card>

              {/* Payment Petition */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <Send className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Payment Petition</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">
                    Send a petition of payment to your clients with details of your invoice
                  </p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Send Petition</Button>
                </CardContent>
              </Card>

              {/* Payroll Management */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <Users className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Payroll Management</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">
                    Send and request job payouts by date, by category, or milestones
                  </p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Manage Payroll</Button>
                </CardContent>
              </Card>

              {/* Expense Management */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <Receipt className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Expense Management</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Manage and monitor all your payments</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Track Expenses</Button>
                </CardContent>
              </Card>

              {/* Multi-Currency */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <Coins className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Multi-Currency</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Choose payments in 15 Mento Stablecoins</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Select Currency</Button>
                </CardContent>
              </Card>

              {/* Order DigiPaga Virtual Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Order DigiPaga Virtual Card</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Deposit Crypto or FIAT and pay around the world</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Order Card</Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Invoice Creation */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <FileText className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Invoice Creation</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Step-by-step invoice file creation and transaction details</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Create Invoice</Button>
                </CardContent>
              </Card>

              {/* Account Payable */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Account Payable</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Easy way to manage your payments</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Manage Payables</Button>
                </CardContent>
              </Card>

              {/* Recurring Invoices */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <RefreshCw className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Recurring Invoices</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">
                    Customize intervals (weekly, monthly, etc.), with file creation
                  </p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Setup Recurring</Button>
                </CardContent>
              </Card>

              {/* Safe Global Multi-Signature */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <Shield className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Safe Global Multi-Signature</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Invite teams to move funds with you</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Setup Multi-Sig</Button>
                </CardContent>
              </Card>

              {/* Conversions */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <ArrowLeftRight className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Conversions</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Convert Fiat to Crypto and viceversa</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Convert Now</Button>
                </CardContent>
              </Card>

              {/* Placeholder for symmetry */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <Wallet className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-lg">Wallet Integration</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Connect and manage your crypto wallets</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Connect Wallet</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* For Companies and For Freelancers Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-primary" />
                  For Companies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Expenses</h3>
                      <p className="text-sm text-gray-500">Easily manage your corporate expenses in crypto & fiat</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Payroll</h3>
                      <p className="text-sm text-gray-500">Pay your team salaries and bonuses in crypto & fiat</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Multi-Signature</h3>
                      <p className="text-sm text-gray-500">Secure team fund management with multi-sig wallets</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  For Freelancers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Invoicing</h3>
                      <p className="text-sm text-gray-500">
                        The easiest way for freelancers and contractors to get paid in crypto & fiat
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Expenses</h3>
                      <p className="text-sm text-gray-500">Get reimbursed for your corporate expenses</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <UserPlus className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Referrals</h3>
                      <p className="text-sm text-gray-500">Earn rewards by referring other freelancers</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
