import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import DashboardTable from '../components/dashboard/DashboardTable';
import ChartCard from '../components/dashboard/ChartCard';
import FormCard from '../components/dashboard/FormCard';
import {
  LayoutDashboard,
  DollarSign,
  Users,
  FileText,
  BarChart3,
  Settings,
  Download,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function FinanceDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRecordPayment, setShowRecordPayment] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'payments', label: 'Payments', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'students', label: 'Student Accounts', icon: <Users className="w-5 h-5" /> },
    { id: 'receipts', label: 'Receipts', icon: <FileText className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const paymentRecords = [
    {
      id: 'PAY-2024-001',
      studentId: '2024-001',
      studentName: 'Juan Dela Cruz',
      amount: 15000,
      description: 'Tuition Fee - 1st Semester',
      date: '2026-04-15',
      status: 'Completed',
      method: 'Cash',
    },
    {
      id: 'PAY-2024-002',
      studentId: '2024-002',
      studentName: 'Maria Santos',
      amount: 12000,
      description: 'Partial Payment - Tuition',
      date: '2026-04-20',
      status: 'Completed',
      method: 'Bank Transfer',
    },
    {
      id: 'PAY-2024-003',
      studentId: '2024-003',
      studentName: 'Pedro Garcia',
      amount: 2500,
      description: 'Laboratory Fee',
      date: '2026-04-22',
      status: 'Completed',
      method: 'Cash',
    },
    {
      id: 'PAY-2024-004',
      studentId: '2024-004',
      studentName: 'Ana Reyes',
      amount: 18000,
      description: 'Full Payment - 1st Semester',
      date: '2026-04-25',
      status: 'Completed',
      method: 'Online Payment',
    },
  ];

  const studentAccounts = [
    { id: '2024-001', name: 'Juan Dela Cruz', totalFee: 20000, paid: 15000, balance: 5000, status: 'Partial' },
    { id: '2024-002', name: 'Maria Santos', totalFee: 22000, paid: 22000, balance: 0, status: 'Paid' },
    { id: '2024-003', name: 'Pedro Garcia', totalFee: 20000, paid: 17500, balance: 2500, status: 'Partial' },
    { id: '2024-004', name: 'Ana Reyes', totalFee: 18000, paid: 18000, balance: 0, status: 'Paid' },
    { id: '2024-005', name: 'Carlos Lopez', totalFee: 20000, paid: 8000, balance: 12000, status: 'Unpaid' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 450000 },
    { month: 'Feb', revenue: 520000 },
    { month: 'Mar', revenue: 480000 },
    { month: 'Apr', revenue: 580000 },
    { month: 'May', revenue: 620000 },
    { month: 'Jun', revenue: 550000 },
  ];

  const paymentMethodData = [
    { name: 'Cash', value: 45, color: '#3b82f6' },
    { name: 'Bank Transfer', value: 30, color: '#10b981' },
    { name: 'Online Payment', value: 25, color: '#8b5cf6' },
  ];

  const totalCollected = paymentRecords.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = studentAccounts.reduce((sum, s) => sum + s.balance, 0);
  const totalStudents = studentAccounts.length;
  const paidStudents = studentAccounts.filter((s) => s.status === 'Paid').length;

  const handleGenerateReceipt = (paymentId: string) => {
    console.log('Generating receipt for:', paymentId);
  };

  return (
    <div>
      {/* Horizontal Tab Navigation */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="Total Collected"
                value={`₱${totalCollected.toLocaleString()}`}
                subtitle="This Month"
                icon={<DollarSign className="w-6 h-6" />}
                iconBgColor="bg-green-50"
                iconColor="text-green-600"
              />
              <StatCard
                title="Pending Balance"
                value={`₱${totalPending.toLocaleString()}`}
                subtitle="Outstanding"
                icon={<Clock className="w-6 h-6" />}
                iconBgColor="bg-orange-50"
                iconColor="text-orange-600"
              />
              <StatCard
                title="Paid Students"
                value={`${paidStudents}/${totalStudents}`}
                subtitle={`${((paidStudents / totalStudents) * 100).toFixed(0)}% Complete`}
                icon={<CheckCircle className="w-6 h-6" />}
                iconBgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
              <StatCard
                title="Transactions"
                value={paymentRecords.length}
                subtitle="Today"
                icon={<FileText className="w-6 h-6" />}
                iconBgColor="bg-purple-50"
                iconColor="text-purple-600"
              />
            </div>

            {/* Revenue Chart */}
            <ChartCard title="Revenue Trend">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Payment Methods & Recent Payments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Payment Methods">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
                </div>
                <div className="p-6 space-y-4">
                  {paymentRecords.slice(0, 4).map((payment, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{payment.studentName}</p>
                        <p className="text-sm text-gray-600 mt-1">{payment.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-gray-900">₱{payment.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">{payment.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            <FormCard title="Payment Records" subtitle="Track all student payments and transactions">
              <button
                onClick={() => setShowRecordPayment(!showRecordPayment)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Record Payment
              </button>

              {showRecordPayment && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">New Payment Record</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Student ID" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <input type="number" placeholder="Amount" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <input type="text" placeholder="Description" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Cash</option>
                      <option>Bank Transfer</option>
                      <option>Online Payment</option>
                    </select>
                    <button className="md:col-span-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Save Payment
                    </button>
                  </div>
                </div>
              )}
            </FormCard>

            <DashboardTable
              title="Payment Records"
              columns={[
                { key: 'id', label: 'Payment ID' },
                {
                  key: 'studentName',
                  label: 'Student',
                  render: (value, row) => (
                    <div>
                      <p className="font-medium text-gray-900">{value}</p>
                      <p className="text-xs text-gray-500">{row.studentId}</p>
                    </div>
                  ),
                },
                { key: 'description', label: 'Description' },
                { key: 'amount', label: 'Amount', render: (value) => `₱${value.toLocaleString()}` },
                { key: 'method', label: 'Method' },
                { key: 'date', label: 'Date' },
              ]}
              data={paymentRecords}
              actions={(row) => (
                <button onClick={() => handleGenerateReceipt(row.id)} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                  <Download className="w-4 h-4" />
                  Receipt
                </button>
              )}
            />
          </div>
        )}

        {activeTab === 'students' && (
          <DashboardTable
            title="Student Account Summary"
            columns={[
              { key: 'id', label: 'Student ID' },
              { key: 'name', label: 'Name' },
              { key: 'totalFee', label: 'Total Fee', render: (value) => `₱${value.toLocaleString()}` },
              { key: 'paid', label: 'Paid', render: (value) => <span className="text-green-600 font-medium">₱{value.toLocaleString()}</span> },
              { key: 'balance', label: 'Balance', render: (value) => <span className="text-red-600 font-medium">₱{value.toLocaleString()}</span> },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      value === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : value === 'Partial'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
            ]}
            data={studentAccounts}
            actions={() => <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>}
          />
        )}

        {activeTab === 'receipts' && (
          <FormCard title="Receipt Management">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
                <Download className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Generate Receipt</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center">
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">View All Receipts</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
                <Download className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Export to PDF</p>
              </button>
            </div>
          </FormCard>
        )}

        {activeTab === 'reports' && (
          <FormCard title="Financial Reports">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Payment Summary</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center">
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Outstanding Balances</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Revenue Report</p>
              </button>
            </div>
          </FormCard>
        )}

        {activeTab === 'settings' && (
          <FormCard title="Finance Settings" subtitle="Configure payment deadlines and fees">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Deadline</label>
                <input type="date" defaultValue="2026-06-30" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Late Payment Fee (%)</label>
                <input type="number" defaultValue="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Settings
              </button>
            </div>
          </FormCard>
        )}
      </div>
    </div>
  );
}