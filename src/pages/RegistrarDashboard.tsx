import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Users, UserCheck, UserPlus, FileText, Calendar, GraduationCap, TrendingUp, ClipboardCheck } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../components/ui/button";

export default function RegistrarDashboard() {
  const registrarName = "Registrar Officer";

  const enrollmentTrendsData = [
    { semester: "1st Sem 2024", enrolled: 1200, graduated: 250 },
    { semester: "2nd Sem 2024", enrolled: 1250, graduated: 0 },
    { semester: "Summer 2025", enrolled: 450, graduated: 0 },
    { semester: "1st Sem 2025", enrolled: 1300, graduated: 280 },
    { semester: "2nd Sem 2025", enrolled: 1350, graduated: 0 },
    { semester: "Summer 2026", enrolled: 520, graduated: 0 },
    { semester: "1st Sem 2026", enrolled: 1400, graduated: 0 },
  ];

  const studentStatusData = [
    { name: "Enrolled", value: 1400, color: "#3b82f6" },
    { name: "On Leave", value: 85, color: "#f59e0b" },
    { name: "Graduating", value: 320, color: "#10b981" },
    { name: "Withdrawn", value: 45, color: "#ef4444" },
  ];

  const enrollmentByYearLevel = [
    { year: "1st Year", count: 450 },
    { year: "2nd Year", count: 380 },
    { year: "3rd Year", count: 340 },
    { year: "4th Year", count: 230 },
  ];

  const programEnrollmentData = [
    { program: "Computer Science", students: 450, capacity: 500 },
    { program: "Business Admin", students: 380, capacity: 400 },
    { program: "Engineering", students: 320, capacity: 350 },
    { program: "Education", students: 250, capacity: 300 },
  ];

  const pendingRequests = [
    { id: "REQ-2026-0145", student: "Juan Dela Cruz", type: "Enrollment", program: "Computer Science", date: "2026-05-07", status: "Pending Review" },
    { id: "REQ-2026-0146", student: "Maria Santos", type: "Transfer of Records", program: "Business Admin", date: "2026-05-07", status: "Pending Review" },
    { id: "REQ-2026-0147", student: "Pedro Reyes", type: "Change of Program", program: "Engineering", date: "2026-05-06", status: "For Approval" },
    { id: "REQ-2026-0148", student: "Ana Garcia", type: "Leave of Absence", program: "Education", date: "2026-05-06", status: "Pending Review" },
    { id: "REQ-2026-0149", student: "Jose Ramos", type: "Cross Enrollment", program: "Computer Science", date: "2026-05-05", status: "For Approval" },
  ];

  const recentGraduates = [
    { studentId: "2020-001234", name: "Carlos Martinez", program: "Computer Science", gwa: "1.45", honors: "Magna Cum Laude" },
    { studentId: "2020-001235", name: "Sofia Lopez", program: "Business Admin", gwa: "1.85", honors: "Cum Laude" },
    { studentId: "2020-001236", name: "Miguel Torres", program: "Engineering", gwa: "1.35", honors: "Summa Cum Laude" },
    { studentId: "2020-001237", name: "Elena Rivera", program: "Education", gwa: "2.10", honors: "None" },
  ];

  const documentRequests = [
    { id: "DOC-2026-0234", student: "Luis Fernandez", document: "Transcript of Records", purpose: "Job Application", status: "Ready for Release" },
    { id: "DOC-2026-0235", student: "Carmen Diaz", document: "Certificate of Enrollment", purpose: "Scholarship", status: "Processing" },
    { id: "DOC-2026-0236", student: "Roberto Silva", document: "Certificate of Grades", purpose: "Transfer", status: "Ready for Release" },
    { id: "DOC-2026-0237", student: "Isabella Cruz", document: "Diploma Copy", purpose: "Employment", status: "Processing" },
  ];

  return (
    <DashboardLayout userRole="registrar" userName={registrarName}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Registrar Dashboard</h1>
          <p className="text-muted-foreground">Student records and enrollment management</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1,400</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+3.7% from last semester</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Enrollees</CardTitle>
              <UserPlus className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">450</div>
              <p className="text-xs text-muted-foreground mt-1">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Graduating Students</CardTitle>
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">320</div>
              <p className="text-xs text-muted-foreground mt-1">Expected this year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <ClipboardCheck className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">23</div>
              <p className="text-xs text-muted-foreground mt-1">Requires action</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment & Graduation Trends</CardTitle>
              <CardDescription>Student enrollment and graduation over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="enrolled" stroke="#3b82f6" strokeWidth={2} name="Enrolled" />
                  <Line type="monotone" dataKey="graduated" stroke="#10b981" strokeWidth={2} name="Graduated" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Student Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Student Status Distribution</CardTitle>
              <CardDescription>Current status of all students</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment by Year Level */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment by Year Level</CardTitle>
              <CardDescription>Student distribution across year levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrollmentByYearLevel}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Program Enrollment vs Capacity */}
          <Card>
            <CardHeader>
              <CardTitle>Program Enrollment vs Capacity</CardTitle>
              <CardDescription>Current enrollment against program capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programEnrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="program" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#10b981" name="Enrolled" />
                  <Bar dataKey="capacity" fill="#e5e7eb" name="Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pending Enrollment Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Enrollment Requests</CardTitle>
              <CardDescription>Student requests requiring registrar action</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Request ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Request Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Program</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono">{request.id}</td>
                      <td className="py-3 px-4 text-sm">{request.student}</td>
                      <td className="py-3 px-4 text-sm">{request.type}</td>
                      <td className="py-3 px-4 text-sm">{request.program}</td>
                      <td className="py-3 px-4 text-sm">{request.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === "For Approval" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Document Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Document Requests</CardTitle>
            <CardDescription>Student requests for official documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Request ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Document Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Purpose</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documentRequests.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono">{doc.id}</td>
                      <td className="py-3 px-4 text-sm">{doc.student}</td>
                      <td className="py-3 px-4 text-sm">{doc.document}</td>
                      <td className="py-3 px-4 text-sm">{doc.purpose}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doc.status === "Ready for Release" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          {doc.status === "Ready for Release" ? "Release" : "Process"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Graduates with Honors */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Graduates with Honors</CardTitle>
            <CardDescription>Latest batch of graduating students with academic distinctions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Program</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">GWA</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Honors</th>
                  </tr>
                </thead>
                <tbody>
                  {recentGraduates.map((graduate) => (
                    <tr key={graduate.studentId} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono">{graduate.studentId}</td>
                      <td className="py-3 px-4 text-sm font-semibold">{graduate.name}</td>
                      <td className="py-3 px-4 text-sm">{graduate.program}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-primary">{graduate.gwa}</td>
                      <td className="py-3 px-4">
                        {graduate.honors !== "None" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {graduate.honors}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
