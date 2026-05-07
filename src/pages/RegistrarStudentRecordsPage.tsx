import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Search, Filter, Download, FileText, GraduationCap, UserCheck, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function RegistrarStudentRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const studentRecords = [
    {
      studentId: "2024-001234",
      name: "Juan Dela Cruz",
      program: "Computer Science",
      yearLevel: "3rd Year",
      status: "Enrolled",
      gwa: "1.75",
      unitsCompleted: 102,
      dateEnrolled: "2024-08-15"
    },
    {
      studentId: "2024-001235",
      name: "Maria Santos",
      program: "Business Admin",
      yearLevel: "2nd Year",
      status: "Enrolled",
      gwa: "2.10",
      unitsCompleted: 68,
      dateEnrolled: "2024-08-16"
    },
    {
      studentId: "2024-001236",
      name: "Pedro Reyes",
      program: "Engineering",
      yearLevel: "4th Year",
      status: "Graduating",
      gwa: "1.45",
      unitsCompleted: 148,
      dateEnrolled: "2024-08-14"
    },
    {
      studentId: "2023-005678",
      name: "Ana Garcia",
      program: "Education",
      yearLevel: "1st Year",
      status: "On Leave",
      gwa: "2.35",
      unitsCompleted: 18,
      dateEnrolled: "2024-08-20"
    },
    {
      studentId: "2024-001238",
      name: "Jose Ramos",
      program: "Computer Science",
      yearLevel: "2nd Year",
      status: "Enrolled",
      gwa: "1.95",
      unitsCompleted: 64,
      dateEnrolled: "2024-08-17"
    },
    {
      studentId: "2022-003456",
      name: "Carlos Martinez",
      program: "Business Admin",
      yearLevel: "3rd Year",
      status: "Withdrawn",
      gwa: "2.85",
      unitsCompleted: 90,
      dateEnrolled: "2024-08-12"
    },
  ];

  const documentRequests = [
    {
      id: "DOC-2026-0145",
      studentId: "2024-001234",
      studentName: "Juan Dela Cruz",
      documentType: "Transcript of Records",
      purpose: "Job Application",
      dateRequested: "2026-05-07",
      status: "Processing"
    },
    {
      id: "DOC-2026-0146",
      studentId: "2024-001235",
      studentName: "Maria Santos",
      documentType: "Certificate of Enrollment",
      purpose: "Scholarship",
      dateRequested: "2026-05-06",
      status: "Ready for Release"
    },
    {
      id: "DOC-2026-0147",
      studentId: "2024-001236",
      studentName: "Pedro Reyes",
      documentType: "Certificate of Grades",
      purpose: "Transfer",
      dateRequested: "2026-05-05",
      status: "Ready for Release"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enrolled":
        return "bg-green-100 text-green-800";
      case "Graduating":
        return "bg-blue-100 text-blue-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Withdrawn":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRecords = studentRecords.filter(record => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = filterProgram === "all" || record.program === filterProgram;
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  return (
    <DashboardLayout userRole="registrar" userName="Registrar Officer">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Records</h1>
          <p className="text-muted-foreground">Manage and view student academic records</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <UserCheck className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1,400</div>
              <p className="text-xs text-muted-foreground mt-1">All active records</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Currently Enrolled</CardTitle>
              <GraduationCap className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">1,315</div>
              <p className="text-xs text-muted-foreground mt-1">Active this semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Graduating</CardTitle>
              <GraduationCap className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">320</div>
              <p className="text-xs text-muted-foreground mt-1">Expected this year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Document Requests</CardTitle>
              <FileText className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">23</div>
              <p className="text-xs text-muted-foreground mt-1">Pending processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList>
            <TabsTrigger value="records">Student Records</TabsTrigger>
            <TabsTrigger value="documents">Document Requests</TabsTrigger>
          </TabsList>

          {/* Student Records Tab */}
          <TabsContent value="records" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Student Records</CardTitle>
                  <CardDescription>Search and manage student academic records</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Records
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or student ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterProgram} onValueChange={setFilterProgram}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Programs</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Business Admin">Business Admin</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Enrolled">Enrolled</SelectItem>
                        <SelectItem value="Graduating">Graduating</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Program</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Year Level</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">GWA</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Units Completed</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date Enrolled</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.map((record) => (
                        <tr key={record.studentId} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm font-mono">{record.studentId}</td>
                          <td className="py-3 px-4 text-sm font-semibold">{record.name}</td>
                          <td className="py-3 px-4 text-sm">{record.program}</td>
                          <td className="py-3 px-4 text-sm">{record.yearLevel}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-primary">{record.gwa}</td>
                          <td className="py-3 px-4 text-sm">{record.unitsCompleted}</td>
                          <td className="py-3 px-4 text-sm">{record.dateEnrolled}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredRecords.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No student records found matching your criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Requests Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Requests</CardTitle>
                <CardDescription>Manage student document requests and releases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Request ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Document Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Purpose</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date Requested</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentRequests.map((request) => (
                        <tr key={request.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm font-mono">{request.id}</td>
                          <td className="py-3 px-4 text-sm font-mono">{request.studentId}</td>
                          <td className="py-3 px-4 text-sm">{request.studentName}</td>
                          <td className="py-3 px-4 text-sm">{request.documentType}</td>
                          <td className="py-3 px-4 text-sm">{request.purpose}</td>
                          <td className="py-3 px-4 text-sm">{request.dateRequested}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              request.status === "Ready for Release" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm">
                              {request.status === "Ready for Release" ? "Release" : "Process"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
