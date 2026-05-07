import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, Users, FileText } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../components/ui/button";

export default function FinanceDashboard() {
  const financeName = "Finance Officer";

  const monthlyRevenueData = [
    { month: "Sep", revenue: 5200000, target: 5000000 },
    { month: "Oct", revenue: 5450000, target: 5300000 },
    { month: "Nov", revenue: 5100000, target: 5200000 },
    { month: "Dec", revenue: 4800000, target: 5000000 },
    { month: "Jan", revenue: 6200000, target: 6000000 },
    { month: "Feb", revenue: 6100000, target: 6000000 },
    { month: "Mar", revenue: 6400000, target: 6200000 },
  ];

  const paymentStatusData = [
    { name: "Fully Paid", value: 850, color: "#10b981" },
    { name: "Partially Paid", value: 420, color: "#f59e0b" },
    { name: "Overdue", value: 95, color: "#ef4444" },
    { name: "Pending", value: 35, color: "#6b7280" },
  ];

  const tuitionByProgramData = [
    { program: "Computer Science", collected: 12500000, total: 14000000 },
    { program: "Business Admin", collected: 10200000, total: 11500000 },
    { program: "Engineering", collected: 8900000, total: 10200000 },
    { program: "Education", collected: 7100000, total: 8000000 },
  ];

  const recentTransactions = [
    { id: "TXN-2024-1234", student: "Juan Dela Cruz", amount: 45000, date: "2026-05-07", status: "Completed" },
    { id: "TXN-2024-1235", student: "Maria Santos", amount: 22500, date: "2026-05-07", status: "Completed" },
    { id: "TXN-2024-1236", student: "Pedro Reyes", amount: 45000, date: "2026-05-06", status: "Pending" },
    { id: "TXN-2024-1237", student: "Ana Garcia", amount: 15000, date: "2026-05-06", status: "Completed" },
    { id: "TXN-2024-1238", student: "Jose Ramos", amount: 30000, date: "2026-05-05", status: "Completed" },
  ];

  const outstandingBalances = [
    { studentId: "2024-001234", name: "Carlos Martinez", program: "Computer Science", balance: 38000, dueDate: "2026-05-15" },
    { studentId: "2024-001235", name: "Sofia Lopez", program: "Business Admin", balance: 45000, dueDate: "2026-05-10" },
    { studentId: "2024-001236", name: "Miguel Torres", program: "Engineering", balance: 22500, dueDate: "2026-05-20" },
    { studentId: "2024-001237", name: "Elena Rivera", program: "Education", balance: 15000, dueDate: "2026-05-08" },
  ];

  return (
    <DashboardLayout userRole="finance" userName={financeName}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance Dashboard</h1>
          <p className="text-muted-foreground">Financial overview and payment management</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₱42.5M</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12.3% vs last year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <CheckCircle className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">90.7%</div>
              <p className="text-xs text-muted-foreground mt-1">Target: 95%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
              <AlertCircle className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">₱4.2M</div>
              <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                <TrendingDown className="w-3 h-3" />
                <span>130 accounts overdue</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">35</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue vs Target */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue vs Target</CardTitle>
              <CardDescription>Revenue collection compared to targets</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₱${(value as number).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Actual Revenue" />
                  <Bar dataKey="target" fill="#94a3b8" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Status Distribution</CardTitle>
              <CardDescription>Current status of all student accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tuition Collection by Program */}
        <Card>
          <CardHeader>
            <CardTitle>Tuition Collection by Program</CardTitle>
            <CardDescription>Revenue collected vs expected per program</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tuitionByProgramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="program" />
                <YAxis />
                <Tooltip formatter={(value) => `₱${(value as number).toLocaleString()}`} />
                <Legend />
                <Bar dataKey="collected" fill="#10b981" name="Collected" />
                <Bar dataKey="total" fill="#e5e7eb" name="Expected Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Transaction ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono">{transaction.id}</td>
                      <td className="py-3 px-4 text-sm">{transaction.student}</td>
                      <td className="py-3 px-4 text-sm font-semibold">₱{transaction.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">{transaction.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Outstanding Balances */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Outstanding Balances - Urgent Follow-up</CardTitle>
              <CardDescription>Students with overdue payments requiring attention</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Program</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Due Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {outstandingBalances.map((student) => (
                    <tr key={student.studentId} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono">{student.studentId}</td>
                      <td className="py-3 px-4 text-sm">{student.name}</td>
                      <td className="py-3 px-4 text-sm">{student.program}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-red-600">₱{student.balance.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">{student.dueDate}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
