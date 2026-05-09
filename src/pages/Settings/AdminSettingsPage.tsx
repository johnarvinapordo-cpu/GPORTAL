import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function AdminSettingsPage() {
  return (
    <DashboardLayout userRole="admin" userName="Administrator">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Settings</h1>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="p-4 bg-muted rounded-lg">
              System Permissions
            </div>

            <div className="p-4 bg-muted rounded-lg">
              User Role Control
            </div>

            <div className="p-4 bg-muted rounded-lg">
              Audit Logs
            </div>

            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}