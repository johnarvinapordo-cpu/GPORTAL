import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { User, DollarSign } from "lucide-react";

export default function FinanceProfilePage() {
  return (
    <DashboardLayout userRole="finance" userName="Finance Officer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Finance Profile</h1>

        <Card>
          <CardContent className="flex items-center gap-6 pt-6">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <User className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Finance Officer</h2>
              <p className="text-muted-foreground">Billing & Payments</p>
              <p className="text-sm mt-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                FIN-2024-001
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}