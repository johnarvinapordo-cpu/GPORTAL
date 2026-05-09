import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function TeacherSettingsPage() {
  return (
    <DashboardLayout userRole="teacher" userName="Teacher">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Teacher Settings</h1>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="p-4 bg-muted rounded-lg">
              Class Preferences
            </div>

            <div className="p-4 bg-muted rounded-lg">
              Grading Settings
            </div>

            <div className="p-4 bg-muted rounded-lg">
              Notification Preferences
            </div>

            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}