import { useLocation, useNavigate } from "react-router-dom";
import { clearSession, getStoredUser } from "../../lib/api";
import {
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  ClipboardCheck,
  CreditCard,
  DollarSign,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";

export default function DashboardLayout({ children, userRole, userName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = getStoredUser();
  const displayRole = storedUser?.role ?? userRole;
  const displayName = storedUser?.name ?? userName;

  const navItemsByRole = {
    student: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/student" },
      { label: "Enrollment", icon: BookOpen, path: "/student/enrollment" },
      { label: "Grades", icon: GraduationCap, path: "/student/grades" },
      { label: "Tuition / Payments", icon: DollarSign, path: "/student/tuition" },
      { label: "Evaluations", icon: ClipboardCheck, path: "/student/evaluation" },
      { label: "Notifications", icon: Bell, path: "/student/notifications" },
      { label: "Profile", icon: User, path: "/student/profile" },
    ],
    teacher: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/teacher" },
      { label: "My Courses", icon: BookOpen, path: "/teacher/courses" },
      { label: "Enter Grades", icon: GraduationCap, path: "/teacher/grades" },
      { label: "Student List", icon: Users, path: "/teacher/students" },
      { label: "Evaluations", icon: ClipboardCheck, path: "/teacher/evaluation" },
      { label: "Notifications", icon: Bell, path: "/teacher/notifications" },
      { label: "Profile", icon: User, path: "/teacher/profile" },
    ],
    admin: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
      { label: "Student Management", icon: Users, path: "/admin/students" },
      { label: "Teacher Management", icon: User, path: "/admin/teachers" },
      { label: "Course Management", icon: BookOpen, path: "/admin/courses" },
      { label: "Enrollment Management", icon: Calendar, path: "/admin/enrollment" },
      { label: "Grades Management", icon: GraduationCap, path: "/admin/grades" },
      { label: "Financial Services", icon: DollarSign, path: "/admin/financial" },
      { label: "Evaluations", icon: ClipboardCheck, path: "/admin/evaluations" },
      { label: "Reports", icon: FileText, path: "/admin/reports" },
      { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
      { label: "System Settings", icon: Settings, path: "/admin/settings" },
    ],
    registrar: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/registrar" },
      { label: "Enrollment Requests", icon: Calendar, path: "/registrar/enrollment" },
      { label: "Student Records", icon: FileText, path: "/registrar/records" },
      { label: "Course Catalog", icon: BookOpen, path: "/registrar/courses" },
      { label: "Class Rosters", icon: Users, path: "/registrar/rosters" },
      { label: "Reports", icon: BarChart3, path: "/registrar/reports" },
    ],
    finance: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/finance" },
      { label: "Payment Ledger", icon: CreditCard, path: "/finance/payments" },
      { label: "Student Balances", icon: Users, path: "/finance/balances" },
      { label: "Statements", icon: FileText, path: "/finance/statements" },
      { label: "Collections", icon: DollarSign, path: "/finance/collections" },
      { label: "Reports", icon: BarChart3, path: "/finance/reports" },
    ],
  };

  const navItems = navItemsByRole[displayRole] ?? navItemsByRole.student;

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="flex w-64 flex-col bg-[#1e3a8a] text-white">
        <div className="border-b border-[#1e40af] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-white">CMDI</h1>
              <p className="text-xs text-blue-200">Grade Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                  isActive
                    ? "bg-[#3b82f6] text-white"
                    : "text-blue-100 hover:bg-[#1e40af]"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-[#1e40af] p-4">
          <div className="mb-3 px-4 py-2">
            <p className="text-xs text-blue-200">Logged in as</p>
            <p className="text-sm font-medium text-white">{displayName}</p>
            <p className="text-xs capitalize text-blue-200">{displayRole}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              clearSession();
              navigate("/login");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-400 bg-transparent px-4 py-2 text-white transition-colors hover:bg-[#1e40af]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                CARD-MRI Development Institute Inc.
              </h2>
              <p className="text-sm text-muted-foreground">
                Academic Management System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-muted"
              >
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
