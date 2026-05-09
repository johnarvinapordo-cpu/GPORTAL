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
  Calendar,
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

  // 🔥 FORCE SINGLE SOURCE OF TRUTH
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("cmdi_user") || "null");
    } catch {
      return null;
    }
  })();

  const role = (storedUser?.role || userRole || "").toLowerCase().trim();
  const name = storedUser?.name || userName;

  // DEBUG (KEEP THIS UNTIL EVERYTHING WORKS)
  useEffect(() => {
    console.log("ACTIVE ROLE:", role);
  }, [role]);

  // ================= NAV ITEMS =================

  // ===================== STUDENT =====================
const studentNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: "/student",
  },

  {
    label: "Enrollment",
    icon: <BookOpen className="w-5 h-5" />,
    path: "/student/enrollment",
  },

  {
    label: "Grades",
    icon: <GraduationCap className="w-5 h-5" />,
    path: "/student/grades",
  },

  {
    label: "Finance",
    icon: <DollarSign className="w-5 h-5" />,
    path: "/student/tuition",
  },

  {
    label: "Evaluation",
    icon: <ClipboardCheck className="w-5 h-5" />,
    path: "/student/evaluation",
  },

  {
    label: "Reports",
    icon: <BarChart3 className="w-5 h-5" />,
    path: "/student/reports",
  },

  {
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    path: "/student/settings",
  },

  // KEEP THESE SO THEY STILL WORK
  {
    label: "Notifications",
    icon: <Bell className="w-5 h-5" />,
    path: "/student/notifications",
  },

  {
    label: "Profile",
    icon: <User className="w-5 h-5" />,
    path: "/student/profile",
  },
];

  // ===================== TEACHER =====================
const teacherNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: "/teacher",
  },

  {
    label: "Courses",
    icon: <BookOpen className="w-5 h-5" />,
    path: "/teacher/courses",
  },

  {
    label: "Grades",
    icon: <GraduationCap className="w-5 h-5" />,
    path: "/teacher/grades",
  },

  {
    label: "Students",
    icon: <Users className="w-5 h-5" />,
    path: "/teacher/students",
  },

  {
    label: "Evaluation",
    icon: <ClipboardCheck className="w-5 h-5" />,
    path: "/teacher/evaluation",
  },

  {
    label: "Reports",
    icon: <BarChart3 className="w-5 h-5" />,
    path: "/teacher/reports",
  },

  {
    label: "Notifications",
    icon: <Bell className="w-5 h-5" />,
    path: "/teacher/notifications",
  },

  {
    label: "Profile",
    icon: <User className="w-5 h-5" />,
    path: "/teacher/profile",
  },

  {
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    path: "/teacher/settings",
  },
];

   // ===================== ADMIN =====================
const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: "/admin",
  },

  {
    label: "Students",
    icon: <Users className="w-5 h-5" />,
    path: "/admin/students",
  },

  {
    label: "Courses",
    icon: <BookOpen className="w-5 h-5" />,
    path: "/admin/courses",
  },

  {
    label: "Enrollment",
    icon: <ClipboardCheck className="w-5 h-5" />,
    path: "/admin/enrollment",
  },

  {
    label: "Grades",
    icon: <GraduationCap className="w-5 h-5" />,
    path: "/admin/grades",
  },

  {
    label: "Finance",
    icon: <DollarSign className="w-5 h-5" />,
    path: "/admin/financial",
  },

  {
    label: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    path: "/admin/analytics",
  },

  {
    label: "Reports",
    icon: <FileText className="w-5 h-5" />,
    path: "/admin/reports",
  },

  {
    label: "Notifications",
    icon: <Bell className="w-5 h-5" />,
    path: "/admin/notifications",
  },

  {
    label: "Profile",
    icon: <User className="w-5 h-5" />,
    path: "/admin/profile",
  },

  {
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    path: "/admin/settings",
  },
];

  const financeNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/finance" },
    { label: "Student Accounts", icon: <Users className="w-5 h-5" />, path: "/finance/students" },
    { label: "Payments & Billing", icon: <DollarSign className="w-5 h-5" />, path: "/finance/payments" },
    { label: "Financial Reports", icon: <FileText className="w-5 h-5" />, path: "/finance/reports" },
    { label: "Notifications", icon: <Bell className="w-5 h-5" />, path: "/finance/notifications" },
    { label: "Profile", icon: <User className="w-5 h-5" />, path: "/finance/profile" },
  ];


  // ✅ FINAL REGISTRAR SIDEBAR (YOUR REQUEST EXACTLY)
  const registrarNavItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/registrar" },
    { label: "Enrollment", icon: <Users />, path: "/registrar/enrollment" },
    { label: "Subjects", icon: <BookOpen />, path: "/registrar/subjects" },
    { label: "Students", icon: <FileText />, path: "/registrar/students" },
    { label: "Reports", icon: <BarChart3 />, path: "/registrar/reports" },
    { label: "Settings", icon: <Settings />, path: "/registrar/settings" },
  ];

  // ================= ROLE FIX =================
  let navItems: NavItem[];

switch (role) {
  case "student":
    navItems = studentNavItems;
    break;

  case "teacher":
    navItems = teacherNavItems;
    break;

  case "admin":
    navItems = adminNavItems;
    break;

  case "finance":
    navItems = financeNavItems;
    break;

  case "registrar":
    navItems = registrarNavItems;
    break;

  default:
    console.warn("UNKNOWN ROLE DETECTED:", role);
    navItems = [];
}
if (!role) {
  console.error("ROLE IS EMPTY — forcing logout");
  navigate("/");
}
  const handleLogout = () => {
    localStorage.removeItem("cmdi_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r z-40 transition-transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-64`}>

        {/* HEADER */}
        <div className="p-6 border-b">
          <h1 className="text-lg font-bold text-gray-900">
            {role === "registrar" ? "CMDI Portal Registrar" : "CMDI Portal"}
          </h1>
          <p className="text-xs text-gray-500 capitalize">{role}</p>
        </div>

        {/* NAV */}
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
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* USER */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500 capitalize">{role}</p>

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

            <h2 className="font-semibold text-gray-800">
              CARD-MRI Development Institute Inc.
            </h2>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              <span className="text-sm">{name}</span>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}