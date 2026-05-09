import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function StudentSettingsPage() {
  return (
    <DashboardLayout userRole="student" userName="Student">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Student Settings</h1>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="p-4 bg-muted rounded-lg">
              Course Notifications
            </div>

            <div className="p-4 bg-muted rounded-lg">
              Profile Visibility
            </div>

            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}