// @ts-nocheck
import { useEffect, useState } from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout"
import StatCard from "../../components/ui/StatCard"
import { Badge } from "../../components/ui/badge"
import { Button } from '@/components/ui/button'

import {
  CreditCard,
  DollarSign,
  Wallet,
  TrendingUp
} from 'lucide-react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts'

import { apiRequest } from "../../lib/api"
import type { AppUser } from '@/types'

/* =========================
   TYPES
========================= */
type User = Extract<AppUser, { role: 'finance' }>

/* =========================
   STATIC DATA (ALL PRESERVED)
========================= */
const paymentStats = [
  { month: 'Jan', amount: 450000 },
  { month: 'Feb', amount: 320000 },
  { month: 'Mar', amount: 210000 },
  { month: 'Apr', amount: 680000 },
  { month: 'May', amount: 590000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

const monthlyData = [
  { month: 'Aug', collected: 95000, expected: 100000 },
  { month: 'Sep', collected: 88000, expected: 100000 },
  { month: 'Oct', collected: 92000, expected: 100000 },
  { month: 'Nov', collected: 85000, expected: 100000 },
  { month: 'Dec', collected: 78000, expected: 100000 },
  { month: 'Jan', collected: 82000, expected: 100000 },
]

const paymentStatusData = [
  { name: 'Paid', value: 2, color: '#22c55e' },
  { name: 'Partial', value: 2, color: '#f59e0b' },
  { name: 'Unpaid', value: 1, color: '#ef4444' },
]

const fallbackPayments = [
  { student: "Juan Dela Cruz", method: "Cashier", amount: "PHP 8,500", status: "Posted" },
  { student: "Maria Villanueva", method: "Bank Transfer", amount: "PHP 12,000", status: "For Review" },
]

/* =========================
   COMPONENT
========================= */
export default function FinanceDashboard({ user }: { user?: User }) {
  const [apiData, setApiData] = useState<any>(null)

  useEffect(() => {
    apiRequest("/api/finance")
      .then(setApiData)
      .catch(() => console.log("Using fallback finance data"))
  }, [])

  const stats = apiData?.stats ?? {
    total_collected: 2450000,
    total_balance: 840000
  }

  const recentPayments =
    apiData?.payments?.length
      ? apiData.payments
      : fallbackPayments

  const userName = user?.name || "Finance Officer"

  return (
    <DashboardLayout userRole="finance" userName={userName}>
      <div className="space-y-6 pb-12">

        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Financial System</h1>
            <p className="text-muted-foreground">
              Tracking collections, billing, and reports
            </p>
          </div>
          <Button size="sm">Generate Report</Button>
        </div>

        {/* STAT CARDS */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={`₱${Number(stats.total_collected).toLocaleString()}`}
            icon={<DollarSign />}
            helper="Total collected payments"
          />
          <StatCard
            title="Outstanding"
            value={`₱${Number(stats.total_balance).toLocaleString()}`}
            icon={<Wallet />}
            helper="Remaining balance to collect"
          />
          <StatCard
            title="Payments"
            value={recentPayments.length}
            icon={<CreditCard />}
            helper="Recent payment transactions"
          />
          <StatCard
            title="Health"
            value="Excellent"
            icon={<TrendingUp />}
            helper="Financial system status"
          />
        </div>

        {/* BAR CHART */}
        <div className="bg-card p-4 rounded h-72">
          <ResponsiveContainer>
            <BarChart data={paymentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount">
                {paymentStats.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE + COLLECTION */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-card p-4 rounded h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={paymentStatusData} dataKey="value">
                  {paymentStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card p-4 rounded h-72">
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="collected" fill="#22c55e" />
                <Bar dataKey="expected" fill="#cbd5e1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT PAYMENTS */}
        <div className="bg-card p-4 rounded">
          <h2 className="text-lg font-bold mb-3">Recent Payments</h2>

          {recentPayments.map((p: any, i: number) => (
            <div key={i} className="flex justify-between border-b py-2">
              <div>
                <p className="font-semibold">{p.student || p.name}</p>
                <p className="text-xs text-muted-foreground">{p.method}</p>
              </div>
              <div className="text-right">
                <p>{p.amount}</p>
                <Badge>{p.status}</Badge>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  )
}