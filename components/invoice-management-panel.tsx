"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  FileText,
  Plus,
  Search,
  Download,
  Send,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  User,
  Mail,
  Copy,
  ExternalLink,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Invoice {
  id: string
  number: string
  clientName: string
  clientEmail: string
  amount: number
  currency: string
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  dueDate: Date
  createdDate: Date
  description: string
  items: InvoiceItem[]
  paymentMethod?: string
  txHash?: string
}

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface Client {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  address?: string
}

export function InvoiceManagementPanel() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false)

  // Mock data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "inv-001",
      number: "INV-2024-001",
      clientName: "Acme Corporation",
      clientEmail: "billing@acme.com",
      amount: 2500.0,
      currency: "USD",
      status: "paid",
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      description: "Web development services",
      items: [
        { id: "1", description: "Frontend Development", quantity: 40, rate: 50, amount: 2000 },
        { id: "2", description: "Backend Integration", quantity: 10, rate: 50, amount: 500 },
      ],
      paymentMethod: "cUSD",
      txHash: "0x1234567890abcdef",
    },
    {
      id: "inv-002",
      number: "INV-2024-002",
      clientName: "Tech Startup Inc",
      clientEmail: "finance@techstartup.com",
      amount: 1800.0,
      currency: "USD",
      status: "sent",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      description: "Mobile app development",
      items: [
        { id: "1", description: "UI/UX Design", quantity: 20, rate: 60, amount: 1200 },
        { id: "2", description: "Mobile Development", quantity: 12, rate: 50, amount: 600 },
      ],
    },
    {
      id: "inv-003",
      number: "INV-2024-003",
      clientName: "Global Solutions Ltd",
      clientEmail: "accounts@globalsolutions.com",
      amount: 3200.0,
      currency: "EUR",
      status: "overdue",
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
      description: "Consulting services",
      items: [{ id: "1", description: "Strategy Consulting", quantity: 32, rate: 100, amount: 3200 }],
    },
  ])

  const [clients] = useState<Client[]>([
    {
      id: "client-001",
      name: "Acme Corporation",
      email: "billing@acme.com",
      company: "Acme Corp",
      phone: "+1-555-0123",
      address: "123 Business St, New York, NY 10001",
    },
    {
      id: "client-002",
      name: "Tech Startup Inc",
      email: "finance@techstartup.com",
      company: "Tech Startup Inc",
      phone: "+1-555-0456",
      address: "456 Innovation Ave, San Francisco, CA 94105",
    },
  ])

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Statistics
  const stats = {
    total: invoices.length,
    paid: invoices.filter((inv) => inv.status === "paid").length,
    pending: invoices.filter((inv) => inv.status === "sent").length,
    overdue: invoices.filter((inv) => inv.status === "overdue").length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidAmount: invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "sent":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <XCircle className="h-4 w-4" />
      case "draft":
        return <FileText className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleSendInvoice = (invoiceId: string) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: "sent" as const } : inv)))
    toast({
      title: "Invoice sent",
      description: "Invoice has been sent to the client successfully",
    })
  }

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: "paid" as const } : inv)))
    toast({
      title: "Invoice marked as paid",
      description: "Invoice status has been updated",
    })
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-[#296253]">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-[#B3B7A5]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-[#B3B7A5] to-[#B3B7A5]/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold">${stats.totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-10 w-10 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-gradient-to-br from-[#B7DF30] to-[#B7DF30]/80 text-[#296253]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#296253]/80 text-sm">Paid Revenue</p>
                <p className="text-3xl font-bold">${stats.paidAmount.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-[#296253]/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-[#296253]">Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.slice(0, 5).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#B3B7A5]/10 rounded-full flex items-center justify-center">
                    {getStatusIcon(invoice.status)}
                  </div>
                  <div>
                    <p className="font-medium text-[#296253]">{invoice.number}</p>
                    <p className="text-sm text-gray-500">{invoice.clientName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#296253]">${invoice.amount.toLocaleString()}</p>
                  <Badge className={`text-xs ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderInvoiceList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setShowCreateInvoice(true)}
            className="bg-[#B7DF30] hover:bg-[#B7DF30]/90 text-[#296253] font-semibold rounded-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Invoice Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-[#296253]">Invoice</th>
                  <th className="text-left p-4 font-semibold text-[#296253]">Client</th>
                  <th className="text-left p-4 font-semibold text-[#296253]">Amount</th>
                  <th className="text-left p-4 font-semibold text-[#296253]">Status</th>
                  <th className="text-left p-4 font-semibold text-[#296253]">Due Date</th>
                  <th className="text-left p-4 font-semibold text-[#296253]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-[#296253]">{invoice.number}</p>
                        <p className="text-sm text-gray-500">
                          {formatDistanceToNow(invoice.createdDate, { addSuffix: true })}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-[#296253]">{invoice.clientName}</p>
                        <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-[#296253]">${invoice.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{invoice.currency}</p>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getStatusColor(invoice.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <p className="text-[#296253]">{invoice.dueDate.toLocaleDateString()}</p>
                      {invoice.status === "overdue" && (
                        <p className="text-sm text-red-500">{formatDistanceToNow(invoice.dueDate)} overdue</p>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedInvoice(invoice)
                            setShowInvoiceDetails(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {invoice.status === "draft" && (
                          <Button variant="ghost" size="sm" onClick={() => handleSendInvoice(invoice.id)}>
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        {invoice.status === "sent" && (
                          <Button variant="ghost" size="sm" onClick={() => handleMarkAsPaid(invoice.id)}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCreateInvoice = () => (
    <Dialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#296253]">Create New Invoice</DialogTitle>
        </DialogHeader>
        <CreateInvoiceForm onClose={() => setShowCreateInvoice(false)} clients={clients} />
      </DialogContent>
    </Dialog>
  )

  const renderInvoiceDetails = () => (
    <Dialog open={showInvoiceDetails} onOpenChange={setShowInvoiceDetails}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#296253]">Invoice Details</DialogTitle>
        </DialogHeader>
        {selectedInvoice && <InvoiceDetailsView invoice={selectedInvoice} />}
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#296253]">Invoice Management</h1>
            <p className="text-gray-600 mt-1">Create, send, and track your invoices</p>
          </div>
          <Button
            onClick={() => setShowCreateInvoice(true)}
            className="bg-[#B7DF30] hover:bg-[#B7DF30]/90 text-[#296253] font-semibold rounded-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="overview" className="rounded-xl">
              Overview
            </TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-xl">
              All Invoices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">{renderOverview()}</TabsContent>

          <TabsContent value="invoices">{renderInvoiceList()}</TabsContent>
        </Tabs>

        {/* Modals */}
        {renderCreateInvoice()}
        {renderInvoiceDetails()}
      </div>
    </div>
  )
}

// Create Invoice Form Component
function CreateInvoiceForm({ onClose, clients }: { onClose: () => void; clients: Client[] }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    clientId: "",
    description: "",
    dueDate: "",
    currency: "USD",
    items: [{ description: "", quantity: 1, rate: 0 }],
  })

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, rate: 0 }],
    }))
  }

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const updateItem = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Invoice created",
      description: "Your invoice has been created successfully",
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client">Client</Label>
          <Select
            value={formData.clientId}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, clientId: value }))}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name} - {client.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Invoice description..."
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          className="rounded-xl"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Invoice Items</Label>
          <Button type="button" onClick={addItem} variant="outline" size="sm" className="rounded-xl bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-5">
              <Label className="text-xs">Description</Label>
              <Input
                placeholder="Item description"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-xs">Qty</Label>
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 1)}
                className="rounded-xl"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-xs">Rate</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={item.rate}
                onChange={(e) => updateItem(index, "rate", Number.parseFloat(e.target.value) || 0)}
                className="rounded-xl"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-xs">Amount</Label>
              <Input value={`$${(item.quantity * item.rate).toFixed(2)}`} readOnly className="rounded-xl bg-gray-50" />
            </div>
            <div className="col-span-1">
              {formData.items.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeItem(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <div className="bg-[#B3B7A5]/10 p-4 rounded-xl">
            <p className="text-lg font-semibold text-[#296253]">Total: ${calculateTotal().toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose} className="rounded-xl bg-transparent">
          Cancel
        </Button>
        <Button type="submit" className="bg-[#B7DF30] hover:bg-[#B7DF30]/90 text-[#296253] rounded-xl">
          Create Invoice
        </Button>
      </div>
    </form>
  )
}

// Invoice Details View Component
function InvoiceDetailsView({ invoice }: { invoice: Invoice }) {
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to clipboard",
    })
  }

  return (
    <div className="space-y-6">
      {/* Invoice Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#296253]">{invoice.number}</h2>
          <p className="text-gray-600">{invoice.description}</p>
        </div>
        <Badge className={`${getStatusColor(invoice.status)} text-lg px-4 py-2`}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </Badge>
      </div>

      {/* Client and Invoice Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#296253] flex items-center">
              <User className="h-5 w-5 mr-2" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold">{invoice.clientName}</p>
            <p className="text-gray-600 flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {invoice.clientEmail}
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#296253] flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Created:</span>
              <span>{invoice.createdDate.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Due Date:</span>
              <span>{invoice.dueDate.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Currency:</span>
              <span>{invoice.currency}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Items */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#296253]">Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-2 font-semibold text-[#296253]">Description</th>
                  <th className="text-right p-2 font-semibold text-[#296253]">Qty</th>
                  <th className="text-right p-2 font-semibold text-[#296253]">Rate</th>
                  <th className="text-right p-2 font-semibold text-[#296253]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2 text-right">{item.quantity}</td>
                    <td className="p-2 text-right">${item.rate.toFixed(2)}</td>
                    <td className="p-2 text-right font-semibold">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="p-2 text-right font-semibold text-[#296253]">
                    Total:
                  </td>
                  <td className="p-2 text-right font-bold text-lg text-[#296253]">${invoice.amount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      {invoice.status === "paid" && invoice.txHash && (
        <Card className="border-none shadow-sm bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold">{invoice.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction Hash:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{invoice.txHash?.substring(0, 10)}...</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(invoice.txHash || "")}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="rounded-xl bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" className="rounded-xl bg-transparent">
          <Send className="h-4 w-4 mr-2" />
          Send Reminder
        </Button>
        {invoice.status === "sent" && (
          <Button className="bg-[#B7DF30] hover:bg-[#B7DF30]/90 text-[#296253] rounded-xl">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Paid
          </Button>
        )}
      </div>
    </div>
  )
}

// Helper function for status colors (moved outside component to avoid redefinition)
function getStatusColor(status: string) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800"
    case "sent":
      return "bg-blue-100 text-blue-800"
    case "overdue":
      return "bg-red-100 text-red-800"
    case "draft":
      return "bg-gray-100 text-gray-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
