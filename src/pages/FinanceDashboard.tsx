import DashboardLayout from "../components/layout/DashboardLayout";

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  FileText,
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FinanceDashboard() {
  const financeName = "Finance Officer";

  // ================= REVENUE =================
  const monthlyRevenueData = [
    { month: "Sep", revenue: 5200000, target: 5000000 },
    { month: "Oct", revenue: 5450000, target: 5300000 },
    { month: "Nov", revenue: 5100000, target: 5200000 },
    { month: "Dec", revenue: 4800000, target: 5000000 },
    { month: "Jan", revenue: 6200000, target: 6000000 },
    { month: "Feb", revenue: 6100000, target: 6000000 },
    { month: "Mar", revenue: 6400000, target: 6200000 },
  ];

  // ================= PAYMENT STATUS =================
  const paymentStatusData = [
    { name: "Fully Paid", value: 850, color: "#10b981" },
    { name: "Partially Paid", value: 420, color: "#f59e0b" },
    { name: "Overdue", value: 95, color: "#ef4444" },
    { name: "Pending", value: 35, color: "#6b7280" },
  ];

  // ================= PROGRAM DATA =================
  const tuitionByProgramData = [
    {
      program: "Computer Science",
      collected: 12500000,
      total: 14000000,
    },
    {
      program: "Business Admin",
      collected: 10200000,
      total: 11500000,
    },
    {
      program: "Engineering",
      collected: 8900000,
      total: 10200000,
    },
    {
      program: "Education",
      collected: 7100000,
      total: 8000000,
    },
  ];

  // ================= RECENT TRANSACTIONS =================
  const recentTransactions = [
    {
      id: "TXN-2026-1234",
      student: "Juan Dela Cruz",
      amount: 45000,
      date: "2026-05-07",
      status: "Completed",
    },
    {
      id: "TXN-2026-1235",
      student: "Maria Santos",
      amount: 22500,
      date: "2026-05-07",
      status: "Completed",
    },
    {
      id: "TXN-2026-1236",
      student: "Mark Reyes",
      amount: 18000,
      date: "2026-05-06",
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout
      userRole="finance"
      userName={financeName}
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Finance Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor tuition payments, revenue, and student accounts
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* TOTAL COLLECTION */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Collection
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  ₱28.4M
                </h2>

                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +12.5%
                </div>
              </div>

              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="text-green-600 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* OUTSTANDING */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Outstanding Balance
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  ₱4.2M
                </h2>

                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <TrendingDown className="w-4 h-4" />
                  95 overdue
                </div>
              </div>

              <div className="bg-red-100 p-3 rounded-xl">
                <AlertCircle className="text-red-600 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* PAID STUDENTS */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Fully Paid Students
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  850
                </h2>

                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Good standing
                </div>
              </div>

              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="text-blue-600 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* PENDING */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Pending Transactions
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  35
                </h2>

                <div className="flex items-center gap-1 mt-2 text-yellow-600 text-sm">
                  <Clock className="w-4 h-4" />
                  Needs review
                </div>
              </div>

              <div className="bg-yellow-100 p-3 rounded-xl">
                <FileText className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* REVENUE CHART */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-lg font-semibold mb-4">
              Monthly Revenue
            </h2>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10b981"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PAYMENT STATUS */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-lg font-semibold mb-4">
              Payment Status
            </h2>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* PROGRAM COLLECTION */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-lg font-semibold mb-4">
            Tuition Collection by Program
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tuitionByProgramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="program" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="collected" fill="#2563eb" />
                <Bar dataKey="total" fill="#93c5fd" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">
              Recent Transactions
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Student</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {txn.id}
                  </td>

                  <td className="p-4">
                    {txn.student}
                  </td>

                  <td className="p-4">
                    ₱{txn.amount.toLocaleString()}
                  </td>

                  <td className="p-4 text-gray-500">
                    {txn.date}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        txn.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}