import { useState } from 'react';
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RegistrarDashboardProps {
  user: { role: string; name: string; id: string };
  onLogout: () => void;
}

export default function RegistrarDashboard({ user, onLogout }: RegistrarDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddSubject, setShowAddSubject] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'enrollment', label: 'Enrollment', icon: <Users className="w-5 h-5" /> },
    { id: 'subjects', label: 'Subjects', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <FileText className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const enrollmentRequests = [
    {
      id: '2024-001',
      name: 'Juan Dela Cruz',
      program: 'BS Computer Science',
      year: '2nd Year',
      semester: '1st Semester 2025-2026',
      status: 'Pending',
      date: '2026-04-25',
      units: 18,
    },
    {
      id: '2024-002',
      name: 'Maria Santos',
      program: 'BS Accountancy',
      year: '3rd Year',
      semester: '1st Semester 2025-2026',
      status: 'Pending',
      date: '2026-04-26',
      units: 21,
    },
    {
      id: '2024-003',
      name: 'Pedro Garcia',
      program: 'BS Business Admin',
      year: '1st Year',
      semester: '1st Semester 2025-2026',
      status: 'Approved',
      date: '2026-04-24',
      units: 18,
    },
    {
      id: '2024-004',
      name: 'Ana Reyes',
      program: 'BS Psychology',
      year: '4th Year',
      semester: '1st Semester 2025-2026',
      status: 'Approved',
      date: '2026-04-23',
      units: 15,
    },
  ];

  const subjects = [
    { code: 'MTH101', name: 'Mathematics 101', units: 3, instructor: 'Prof. Maria Santos', slots: 35 },
    { code: 'ENG101', name: 'English Communication', units: 3, instructor: 'Prof. John Reyes', slots: 40 },
    { code: 'HIS101', name: 'Philippine History', units: 3, instructor: 'Prof. Ana Cruz', slots: 38 },
    { code: 'CS101', name: 'Computer Science 101', units: 4, instructor: 'Prof. Carlos Tan', slots: 30 },
    { code: 'PE101', name: 'Physical Education', units: 2, instructor: 'Coach Mike Lopez', slots: 45 },
  ];

  const students = [
    { id: '2024-001', name: 'Juan Dela Cruz', program: 'BS CS', year: '2nd', status: 'Active', gpa: 1.75 },
    { id: '2024-002', name: 'Maria Santos', program: 'BS Acct', year: '3rd', status: 'Active', gpa: 1.5 },
    { id: '2024-003', name: 'Pedro Garcia', program: 'BS BA', year: '1st', status: 'Active', gpa: 2.0 },
    { id: '2024-004', name: 'Ana Reyes', program: 'BS Psych', year: '4th', status: 'Active', gpa: 1.25 },
    { id: '2024-005', name: 'Carlos Lopez', program: 'BS CS', year: '2nd', status: 'LOA', gpa: 2.25 },
  ];

  const enrollmentStats = [
    { program: 'BS CS', enrolled: 120 },
    { program: 'BS Acct', enrolled: 95 },
    { program: 'BS BA', enrolled: 110 },
    { program: 'BS Psych', enrolled: 85 },
    { program: 'Others', enrolled: 70 },
  ];

  const pendingCount = enrollmentRequests.filter((r) => r.status === 'Pending').length;
  const approvedCount = enrollmentRequests.filter((r) => r.status === 'Approved').length;

  const handleApprove = (id: string) => {
    console.log('Approved enrollment:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejected enrollment:', id);
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
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-3xl mt-2">{students.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Enrollments</p>
                  <p className="text-3xl mt-2">{pendingCount}</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved Today</p>
                  <p className="text-3xl mt-2">{approvedCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Subjects</p>
                  <p className="text-3xl mt-2">{subjects.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Pending Enrollments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg">Pending Enrollment Requests</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Student ID</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Program</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Year Level</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Units</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Date</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enrollmentRequests
                    .filter((req) => req.status === 'Pending')
                    .map((req, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{req.id}</td>
                        <td className="px-6 py-4 text-sm">{req.name}</td>
                        <td className="px-6 py-4 text-sm">{req.program}</td>
                        <td className="px-6 py-4 text-sm">{req.year}</td>
                        <td className="px-6 py-4 text-sm">{req.units}</td>
                        <td className="px-6 py-4 text-sm">{req.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(req.id)}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enrollment Statistics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg mb-4">Enrollment by Program</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="program" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'enrollment' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg">All Enrollment Requests</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Student ID</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Program</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Semester</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enrollmentRequests.map((req, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{req.id}</td>
                      <td className="px-6 py-4 text-sm">{req.name}</td>
                      <td className="px-6 py-4 text-sm">{req.program}</td>
                      <td className="px-6 py-4 text-sm">{req.semester}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            req.status === 'Approved'
                              ? 'bg-green-100 text-green-700'
                              : req.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {req.status === 'Pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(req.id)}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg">Subject Management</h3>
                <button
                  onClick={() => setShowAddSubject(!showAddSubject)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Subject
                </button>
              </div>
            </div>

            {showAddSubject && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h4 className="text-sm mb-4">Add New Subject</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Subject Code"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Subject Name"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Units"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Instructor"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Available Slots"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Save Subject
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Code</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Subject Name</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Units</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Instructor</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Slots</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subjects.map((subject, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{subject.code}</td>
                      <td className="px-6 py-4 text-sm">{subject.name}</td>
                      <td className="px-6 py-4 text-sm">{subject.units}</td>
                      <td className="px-6 py-4 text-sm">{subject.instructor}</td>
                      <td className="px-6 py-4 text-sm">{subject.slots}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
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
              <h3 className="text-lg">Student Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Student ID</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Program</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Year</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">GPA</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{student.id}</td>
                      <td className="px-6 py-4 text-sm">{student.name}</td>
                      <td className="px-6 py-4 text-sm">{student.program}</td>
                      <td className="px-6 py-4 text-sm">{student.year}</td>
                      <td className="px-6 py-4 text-sm">{student.gpa.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            student.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                      </td>
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
            <h3 className="text-lg mb-4">Generate Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm">Enrollment Report</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <FileText className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm">Student List</p>
              </button>
              <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <FileText className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-sm">Subject Offerings</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg mb-6">Registrar Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Enrollment Period</label>
              <input
                type="text"
                defaultValue="May 1 - June 15, 2026"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Maximum Units per Semester</label>
              <input
                type="number"
                defaultValue="24"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
