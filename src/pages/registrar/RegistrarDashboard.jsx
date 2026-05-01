import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import { Badge } from "../../components/ui/badge";
import { BookOpen, CalendarCheck, ClipboardCheck, FileText, Users } from "lucide-react";
import { apiRequest } from "../../lib/api";

export default function RegistrarDashboard() {
  const [apiData, setApiData] = useState(null);
  const fallbackRequests = [
    { student: "Maria Villanueva", program: "BS Computer Science", status: "For Review", date: "May 2, 2026" },
    { student: "Kevin Ramos", program: "BS Business Administration", status: "Missing Form", date: "May 1, 2026" },
    { student: "Angel Santos", program: "BSEd English", status: "Ready", date: "April 30, 2026" },
  ];
  const enrollmentRequests = apiData?.pendingEnrollments?.length
    ? apiData.pendingEnrollments.map((request) => ({
        student: request.student_name,
        program: `${request.course_code} - ${request.title}`,
        status: request.status === "pending" ? "For Review" : request.status,
        date: new Date(request.enrolled_at).toLocaleDateString(),
      }))
    : fallbackRequests;

  useEffect(() => {
    apiRequest("/api/registrar").then(setApiData).catch(() => {});
  }, []);

  const recordsQueue = [
    { request: "Transcript of Records", count: 18, owner: "Records Window 1" },
    { request: "Certificate of Enrollment", count: 32, owner: "Enrollment Desk" },
    { request: "Good Moral Certificate", count: 11, owner: "Registrar Clerk" },
  ];

  const programStats = [
    { label: "Computer Science", value: "450 enrolled" },
    { label: "Business Administration", value: "380 enrolled" },
    { label: "Education", value: "250 enrolled" },
  ];

  return (
    <DashboardLayout userRole="registrar" userName="Registrar Office">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Registrar Dashboard</h1>
          <p className="text-muted-foreground">Enrollment processing, records requests, and academic documents</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Students" value="1,400" helper="+72 this semester" icon={<Users />} />
          <StatCard title="Pending Enrollment" value={apiData?.pendingEnrollments?.length ?? "47"} helper="12 need validation" icon={<CalendarCheck />} tone="accent" />
          <StatCard title="Record Requests" value="61" helper="18 due today" icon={<FileText />} tone="default" />
          <StatCard title="Active Courses" value={apiData?.courses?.length ?? "120"} helper="Across all programs" icon={<BookOpen />} tone="default" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Enrollment Requests</h2>
              <p className="text-sm text-muted-foreground">Applications needing registrar action</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {enrollmentRequests.map((request) => (
                <div key={request.student} className="border-l-4 border-primary py-2 pl-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{request.student}</h3>
                      <p className="text-sm text-muted-foreground">{request.program}</p>
                      <p className="text-sm text-muted-foreground">{request.date}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={request.status === "Missing Form" ? "border-accent text-accent" : ""}
                    >
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Records Queue</h2>
              <p className="text-sm text-muted-foreground">Document requests by service counter</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {recordsQueue.map((item) => (
                <div key={item.request} className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{item.request}</h3>
                      <p className="text-sm text-muted-foreground">{item.owner}</p>
                    </div>
                    <div className="text-2xl font-bold text-primary">{item.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <ClipboardCheck className="h-5 w-5" />
              Program Enrollment Snapshot
            </h2>
            <p className="text-sm text-muted-foreground">Quick view of registrar-monitored populations</p>
          </div>
          <div className="grid gap-4 p-6 pt-0 md:grid-cols-3">
            {programStats.map((program) => (
              <div key={program.label} className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">{program.label}</p>
                <p className="mt-1 text-2xl font-bold">{program.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
