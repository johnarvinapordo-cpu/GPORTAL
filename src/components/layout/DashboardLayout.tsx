import { ReactNode } from "react";
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
  Calendar
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#1e40af]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">CMDI</h1>
              <p className="text-xs text-blue-200">Grade Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-[#3b82f6] text-white"
                  : "text-blue-100 hover:bg-[#1e40af]"
              )}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-[#1e40af]">
          <div className="mb-3 px-4 py-2">
            <p className="text-xs text-blue-200">Logged in as</p>
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-xs text-blue-200 capitalize">{userRole}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full bg-transparent border-blue-400 text-white hover:bg-[#1e40af] hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                CARD-MRI Development Institute Inc.
              </h2>
              <p className="text-sm text-muted-foreground">Academic Management System</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
