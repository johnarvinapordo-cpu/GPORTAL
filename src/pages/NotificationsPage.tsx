import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Bell,
  CheckCheck,
  Trash2,
  Settings,
  DollarSign,
  FileText,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface NotificationsPageProps {
  userRole: "student" | "teacher" | "admin" | "finance" | "registrar";
  userName: string;
}

export default function NotificationsPage({
  userRole,
  userName,
}: NotificationsPageProps) {

  // ✅ normalize role ONCE
  const safeRole = userRole?.toLowerCase().trim();

  // ================= NOTIFICATIONS =================
  const notifications = [
    {
      id: 1,
      type: "payment",
      title: "Payment Received",
      message:
        "Payment of ₱15,000 from Juan Dela Cruz (2024-001234) has been processed successfully.",
      time: "5 minutes ago",
      read: false,
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      roles: ["finance"],
    },
    {
      id: 2,
      type: "enrollment",
      title: "New Enrollment Request",
      message:
        "Maria Santos has submitted an enrollment request for Computer Science program.",
      time: "15 minutes ago",
      read: false,
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      roles: ["registrar", "admin"],
    },
    {
      id: 3,
      type: "alert",
      title: "Overdue Payment Alert",
      message:
        "5 student accounts have overdue payments requiring follow-up action.",
      time: "1 hour ago",
      read: false,
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      roles: ["finance"],
    },
    {
      id: 4,
      type: "document",
      title: "Document Request Completed",
      message:
        "Transcript of Records for Pedro Reyes is ready for release.",
      time: "2 hours ago",
      read: true,
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      roles: ["registrar"],
    },
    {
      id: 5,
      type: "system",
      title: "System Maintenance Notice",
      message:
        "Scheduled maintenance on May 15, 2026 from 2:00 AM to 4:00 AM.",
      time: "1 day ago",
      read: true,
      icon: <Settings className="w-5 h-5 text-gray-600" />,
      roles: ["student", "teacher", "admin", "finance", "registrar"],
    },
  ];

  // ✅ FIXED FILTER
  const filteredNotifications = notifications.filter((n) =>
    n.roles.map((r) => r.toLowerCase()).includes(safeRole)
  );

  const unreadCount = filteredNotifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>
        </div>

        {/* LIST */}
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>Recent updates</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    n.read ? "bg-white" : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div>{n.icon}</div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{n.title}</h3>
                    <p className="text-sm text-gray-600">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>

                  {!n.read && <Badge>New</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}