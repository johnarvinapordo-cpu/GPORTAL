import { useState } from 'react';
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  user: { role: string; name: string; id: string };
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddUser, setShowAddUser] = useState(false);

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
    { id: 1, user: 'Admin User', action: 'Created new user account', timestamp: '2026-04-30 10:15 AM', type: 'User Management' },
    { id: 2, user: 'Prof. Maria Santos', action: 'Updated grades for MTH101', timestamp: '2026-04-30 09:30 AM', type: 'Grades' },
    { id: 3, user: 'Anna Reyes', action: 'Approved enrollment for 2024-005', timestamp: '2026-04-30 08:45 AM', type: 'Enrollment' },
    { id: 4, user: 'Carlos Mendoza', action: 'Recorded payment PAY-2024-015', timestamp: '2026-04-29 04:20 PM', type: 'Finance' },
    { id: 5, user: 'Juan Dela Cruz', action: 'Logged in to system', timestamp: '2026-04-29 02:10 PM', type: 'Authentication' },
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
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl mt-2">{systemUsers.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Students</p>
                  <p className="text-3xl mt-2">480</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className="text-lg mt-2">Excellent</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Sessions</p>
                  <p className="text-3xl mt-2">42</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg">Recent Activity</h3>
            </div>
            <div className="p-6 space-y-4">
              {activityLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {log.user} • {log.timestamp}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">{log.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg mb-4">Enrollment Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={enrollmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg mb-4">Academic Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[1.0, 2.5]} reversed />
                  <Tooltip />
                  <Bar dataKey="avgGPA" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg">User Management</h3>
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>
            </div>

            {showAddUser && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h4 className="text-sm mb-4">Create New User</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Select Role</option>
                    <option>Admin</option>
                    <option>Teacher</option>
                    <option>Registrar</option>
                    <option>Finance</option>
                    <option>Student</option>
                  </select>
                  <input
                    type="password"
                    placeholder="Password"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="md:col-span-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Create User
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">ID</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Email</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Role</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {systemUsers.map((sysUser) => (
                    <tr key={sysUser.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{sysUser.id}</td>
                      <td className="px-6 py-4 text-sm">{sysUser.name}</td>
                      <td className="px-6 py-4 text-sm">{sysUser.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            sysUser.role === 'Admin'
                              ? 'bg-purple-100 text-purple-700'
                              : sysUser.role === 'Teacher'
                              ? 'bg-blue-100 text-blue-700'
                              : sysUser.role === 'Registrar'
                              ? 'bg-green-100 text-green-700'
                              : sysUser.role === 'Finance'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {sysUser.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          {sysUser.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{sysUser.lastLogin}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(sysUser.id)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(sysUser.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Enrollment Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-4">Enrollment Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-4">Financial Analytics</h3>
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
          </div>

          {/* Academic Performance */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-4">Academic Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis domain={[1.0, 2.5]} reversed />
                <Tooltip />
                <Line type="monotone" dataKey="avgGPA" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg">Activity Logs</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">ID</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">User</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Action</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Type</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{log.id}</td>
                      <td className="px-6 py-4 text-sm">{log.user}</td>
                      <td className="px-6 py-4 text-sm">{log.action}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          {log.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-4">System Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm">User Activity Report</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <FileText className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm">Enrollment Report</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <FileText className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-sm">Financial Report</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <FileText className="w-8 h-8 text-orange-600 mb-2" />
                <p className="text-sm">Academic Report</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
                <FileText className="w-8 h-8 text-red-600 mb-2" />
                <p className="text-sm">System Health Report</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                <FileText className="w-8 h-8 text-indigo-600 mb-2" />
                <p className="text-sm">Audit Log Report</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-6">System Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Institution Name</label>
                <input
                  type="text"
                  defaultValue="CARD-MRI Development Institute Inc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Academic Year</label>
                <input
                  type="text"
                  defaultValue="2025-2026"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Current Semester</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>1st Semester</option>
                  <option>2nd Semester</option>
                  <option>Summer</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600">Enable Email Notifications</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600">Enable Two-Factor Authentication</span>
                </label>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Settings
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-6">Backup & Maintenance</h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Create System Backup
              </button>
              <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2">
                <Activity className="w-5 h-5" />
                Run System Diagnostics
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
