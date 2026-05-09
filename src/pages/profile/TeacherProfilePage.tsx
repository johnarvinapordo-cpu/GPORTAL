import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { User, BookOpen } from "lucide-react";

export default function TeacherProfilePage() {
  return (
    <DashboardLayout userRole="teacher" userName="Teacher">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Teacher Profile</h1>

        <Card>
          <CardContent className="flex items-center gap-6 pt-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <User className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Teacher Account</h2>
              <p className="text-muted-foreground">Faculty Member</p>
              <p className="text-sm mt-2">
                <BookOpen className="inline w-4 h-4 mr-1" />
                Faculty ID: TCH-2024-002
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}