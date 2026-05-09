import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function RegistrarSettingsPage() {
  return (
    <DashboardLayout userRole="registrar" userName="Registrar Officer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Registrar Settings</h1>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="p-4 bg-muted rounded-lg">
              Enrollment Rules
            </div>

            <div className="p-4 bg-muted rounded-lg">
              Records System Settings
            </div>

            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}