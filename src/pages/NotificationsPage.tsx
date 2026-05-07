import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Bell, CheckCheck, Trash2, Settings, DollarSign, FileText, AlertCircle, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface NotificationsPageProps {
  userRole: "student" | "teacher" | "admin" | "finance" | "registrar";
  userName: string;
}

export default function NotificationsPage({ userRole, userName }: NotificationsPageProps) {
  const notifications = [
    {
      id: 1,
      type: "payment",
      title: "Payment Received",
      message: "Payment of ₱15,000 from Juan Dela Cruz (2024-001234) has been processed successfully.",
      time: "5 minutes ago",
      read: false,
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      roles: ["finance"]
    },
    {
      id: 2,
      type: "enrollment",
      title: "New Enrollment Request",
      message: "Maria Santos has submitted an enrollment request for Computer Science program.",
      time: "15 minutes ago",
      read: false,
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      roles: ["registrar", "admin"]
    },
    {
      id: 3,
      type: "alert",
      title: "Overdue Payment Alert",
      message: "5 student accounts have overdue payments requiring follow-up action.",
      time: "1 hour ago",
      read: false,
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      roles: ["finance"]
    },
    {
      id: 4,
      type: "document",
      title: "Document Request Completed",
      message: "Transcript of Records for Pedro Reyes (2024-001236) is ready for release.",
      time: "2 hours ago",
      read: true,
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      roles: ["registrar"]
    },
    {
      id: 5,
      type: "payment",
      title: "Payment Verification Pending",
      message: "Check payment from Ana Garcia requires verification and approval.",
      time: "3 hours ago",
      read: true,
      icon: <DollarSign className="w-5 h-5 text-yellow-600" />,
      roles: ["finance"]
    },
    {
      id: 6,
      type: "enrollment",
      title: "Enrollment Period Reminder",
      message: "Enrollment period for 2nd semester ends in 7 days. 23 students pending enrollment.",
      time: "5 hours ago",
      read: true,
      icon: <Calendar className="w-5 h-5 text-orange-600" />,
      roles: ["registrar", "admin"]
    },
    {
      id: 7,
      type: "system",
      title: "System Maintenance Notice",
      message: "Scheduled system maintenance on May 15, 2026 from 2:00 AM to 4:00 AM.",
      time: "1 day ago",
      read: true,
      icon: <Settings className="w-5 h-5 text-gray-600" />,
      roles: ["student", "teacher", "admin", "finance", "registrar"]
    },
  ];

  const filteredNotifications = notifications.filter(n => n.roles.includes(userRole));
  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All as Read
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{filteredNotifications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <AlertCircle className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{unreadCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Read</CardTitle>
              <CheckCheck className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{filteredNotifications.length - unreadCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Previously viewed</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>Recent activity and important updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                    notification.read ? 'bg-background' : 'bg-primary/5 border-primary/20'
                  } hover:bg-muted/50`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {!notification.read && (
                          <Button variant="ghost" size="sm">
                            <CheckCheck className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get real-time updates</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">SMS Alerts</h4>
                  <p className="text-sm text-muted-foreground">Critical updates via SMS</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
