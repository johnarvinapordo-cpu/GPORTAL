import { useState } from 'react';
import DashboardLayout from "../components/layout/DashboardLayout";
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

interface FinanceDashboardProps {
  user: { role: string; name: string; id: string };
  onLogout: () => void;
}

export default function FinanceDashboard({ user, onLogout }: FinanceDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRecordPayment, setShowRecordPayment] = useState(false);

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
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      menuItems={menuItems}
    >
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Collected</p>
                  <p className="text-2xl mt-2">₱{totalCollected.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    This Month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Balance</p>
                  <p className="text-2xl mt-2">₱{totalPending.toLocaleString()}</p>
                  <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Outstanding
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Paid Students</p>
                  <p className="text-2xl mt-2">
                    {paidStudents}/{totalStudents}
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    {((paidStudents / totalStudents) * 100).toFixed(0)}% Complete
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Transactions</p>
                  <p className="text-2xl mt-2">{paymentRecords.length}</p>
                  <p className="text-xs text-purple-600 mt-2">Today</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Methods & Recent Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg mb-4">Payment Methods</h3>
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
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg">Recent Payments</h3>
              </div>
              <div className="p-6 space-y-4">
                {paymentRecords.slice(0, 4).map((payment, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{payment.studentName}</p>
                      <p className="text-xs text-gray-500 mt-1">{payment.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">₱{payment.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{payment.date}</p>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg">Payment Records</h3>
                <button
                  onClick={() => setShowRecordPayment(!showRecordPayment)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Record Payment
                </button>
              </div>
            </div>

            {showRecordPayment && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h4 className="text-sm mb-4">New Payment Record</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Student ID"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>Online Payment</option>
                  </select>
                  <button className="md:col-span-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Save Payment
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Payment ID</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Student</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Description</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Amount</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Method</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Date</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paymentRecords.map((payment, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{payment.id}</td>
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <p>{payment.studentName}</p>
                          <p className="text-xs text-gray-500">{payment.studentId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{payment.description}</td>
                      <td className="px-6 py-4 text-sm">₱{payment.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">{payment.method}</td>
                      <td className="px-6 py-4 text-sm">{payment.date}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleGenerateReceipt(payment.id)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg">Student Account Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Student ID</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Total Fee</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Paid</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Balance</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentAccounts.map((student, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{student.id}</td>
                      <td className="px-6 py-4 text-sm">{student.name}</td>
                      <td className="px-6 py-4 text-sm">₱{student.totalFee.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-green-600">₱{student.paid.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-red-600">₱{student.balance.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            student.status === 'Paid'
                              ? 'bg-green-100 text-green-700'
                              : student.status === 'Partial'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'receipts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg">Receipt Management</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <Download className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
                  <p className="text-sm">Generate Receipt</p>
                </button>
                <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <FileText className="w-8 h-8 text-green-600 mb-2 mx-auto" />
                  <p className="text-sm">View All Receipts</p>
                </button>
                <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                  <Download className="w-8 h-8 text-purple-600 mb-2 mx-auto" />
                  <p className="text-sm">Export to PDF</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-4">Financial Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm">Payment Summary</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <FileText className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm">Outstanding Balances</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <FileText className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-sm">Revenue Report</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg mb-6">Finance Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Payment Deadline</label>
              <input
                type="date"
                defaultValue="2026-06-30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Late Payment Fee (%)</label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
