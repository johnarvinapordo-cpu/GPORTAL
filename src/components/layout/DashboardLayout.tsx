import { ReactNode, useState, useEffect } from "react";
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
  Menu,
  X,
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

export default function DashboardLayout({
  children,
  userRole,
  userName,
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("cmdi_user") || "null");
    } catch {
      return null;
    }
  })();

  const role =
    (storedUser?.role || userRole || "student")
      .toString()
      .toLowerCase()
      .trim();

  const name = storedUser?.name ?? userName ?? "User";

  useEffect(() => {
    console.log("ACTIVE ROLE:", role);
  }, [role]);

  const studentNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/student" },
    { label: "Enrollment", icon: <BookOpen />, path: "/student/enrollment" },
    { label: "Grades", icon: <GraduationCap />, path: "/student/grades" },
    { label: "Finance", icon: <DollarSign />, path: "/student/tuition" },
    { label: "Evaluation", icon: <ClipboardCheck />, path: "/student/evaluation" },
    { label: "Reports", icon: <BarChart3 />, path: "/student/reports" },
    { label: "Settings", icon: <Settings />, path: "/student/settings" },
    { label: "Notifications", icon: <Bell />, path: "/student/notifications" },
    { label: "Profile", icon: <User />, path: "/student/profile" },
  ];

  const teacherNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/teacher" },
    { label: "Courses", icon: <BookOpen />, path: "/teacher/courses" },
    { label: "Grades", icon: <GraduationCap />, path: "/teacher/grades" },
    { label: "Students", icon: <Users />, path: "/teacher/students" },
    { label: "Evaluation", icon: <ClipboardCheck />, path: "/teacher/evaluation" },
    { label: "Reports", icon: <BarChart3 />, path: "/teacher/reports" },
    { label: "Settings", icon: <Settings />, path: "/teacher/settings" },
    { label: "Notifications", icon: <Bell />, path: "/teacher/notifications" },
    { label: "Profile", icon: <User />, path: "/teacher/profile" },
  ];

  const adminNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/admin" },
    { label: "Students", icon: <Users />, path: "/admin/students" },
    { label: "Courses", icon: <BookOpen />, path: "/admin/courses" },
    { label: "Enrollment", icon: <ClipboardCheck />, path: "/admin/enrollment" },
    { label: "Grades", icon: <GraduationCap />, path: "/admin/grades" },
    { label: "Finance", icon: <DollarSign />, path: "/admin/financial" },
    { label: "Analytics", icon: <BarChart3 />, path: "/admin/analytics" },
    { label: "Reports", icon: <FileText />, path: "/admin/reports" },
    { label: "Settings", icon: <Settings />, path: "/admin/settings" },
    { label: "Notifications", icon: <Bell />, path: "/admin/notifications" },
    { label: "Profile", icon: <User />, path: "/admin/profile" },
  ];

  const financeNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/finance" },
    { label: "Students", icon: <Users />, path: "/finance/students" },
    { label: "Payments", icon: <DollarSign />, path: "/finance/payments" },
    { label: "Reports", icon: <FileText />, path: "/finance/reports" },
    { label: "Settings", icon: <Settings />, path: "/finance/settings" },
    { label: "Notifications", icon: <Bell />, path: "/finance/notifications" },
    { label: "Profile", icon: <User />, path: "/finance/profile" },
  ];

  const registrarNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/registrar" },
    { label: "Enrollment", icon: <Users />, path: "/registrar/enrollment" },
    { label: "Subjects", icon: <BookOpen />, path: "/registrar/subjects" },
    { label: "Students", icon: <FileText />, path: "/registrar/students" },
    { label: "Reports", icon: <BarChart3 />, path: "/registrar/reports" },
    { label: "Settings", icon: <Settings />, path: "/registrar/settings" },
  ];

  const navItems =
    {
      student: studentNavItems,
      teacher: teacherNavItems,
      admin: adminNavItems,
      finance: financeNavItems,
      registrar: registrarNavItems,
    }[role] || [];

  const handleLogout = () => {
    localStorage.removeItem("cmdi_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r z-40 transition-transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-64`}>

        <div className="p-6 border-b">
          <h1 className="text-lg font-bold">
            CMDI Portal
          </h1>
          <p className="text-xs text-gray-500 capitalize">{role}</p>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-220px)]">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm",
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <p className="text-sm font-medium">{name}</p>
          <Button onClick={handleLogout} className="w-full mt-3">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:ml-64">
        <header className="bg-white border-b sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X /> : <Menu />}
            </button>

            <h2 className="font-semibold">
              CARD-MRI Development Institute Inc.
            </h2>

            <span className="text-sm">{name}</span>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}