import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function FinanceSettingsPage() {
  return (
    <DashboardLayout userRole="finance" userName="Finance Officer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Finance Settings</h1>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="p-4 bg-muted rounded-lg">
              Payment Configuration
            </div>

            <div className="p-4 bg-muted rounded-lg">
              Billing Cycles
            </div>

            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}