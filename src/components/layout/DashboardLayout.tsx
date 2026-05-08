import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  ClipboardCheck, 
  Bell, 
  User, 
  LogOut,
  Users,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  Menu,
  X
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "student" | "teacher" | "admin" | "finance" | "registrar";
  userName: string;
}

export default function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const studentNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/student" },
    { label: "Enrollment", icon: <BookOpen className="w-5 h-5" />, path: "/student/enrollment" },
    { label: "Grades", icon: <GraduationCap className="w-5 h-5" />, path: "/student/grades" },
    { label: "Tuition / Payments", icon: <DollarSign className="w-5 h-5" />, path: "/student/tuition" },
    { label: "Evaluations", icon: <ClipboardCheck className="w-5 h-5" />, path: "/student/evaluation" },
    { label: "Notifications", icon: <Bell className="w-5 h-5" />, path: "/student/notifications" },
    { label: "Profile", icon: <User className="w-5 h-5" />, path: "/student/profile" },
  ];

  const teacherNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/teacher" },
    { label: "My Courses", icon: <BookOpen className="w-5 h-5" />, path: "/teacher/courses" },
    { label: "Enter Grades", icon: <GraduationCap className="w-5 h-5" />, path: "/teacher/grades" },
    { label: "Student List", icon: <Users className="w-5 h-5" />, path: "/teacher/students" },
    { label: "Evaluations", icon: <ClipboardCheck className="w-5 h-5" />, path: "/teacher/evaluation" },
    { label: "Notifications", icon: <Bell className="w-5 h-5" />, path: "/teacher/notifications" },
    { label: "Profile", icon: <User className="w-5 h-5" />, path: "/teacher/profile" },
  ];

  const adminNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/admin" },
    { label: "Student Management", icon: <Users className="w-5 h-5" />, path: "/admin/students" },
    { label: "Teacher Management", icon: <User className="w-5 h-5" />, path: "/admin/teachers" },
    { label: "Course Management", icon: <BookOpen className="w-5 h-5" />, path: "/admin/courses" },
    { label: "Enrollment Management", icon: <Calendar className="w-5 h-5" />, path: "/admin/enrollment" },
    { label: "Grades Management", icon: <GraduationCap className="w-5 h-5" />, path: "/admin/grades" },
    { label: "Financial Services", icon: <DollarSign className="w-5 h-5" />, path: "/admin/financial" },
    { label: "Evaluations", icon: <ClipboardCheck className="w-5 h-5" />, path: "/admin/evaluations" },
    { label: "Reports", icon: <FileText className="w-5 h-5" />, path: "/admin/reports" },
    { label: "Analytics", icon: <BarChart3 className="w-5 h-5" />, path: "/admin/analytics" },
    { label: "System Settings", icon: <Settings className="w-5 h-5" />, path: "/admin/settings" },
  ];

  const financeNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/finance" },
    { label: "Student Accounts", icon: <Users className="w-5 h-5" />, path: "/finance/students" },
    { label: "Payments & Billing", icon: <DollarSign className="w-5 h-5" />, path: "/finance/payments" },
    { label: "Financial Reports", icon: <FileText className="w-5 h-5" />, path: "/finance/reports" },
    { label: "Notifications", icon: <Bell className="w-5 h-5" />, path: "/finance/notifications" },
    { label: "Profile", icon: <User className="w-5 h-5" />, path: "/finance/profile" },
  ];

  const registrarNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/registrar" },
    { label: "Student Records", icon: <Users className="w-5 h-5" />, path: "/registrar/students" },
    { label: "Enrollment Management", icon: <Calendar className="w-5 h-5" />, path: "/registrar/enrollment" },
    { label: "Grades Management", icon: <GraduationCap className="w-5 h-5" />, path: "/registrar/grades" },
    { label: "Course Management", icon: <BookOpen className="w-5 h-5" />, path: "/registrar/courses" },
    { label: "Notifications", icon: <Bell className="w-5 h-5" />, path: "/registrar/notifications" },
    { label: "Profile", icon: <User className="w-5 h-5" />, path: "/registrar/profile" },
  ];

  const navItems =
    userRole === "student" ? studentNavItems :
    userRole === "teacher" ? teacherNavItems :
    userRole === "finance" ? financeNavItems :
    userRole === "registrar" ? registrarNavItems :
    adminNavItems;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">CMDI Portal</h1>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm",
                location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="px-4 py-2">
            <p className="text-xs text-gray-500">Logged in as</p>
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                CARD-MRI Development Institute Inc.
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
