import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { FileText, Download, TrendingUp, DollarSign, Calendar, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState } from "react";

export default function FinanceReportsPage() {
  const [reportPeriod, setReportPeriod] = useState("current-semester");

  const monthlyCollectionData = [
    { month: "Sep 2025", collected: 5200000, target: 5000000 },
    { month: "Oct 2025", collected: 5450000, target: 5300000 },
    { month: "Nov 2025", collected: 5100000, target: 5200000 },
    { month: "Dec 2025", collected: 4800000, target: 5000000 },
    { month: "Jan 2026", collected: 6200000, target: 6000000 },
    { month: "Feb 2026", collected: 6100000, target: 6000000 },
    { month: "Mar 2026", collected: 6400000, target: 6200000 },
    { month: "Apr 2026", collected: 5900000, target: 6000000 },
  ];

  const programRevenueData = [
    { program: "Computer Science", revenue: 12500000, students: 450 },
    { program: "Business Admin", revenue: 10200000, students: 380 },
    { program: "Engineering", revenue: 9800000, students: 320 },
    { program: "Education", revenue: 7100000, students: 250 },
  ];

  const paymentStatusData = [
    { name: "Fully Paid", value: 850, amount: 38250000, color: "#10b981" },
    { name: "Partially Paid", value: 420, amount: 8820000, color: "#f59e0b" },
    { name: "Overdue", value: 95, amount: 2850000, color: "#ef4444" },
    { name: "Unpaid", value: 35, amount: 1575000, color: "#6b7280" },
  ];

  const quarterlyTrends = [
    { quarter: "Q1 2025", revenue: 15600000, expenses: 12300000 },
    { quarter: "Q2 2025", revenue: 18200000, expenses: 13800000 },
    { quarter: "Q3 2025", revenue: 19100000, expenses: 14200000 },
    { quarter: "Q4 2025", revenue: 16800000, expenses: 13500000 },
  ];

  const reportTemplates = [
    {
      title: "Monthly Collection Report",
      description: "Detailed breakdown of monthly tuition collections",
      icon: <Calendar className="w-5 h-5" />,
      type: "monthly"
    },
    {
      title: "Outstanding Balance Report",
      description: "List of students with pending payments",
      icon: <DollarSign className="w-5 h-5" />,
      type: "outstanding"
    },
    {
      title: "Revenue by Program Report",
      description: "Income analysis per academic program",
      icon: <BarChart3 className="w-5 h-5" />,
      type: "program"
    },
    {
      title: "Quarterly Financial Summary",
      description: "Comprehensive quarterly financial overview",
      icon: <TrendingUp className="w-5 h-5" />,
      type: "quarterly"
    },
    {
      title: "Payment Method Analysis",
      description: "Distribution of payment methods used",
      icon: <FileText className="w-5 h-5" />,
      type: "payment-method"
    },
    {
      title: "Student Account Status",
      description: "Complete status of all student accounts",
      icon: <FileText className="w-5 h-5" />,
      type: "account-status"
    },
  ];

  return (
    <DashboardLayout userRole="finance" userName="Finance Officer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
            <p className="text-muted-foreground">Generate and view financial analytics reports</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-semester">Current Semester</SelectItem>
                <SelectItem value="last-semester">Last Semester</SelectItem>
                <SelectItem value="current-year">Current Year</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₱49.7M</div>
              <p className="text-xs text-muted-foreground mt-1">Academic Year 2025-2026</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">92.3%</div>
              <p className="text-xs text-muted-foreground mt-1">Target: 95%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">₱4.2M</div>
              <p className="text-xs text-muted-foreground mt-1">7.7% of total fees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Monthly</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₱5.8M</div>
              <p className="text-xs text-muted-foreground mt-1">Per month collection</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Collection Trends */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Monthly Collection vs Target</CardTitle>
                <CardDescription>Actual collections compared to monthly targets</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyCollectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `₱${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => `₱${(value as number).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="collected" fill="#3b82f6" name="Collected" />
                  <Bar dataKey="target" fill="#94a3b8" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Status Distribution */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Status Distribution</CardTitle>
                <CardDescription>Breakdown by number of students</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
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

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Program */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue by Academic Program</CardTitle>
                <CardDescription>Total revenue generated per program</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programRevenueData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `₱${(value / 1000000).toFixed(1)}M`} />
                  <YAxis dataKey="program" type="category" width={120} />
                  <Tooltip formatter={(value) => `₱${(value as number).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quarterly Financial Trends */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Quarterly Financial Trends</CardTitle>
                <CardDescription>Revenue and expenses over time</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={quarterlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis tickFormatter={(value) => `₱${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => `₱${(value as number).toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <CardDescription>Select a report template to generate and download</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTemplates.map((report) => (
                <Card key={report.type} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {report.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Status Summary</CardTitle>
            <CardDescription>Detailed breakdown of payment statuses with amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Number of Students</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Percentage</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentStatusData.map((status) => (
                    <tr key={status.name} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                          style={{ backgroundColor: `${status.color}20`, color: status.color }}>
                          {status.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold">{status.value}</td>
                      <td className="py-3 px-4 text-sm">
                        {((status.value / paymentStatusData.reduce((sum, s) => sum + s.value, 0)) * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold">₱{status.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="border-b bg-muted/50 font-semibold">
                    <td className="py-3 px-4">Total</td>
                    <td className="py-3 px-4 text-sm">{paymentStatusData.reduce((sum, s) => sum + s.value, 0)}</td>
                    <td className="py-3 px-4 text-sm">100%</td>
                    <td className="py-3 px-4 text-sm">₱{paymentStatusData.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
