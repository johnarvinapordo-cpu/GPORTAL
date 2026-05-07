import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
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
import { cn } from "./ui/utils";

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "student" | "teacher" | "admin";
  userName: string;
}

export default function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

