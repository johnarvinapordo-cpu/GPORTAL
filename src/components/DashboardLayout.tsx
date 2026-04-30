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
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "student" | "teacher" | "admin" | "registrar" | "finance";
  userName: string;
}

export default function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case "student":
        return [
          { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/student" },
          { label: "Enroll", icon: <FileText className="w-5 h-5" />, path: "/student/enroll" },
          { label: "Grades", icon: <ClipboardCheck className="w-5 h-5" />, path: "/student/grades" },
          { label: "Finance", icon: <DollarSign className="w-5 h-5" />, path: "/student/finance" },
        ];
      case "teacher":
        return [
          { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/teacher" },
          { label: "Courses", icon: <BookOpen className="w-5 h-5" />, path: "/teacher/courses" },
          { label: "Students", icon: <Users className="w-5 h-5" />, path: "/teacher/students" },
          { label: "Grades", icon: <ClipboardCheck className="w-5 h-5" />, path: "/teacher/grades" },
        ];
      case "admin":
        return [
          { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/admin" },
          { label: "Students", icon: <Users className="w-5 h-5" />, path: "/admin/students" },
          { label: "Faculty", icon: <GraduationCap className="w-5 h-5" />, path: "/admin/faculty" },
          { label: "Courses", icon: <BookOpen className="w-5 h-5" />, path: "/admin/courses" },
          { label: "Analytics", icon: <BarChart3 className="w-5 h-5" />, path: "/admin/analytics" },
          { label: "Finance", icon: <DollarSign className="w-5 h-5" />, path: "/admin/finance" },
          { label: "Enrollment", icon: <Calendar className="w-5 h-5" />, path: "/admin/enrollment" },
          { label: "Settings", icon: <Settings className="w-5 h-5" />, path: "/admin/settings" },
        ];
      case "registrar":
        return [
          { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/registrar" },
          { label: "Students", icon: <Users className="w-5 h-5" />, path: "/registrar/students" },
          { label: "Enrollment", icon: <Calendar className="w-5 h-5" />, path: "/registrar/enrollment" },
          { label: "Records", icon: <FileText className="w-5 h-5" />, path: "/registrar/records" },
        ];
      case "finance":
        return [
          { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/finance" },
          { label: "Payments", icon: <DollarSign className="w-5 h-5" />, path: "/finance/payments" },
          { label: "Accounts", icon: <Users className="w-5 h-5" />, path: "/finance/accounts" },
          { label: "Reports", icon: <BarChart3 className="w-5 h-5" />, path: "/finance/reports" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('cmdi_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border fixed h-screen flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">CMDI Portal</h2>
          <p className="text-xs text-muted-foreground capitalize">{userRole} Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                currentPath === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold capitalize">{userRole} Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
<Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">{userName}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
