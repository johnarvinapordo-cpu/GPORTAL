import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { User, Shield } from "lucide-react";

export default function AdminProfilePage() {
  return (
    <DashboardLayout userRole="admin" userName="Administrator">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Profile</h1>

        <Card>
          <CardContent className="flex items-center gap-6 pt-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Administrator</h2>
              <p className="text-muted-foreground">System Admin Account</p>
              <p className="text-sm mt-2">
                <Shield className="inline w-4 h-4 mr-1" />
                ADM-2024-001
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}