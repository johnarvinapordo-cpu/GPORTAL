import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  Users,
  Settings,
  LogOut,
  GraduationCap,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppUser } from "@/types";

interface SidebarProps {
  user: AppUser;
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const links = {
    student: [
      { to: "/student", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/student/enrollment", icon: BookOpen, label: "Enrollment" },
      { to: "/student/grades", icon: ClipboardCheck, label: "Grades" },
      { to: "/student/tuition", icon: DollarSign, label: "Tuition" },
      { to: "/student/evaluation", icon: GraduationCap, label: "Evaluation" },
    ],
    teacher: [
      { to: "/teacher", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/teacher/courses", icon: BookOpen, label: "Courses" },
    ],
    admin: [
      { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/admin/reports", icon: Settings, label: "Reports" },
    ],
    finance: [
      { to: "/finance", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/finance/payments", icon: DollarSign, label: "Payments" },
    ],
    registrar: [
      { to: "/registrar", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/registrar/enrollment", icon: Users, label: "Enrollment" },
    ],
  }[user.role] || [];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 flex flex-col">
      <div className="p-6 text-white font-bold">CMDI Portal</div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg",
                isActive ? "bg-blue-600 text-white" : "text-gray-300"
              )
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button onClick={onLogout} className="p-4 text-red-400">
        <LogOut className="w-5 h-5 inline mr-2" />
        Logout
      </button>
    </aside>
  );
}