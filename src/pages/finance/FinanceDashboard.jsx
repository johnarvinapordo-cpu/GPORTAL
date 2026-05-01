import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import { Badge } from "../../components/ui/badge";
import { CreditCard, DollarSign, FileText, Receipt, TrendingDown, TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { apiRequest } from "../../lib/api";

export default function FinanceDashboard() {
  const [apiData, setApiData] = useState(null);
  const collectionData = [
    { month: "Jan", amount: 4.8 },
    { month: "Feb", amount: 5.2 },
    { month: "Mar", amount: 6.1 },
    { month: "Apr", amount: 5.7 },
    { month: "May", amount: 3.4 },
  ];

  const paymentStatus = [
    { name: "Fully Paid", value: 850, color: "#10b981" },
    { name: "Partial", value: 420, color: "#f59e0b" },
    { name: "Unpaid", value: 130, color: "#ef4444" },
  ];

  const fallbackPayments = [
    { student: "Juan Dela Cruz", method: "Cashier", amount: "PHP 8,500", status: "Posted" },
    { student: "Maria Villanueva", method: "Bank Transfer", amount: "PHP 12,000", status: "For Review" },
    { student: "Kevin Ramos", method: "Online Payment", amount: "PHP 4,750", status: "Posted" },
  ];
  const stats = apiData?.stats ?? {};
  const recentPayments = apiData?.payments?.length
    ? apiData.payments.map((payment) => ({
        student: payment.student_name,
        method: payment.method || "Cashier",
        amount: `PHP ${Number(payment.paid_amount || 0).toLocaleString()}`,
        status: payment.status === "paid" ? "Posted" : "For Review",
      }))
    : fallbackPayments;

  useEffect(() => {
    apiRequest("/api/finance").then(setApiData).catch(() => {});
  }, []);

  return (
    <DashboardLayout userRole="finance" userName="Finance Office">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance Dashboard</h1>
          <p className="text-muted-foreground">Payment tracking, balances, collections, and financial reports</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Collected Tuition" value={`PHP ${Number(stats.total_collected ?? 42500000).toLocaleString()}`} helper="+12% from last term" icon={<DollarSign />} />
          <StatCard title="Pending Balance" value={`PHP ${Number(stats.total_balance ?? 3900000).toLocaleString()}`} helper={`${stats.pending_count ?? 130} unpaid accounts`} icon={<CreditCard />} tone="accent" />
          <StatCard title="Payment Receipts" value={apiData?.payments?.length ?? "1,270"} helper="84 posted today" icon={<Receipt />} tone="default" />
          <StatCard title="Statements Issued" value="392" helper="This billing cycle" icon={<FileText />} tone="default" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Monthly Collections</h2>
              <p className="text-sm text-muted-foreground">Tuition collection in millions of pesos</p>
            </div>
            <div className="p-6 pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={collectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Student Payment Status</h2>
              <p className="text-sm text-muted-foreground">Distribution of accounts by balance status</p>
            </div>
            <div className="p-6 pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={paymentStatus} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                    {paymentStatus.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Recent Payments</h2>
              <p className="text-sm text-muted-foreground">Latest cashier and online transactions</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {recentPayments.map((payment) => (
                <div key={`${payment.student}-${payment.amount}`} className="border-l-4 border-primary py-2 pl-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{payment.student}</h3>
                      <p className="text-sm text-muted-foreground">{payment.method}</p>
                      <p className="text-sm font-medium">{payment.amount}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={payment.status === "For Review" ? "border-accent text-accent" : "border-green-600 text-green-600"}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Collection Summary</h2>
              <p className="text-sm text-muted-foreground">Quick finance office operating numbers</p>
            </div>
            <div className="grid gap-4 p-6 pt-0">
              <Summary label="Accounts Cleared" value="850 students" icon={<Users />} />
              <Summary label="Collection Growth" value="+12%" icon={<TrendingUp />} />
              <Summary label="Outstanding Risk" value="9.3%" icon={<TrendingDown />} />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Summary({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-muted-foreground [&>svg]:h-5 [&>svg]:w-5">{icon}</div>
    </div>
  );
}
