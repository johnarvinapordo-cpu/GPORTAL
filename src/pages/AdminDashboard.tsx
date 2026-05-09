import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import DashboardTable from '../components/dashboard/DashboardTable';
import ChartCard from '../components/dashboard/ChartCard';
import FormCard from '../components/dashboard/FormCard';
import DashboardLayout from "../components/layout/DashboardLayout";

import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  Shield,
  Activity,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddUser, setShowAddUser] = useState(false);

  const onLogout = () => {
  signOut();
  navigate("/");
};

  if (!user) {
    return <div>Loading...</div>;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'logs', label: 'Activity Logs', icon: <Activity className="w-5 h-5" /> },
    { id: 'reports', label: 'System Reports', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', label: 'System Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const systemUsers = [
    { id: '1', name: 'Admin User', email: 'admin@cmdi.edu', role: 'Admin', status: 'Active', lastLogin: '2026-04-30' },
    { id: '2', name: 'Prof. Maria Santos', email: 'teacher@cmdi.edu', role: 'Teacher', status: 'Active', lastLogin: '2026-04-29' },
    { id: '3', name: 'Anna Reyes', email: 'registrar@cmdi.edu', role: 'Registrar', status: 'Active', lastLogin: '2026-04-30' },
    { id: '4', name: 'Carlos Mendoza', email: 'finance@cmdi.edu', role: 'Finance', status: 'Active', lastLogin: '2026-04-28' },
    { id: '5', name: 'Juan Dela Cruz', email: 'student@cmdi.edu', role: 'Student', status: 'Active', lastLogin: '2026-04-30' },
  ];

  const activityLogs = [
    { id: 1, user: 'Admin User', action: 'Created new user account', timestamp: '2026-04-30 10:15 AM', type: 'User Management', icon: <Users className="w-5 h-5 text-blue-600" /> },
    { id: 2, user: 'Prof. Maria Santos', action: 'Updated grades for MTH101', timestamp: '2026-04-30 09:30 AM', type: 'Grades', icon: <Activity className="w-5 h-5 text-blue-600" /> },
    { id: 3, user: 'Anna Reyes', action: 'Approved enrollment for 2024-005', timestamp: '2026-04-30 08:45 AM', type: 'Enrollment', icon: <Activity className="w-5 h-5 text-blue-600" /> },
    { id: 4, user: 'Carlos Mendoza', action: 'Recorded payment PAY-2024-015', timestamp: '2026-04-29 04:20 PM', type: 'Finance', icon: <Activity className="w-5 h-5 text-blue-600" /> },
    { id: 5, user: 'Juan Dela Cruz', action: 'Logged in to system', timestamp: '2026-04-29 02:10 PM', type: 'Authentication', icon: <Activity className="w-5 h-5 text-blue-600" /> },
  ];

  const enrollmentStats = [
    { month: 'Jan', students: 420 },
    { month: 'Feb', students: 435 },
    { month: 'Mar', students: 450 },
    { month: 'Apr', students: 480 },
    { month: 'May', students: 510 },
    { month: 'Jun', students: 495 },
  ];

  const performanceStats = [
    { semester: '1st/2024', avgGPA: 1.95 },
    { semester: '2nd/2024', avgGPA: 1.85 },
    { semester: '1st/2025', avgGPA: 1.78 },
    { semester: 'Current', avgGPA: 1.72 },
  ];

  const financialStats = [
    { month: 'Jan', revenue: 450000, expenses: 320000 },
    { month: 'Feb', revenue: 520000, expenses: 340000 },
    { month: 'Mar', revenue: 480000, expenses: 330000 },
    { month: 'Apr', revenue: 580000, expenses: 360000 },
    { month: 'May', revenue: 620000, expenses: 380000 },
    { month: 'Jun', revenue: 550000, expenses: 350000 },
  ];

  const handleDeleteUser = (userId: string) => {
    console.log('Delete user:', userId);
  };

  const handleEditUser = (userId: string) => {
    console.log('Edit user:', userId);
  };

return (
  <DashboardLayout user={user} onLogout={onLogout}>
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
                title="Total Users"
                value={systemUsers.length}
                icon={<Users className="w-6 h-6" />}
                iconBgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
              <StatCard
                title="Active Students"
                value="480"
                icon={<Users className="w-6 h-6" />}
                iconBgColor="bg-green-50"
                iconColor="text-green-600"
              />
              <StatCard
                title="System Health"
                value="Excellent"
                icon={<Shield className="w-6 h-6" />}
                iconBgColor="bg-green-50"
                iconColor="text-green-600"
              />
              <StatCard
                title="Active Sessions"
                value="42"
                icon={<Activity className="w-6 h-6" />}
                iconBgColor="bg-purple-50"
                iconColor="text-purple-600"
              />
            </div>

            {/* Recent Activity */}
            <ActivityFeed activities={activityLogs.slice(0, 5)} />

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Enrollment Trend">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={enrollmentStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Academic Performance">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[1.0, 2.5]} reversed />
                    <Tooltip />
                    <Bar dataKey="avgGPA" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <FormCard 
              title="User Management"
              subtitle="Manage system users and permissions"
            >
              <div className="mb-4">
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>

              {showAddUser && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Create New User</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <input type="email" placeholder="Email Address" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Role</option>
                      <option>Admin</option>
                      <option>Teacher</option>
                      <option>Registrar</option>
                      <option>Finance</option>
                      <option>Student</option>
                    </select>
                    <input type="password" placeholder="Password" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button className="md:col-span-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Create User
                    </button>
                  </div>
                </div>
              )}
            </FormCard>

            <DashboardTable
              title="System Users"
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                {
                  key: 'role',
                  label: 'Role',
                  render: (value) => (
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        value === 'Admin'
                          ? 'bg-purple-100 text-purple-700'
                          : value === 'Teacher'
                          ? 'bg-blue-100 text-blue-700'
                          : value === 'Registrar'
                          ? 'bg-green-100 text-green-700'
                          : value === 'Finance'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {value}
                    </span>
                  ),
                },
                { key: 'status', label: 'Status', render: (value) => <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">{value}</span> },
                { key: 'lastLogin', label: 'Last Login' },
              ]}
              data={systemUsers}
              actions={(row) => (
                <div className="flex gap-2">
                  <button onClick={() => handleEditUser(row.id)} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteUser(row.id)} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <ChartCard title="Enrollment Analytics">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Financial Analytics">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Academic Performance Trend">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[1.0, 2.5]} reversed />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgGPA" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {activeTab === 'logs' && (
          <DashboardTable
            title="Activity Logs"
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'user', label: 'User' },
              { key: 'action', label: 'Action' },
              { key: 'type', label: 'Type', render: (value) => <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">{value}</span> },
              { key: 'timestamp', label: 'Timestamp' },
            ]}
            data={activityLogs}
          />
        )}

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
  <h3 className="text-lg font-semibold mb-4">System Reports</h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-left">
      <FileText className="w-8 h-8 text-orange-600 mb-2" />
      <p className="text-sm font-medium">Enrollment Report</p>
    </button>

    <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-left">
      <FileText className="w-8 h-8 text-red-600 mb-2" />
      <p className="text-sm font-medium">Audit Logs</p>
    </button>

    <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-left">
      <FileText className="w-8 h-8 text-indigo-600 mb-2" />
      <p className="text-sm font-medium">System Health</p>
    </button>

  </div>
</div>

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <FormCard title="System Settings">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
                  <input type="text" defaultValue="CARD-MRI Development Institute Inc." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                  <input type="text" defaultValue="2025-2026" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>1st Semester</option>
                    <option>2nd Semester</option>
                    <option>Summer</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Enable Email Notifications</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
                  </label>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </FormCard>

            <FormCard title="Backup & Maintenance">
              <div className="space-y-4">
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors">
                  <Shield className="w-5 h-5" />
                  Create System Backup
                </button>
                <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2 transition-colors">
                  <Activity className="w-5 h-5" />
                  Run System Diagnostics
                </button>
              </div>
            </FormCard>
          </div>
        )}
      </div>
      </div>
  </DashboardLayout>
  );
}