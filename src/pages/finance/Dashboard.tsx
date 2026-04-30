import { DollarSign, CreditCard, TrendingUp, Receipt } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import type { AppUser } from '@/types'

type User = Extract<AppUser, { role: 'finance' }>

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

const payments = [
  { id: 1, student: 'Juan Dela Cruz', amount: 25000, paid: 25000, status: 'Paid', date: '2024-01-10' },
  { id: 2, student: 'Maria Santos', amount: 30000, paid: 15000, status: 'Partial', date: '2024-01-12' },
  { id: 3, student: 'Pedro Reyes', amount: 28000, paid: 0, status: 'Unpaid', date: '2024-01-15' },
  { id: 4, student: 'Ana Mae Torres', amount: 32000, paid: 32000, status: 'Paid', date: '2024-01-08' },
  { id: 5, student: 'Mark Johnson', amount: 27500, paid: 10000, status: 'Partial', date: '2024-01-14' },
]

const stats = {
  totalExpected: 143000,
  totalCollected: 82000,
  totalBalance: 61000,
  pendingPayments: 3,
}

export default function FinanceDashboard({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, Finance Officer {user.name.split(' ').pop()}!</h1>
        <p className="text-muted-foreground">Manage payments and financial reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Expected</p>
              <p className="text-2xl font-bold">₱{stats.totalExpected.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Collected</p>
              <p className="text-2xl font-bold text-green-600">₱{stats.totalCollected.toLocaleString()}</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Outstanding Balance</p>
              <p className="text-2xl font-bold text-red-600">₱{stats.totalBalance.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-2xl font-bold">{stats.pendingPayments}</p>
            </div>
            <Receipt className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Student</th>
                  <th className="text-right p-2">Amount</th>
                  <th className="text-right p-2">Paid</th>
                  <th className="text-center p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="p-2">{payment.student}</td>
                    <td className="text-right p-2">₱{payment.amount.toLocaleString()}</td>
                    <td className="text-right p-2">₱{payment.paid.toLocaleString()}</td>
                    <td className="text-center p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        payment.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left">
              <Receipt className="w-6 h-6 mb-2" />
              <p className="font-medium">View Receipts</p>
              <p className="text-xs text-muted-foreground">Generate payment receipts</p>
            </button>
            <button className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left">
              <CreditCard className="w-6 h-6 mb-2" />
              <p className="font-medium">Record Payment</p>
              <p className="text-xs text-muted-foreground">Add new payment</p>
            </button>
            <button className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left">
              <TrendingUp className="w-6 h-6 mb-2" />
              <p className="font-medium">Financial Reports</p>
              <p className="text-xs text-muted-foreground">Generate reports</p>
            </button>
            <button className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left">
              <DollarSign className="w-6 h-6 mb-2" />
              <p className="font-medium">Send Reminders</p>
              <p className="text-xs text-muted-foreground">Payment reminders</p>
            </button>
</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Collection Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="collected" fill="#22c55e" name="Collected" />
              <Bar dataKey="expected" fill="#cbd5e1" name="Expected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
