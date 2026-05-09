import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { User } from "lucide-react";

export default function StudentProfilePage() {
  return (
    <DashboardLayout userRole="student" userName="Student">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Student Profile</h1>

        <Card>
          <CardContent className="flex items-center gap-6 pt-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Student Account</h2>
              <p className="text-muted-foreground">Enrolled Student</p>
              <p className="text-sm mt-2">STU-2024-001</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}