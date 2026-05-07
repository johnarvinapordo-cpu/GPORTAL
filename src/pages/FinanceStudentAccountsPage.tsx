import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Search, Filter, Download, AlertCircle, CheckCircle, Clock, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState } from "react";

export default function FinanceStudentAccountsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const studentAccounts = [
    {
      studentId: "2024-001234",
      name: "Juan Dela Cruz",
      program: "Computer Science",
      yearLevel: "3rd Year",
      totalFees: 45000,
      paid: 45000,
      balance: 0,
      status: "Fully Paid",
      lastPayment: "2026-05-01"
    },
    {
      studentId: "2024-001235",
      name: "Maria Santos",
      program: "Business Admin",
      yearLevel: "2nd Year",
      totalFees: 42000,
      paid: 20000,
      balance: 22000,
      status: "Partially Paid",
      lastPayment: "2026-04-15"
    },
    {
      studentId: "2024-001236",
      name: "Pedro Reyes",
      program: "Engineering",
      yearLevel: "4th Year",
      totalFees: 48000,
      paid: 10000,
      balance: 38000,
      status: "Overdue",
      lastPayment: "2026-03-10"
    },
    {
      studentId: "2024-001237",
      name: "Ana Garcia",
      program: "Education",
      yearLevel: "1st Year",
      totalFees: 38000,
      paid: 38000,
      balance: 0,
      status: "Fully Paid",
      lastPayment: "2026-04-28"
    },
    {
      studentId: "2024-001238",
      name: "Jose Ramos",
      program: "Computer Science",
      yearLevel: "2nd Year",
      totalFees: 45000,
      paid: 30000,
      balance: 15000,
      status: "Partially Paid",
      lastPayment: "2026-04-20"
    },
    {
      studentId: "2024-001239",
      name: "Carlos Martinez",
      program: "Business Admin",
      yearLevel: "3rd Year",
      totalFees: 42000,
      paid: 0,
      balance: 42000,
      status: "Overdue",
      lastPayment: "N/A"
    },
    {
      studentId: "2024-001240",
      name: "Sofia Lopez",
      program: "Engineering",
      yearLevel: "1st Year",
      totalFees: 48000,
      paid: 48000,
      balance: 0,
      status: "Fully Paid",
      lastPayment: "2026-05-05"
    },
    {
      studentId: "2024-001241",
      name: "Miguel Torres",
      program: "Education",
      yearLevel: "4th Year",
      totalFees: 38000,
      paid: 15000,
      balance: 23000,
      status: "Partially Paid",
      lastPayment: "2026-04-10"
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Fully Paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Partially Paid":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Fully Paid":
        return "bg-green-100 text-green-800";
      case "Partially Paid":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredAccounts = studentAccounts.filter(account => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || account.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalStudents = studentAccounts.length;
  const fullyPaid = studentAccounts.filter(a => a.status === "Fully Paid").length;
  const partiallyPaid = studentAccounts.filter(a => a.status === "Partially Paid").length;
  const overdue = studentAccounts.filter(a => a.status === "Overdue").length;

  return (
    <DashboardLayout userRole="finance" userName="Finance Officer">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Accounts</h1>
          <p className="text-muted-foreground">Manage and monitor student financial accounts</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">Active student accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fully Paid</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{fullyPaid}</div>
              <p className="text-xs text-muted-foreground mt-1">{((fullyPaid / totalStudents) * 100).toFixed(0)}% of accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Partially Paid</CardTitle>
              <Clock className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{partiallyPaid}</div>
              <p className="text-xs text-muted-foreground mt-1">{((partiallyPaid / totalStudents) * 100).toFixed(0)}% of accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{overdue}</div>
              <p className="text-xs text-muted-foreground mt-1">{((overdue / totalStudents) * 100).toFixed(0)}% of accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>All Student Accounts</CardTitle>
                <CardDescription>Search and filter student financial records</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Fully Paid">Fully Paid</SelectItem>
                    <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Program</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Year Level</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Fees</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Paid</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Payment</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.studentId} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono">{account.studentId}</td>
                      <td className="py-3 px-4 text-sm font-semibold">{account.name}</td>
                      <td className="py-3 px-4 text-sm">{account.program}</td>
                      <td className="py-3 px-4 text-sm">{account.yearLevel}</td>
                      <td className="py-3 px-4 text-sm">₱{account.totalFees.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-green-600 font-semibold">₱{account.paid.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-red-600 font-semibold">₱{account.balance.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(account.status)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                            {account.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{account.lastPayment}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAccounts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No accounts found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
