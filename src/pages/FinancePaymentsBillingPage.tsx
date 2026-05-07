import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { DollarSign, CreditCard, FileText, Plus, Search, Download, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function FinancePaymentsBillingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const recentPayments = [
    {
      id: "PAY-2026-5001",
      studentId: "2024-001234",
      studentName: "Juan Dela Cruz",
      amount: 15000,
      method: "Bank Transfer",
      date: "2026-05-07",
      time: "10:30 AM",
      status: "Completed",
      reference: "BT-789456123"
    },
    {
      id: "PAY-2026-5002",
      studentId: "2024-001235",
      studentName: "Maria Santos",
      amount: 10000,
      method: "Cash",
      date: "2026-05-07",
      time: "11:15 AM",
      status: "Completed",
      reference: "CASH-001"
    },
    {
      id: "PAY-2026-5003",
      studentId: "2024-001236",
      studentName: "Pedro Reyes",
      amount: 22500,
      method: "Check",
      date: "2026-05-06",
      time: "02:45 PM",
      status: "Pending Verification",
      reference: "CHK-112233"
    },
    {
      id: "PAY-2026-5004",
      studentId: "2024-001237",
      studentName: "Ana Garcia",
      amount: 45000,
      method: "Online Payment",
      date: "2026-05-06",
      time: "09:20 AM",
      status: "Completed",
      reference: "ONL-998877"
    },
    {
      id: "PAY-2026-5005",
      studentId: "2024-001238",
      studentName: "Jose Ramos",
      amount: 8000,
      method: "Bank Transfer",
      date: "2026-05-05",
      time: "03:30 PM",
      status: "Completed",
      reference: "BT-554433"
    },
  ];

  const pendingBills = [
    {
      studentId: "2024-001240",
      studentName: "Carlos Martinez",
      program: "Computer Science",
      totalAmount: 45000,
      dueDate: "2026-05-15",
      itemsCount: 5,
      status: "Overdue"
    },
    {
      studentId: "2024-001241",
      studentName: "Sofia Lopez",
      program: "Business Admin",
      totalAmount: 42000,
      dueDate: "2026-05-20",
      itemsCount: 4,
      status: "Due Soon"
    },
    {
      studentId: "2024-001242",
      studentName: "Miguel Torres",
      program: "Engineering",
      totalAmount: 48000,
      dueDate: "2026-05-25",
      itemsCount: 6,
      status: "Pending"
    },
  ];

  const paymentMethods = [
    { name: "Cash", count: 145, percentage: 35 },
    { name: "Bank Transfer", count: 180, percentage: 43 },
    { name: "Check", count: 45, percentage: 11 },
    { name: "Online Payment", count: 48, percentage: 11 },
  ];

  return (
    <DashboardLayout userRole="finance" userName="Finance Officer">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments & Billing</h1>
          <p className="text-muted-foreground">Process payments and manage student billing</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Payments</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₱125K</div>
              <p className="text-xs text-muted-foreground mt-1">15 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">8</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overdue Bills</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">23</div>
              <p className="text-xs text-muted-foreground mt-1">Require follow-up</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₱6.2M</div>
              <p className="text-xs text-muted-foreground mt-1">418 transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payments">Recent Payments</TabsTrigger>
            <TabsTrigger value="billing">Pending Bills</TabsTrigger>
            <TabsTrigger value="new">New Payment</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          </TabsList>

          {/* Recent Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Payment Transactions</CardTitle>
                  <CardDescription>Latest payments processed in the system</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by student name or payment ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Method</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reference</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm font-mono">{payment.id}</td>
                          <td className="py-3 px-4 text-sm font-mono">{payment.studentId}</td>
                          <td className="py-3 px-4 text-sm">{payment.studentName}</td>
                          <td className="py-3 px-4 text-sm font-semibold text-green-600">₱{payment.amount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm">{payment.method}</td>
                          <td className="py-3 px-4 text-sm">
                            <div>{payment.date}</div>
                            <div className="text-xs text-muted-foreground">{payment.time}</div>
                          </td>
                          <td className="py-3 px-4 text-sm font-mono text-xs">{payment.reference}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              payment.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm">
                              View Receipt
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Bills Tab */}
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Bills & Invoices</CardTitle>
                <CardDescription>Outstanding bills requiring payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Program</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Due Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Items</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingBills.map((bill) => (
                        <tr key={bill.studentId} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm font-mono">{bill.studentId}</td>
                          <td className="py-3 px-4 text-sm font-semibold">{bill.studentName}</td>
                          <td className="py-3 px-4 text-sm">{bill.program}</td>
                          <td className="py-3 px-4 text-sm font-semibold text-red-600">₱{bill.totalAmount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm">{bill.dueDate}</td>
                          <td className="py-3 px-4 text-sm">{bill.itemsCount} items</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              bill.status === "Overdue" ? "bg-red-100 text-red-800" :
                              bill.status === "Due Soon" ? "bg-orange-100 text-orange-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {bill.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View Bill
                              </Button>
                              <Button variant="default" size="sm">
                                Process Payment
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
          </TabsContent>

          {/* New Payment Tab */}
          <TabsContent value="new" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Process New Payment</CardTitle>
                <CardDescription>Record a new payment transaction</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input id="studentId" placeholder="Enter student ID" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentName">Student Name</Label>
                      <Input id="studentName" placeholder="Auto-filled after student ID" disabled />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Payment Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₱</span>
                        <Input id="amount" type="number" placeholder="0.00" className="pl-8" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <Select>
                        <SelectTrigger id="paymentMethod">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                          <SelectItem value="online">Online Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference Number</Label>
                      <Input id="reference" placeholder="Transaction reference number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Payment Date</Label>
                      <Input id="date" type="date" defaultValue="2026-05-07" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="remarks">Remarks (Optional)</Label>
                      <Input id="remarks" placeholder="Additional notes or comments" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Plus className="w-4 h-4 mr-2" />
                      Process Payment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="methods" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods Distribution</CardTitle>
                <CardDescription>Breakdown of payment methods used this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.count} transactions</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">{method.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${method.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
