import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Save,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface ProfilePageProps {
  userRole: "student" | "teacher" | "admin" | "finance" | "registrar";
  userName: string;
  mode?: "profile" | "settings";
}

export default function ProfilePage({
  userRole,
  userName,
  mode = "profile",
}: ProfilePageProps) {
  const getRoleTitle = () => {
    switch (userRole) {
      case "finance":
        return "Finance Officer";
      case "registrar":
        return "Registrar Officer";
      case "admin":
        return "Administrator";
      case "teacher":
        return "Teacher";
      default:
        return "Student";
    }
  };

  const getEmployeeId = () => {
    switch (userRole) {
      case "finance":
        return "FIN-2024-001";
      case "registrar":
        return "REG-2024-002";
      case "admin":
        return "ADM-2024-003";
      case "teacher":
        return "TCH-2024-004";
      default:
        return "2024-001234";
    }
  };

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">

        {/* ================= ADMIN PROFILE ================= */}
        {mode === "profile" && (
          <>
            <div>
              <h1 className="text-3xl font-bold">Admin Profile</h1>
              <p className="text-muted-foreground">
                Manage your account information
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{userName}</h2>
                    <p className="text-muted-foreground">{getRoleTitle()}</p>

                    <div className="mt-4 text-sm space-y-2">
                      <p>
                        <Shield className="inline w-4 h-4 mr-2" />
                        ID: {getEmployeeId()}
                      </p>
                      <p>
                        <Calendar className="inline w-4 h-4 mr-2" />
                        Joined: January 15, 2024
                      </p>
                    </div>
                  </div>

                  <Button variant="outline">Change Photo</Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* ================= ADMIN SETTINGS ================= */}
        {mode === "settings" && (
          <>
            <div>
              <h1 className="text-3xl font-bold">Admin Settings</h1>
              <p className="text-muted-foreground">
                System configuration and preferences
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Manage admin system configuration
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">System Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    Current: Production
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">User Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage roles and permissions
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}