import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, Filter, Download, Eye, Mail, Phone } from "lucide-react";

export default function StudentListPage() {
  const location = useLocation();
  const userRole = location.pathname.includes("/teacher") ? "teacher" : "admin";
  const userName = userRole === "teacher" ? "Prof. Maria Santos" : "Admin User";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterYear, setFilterYear] = useState("all");

  const students = [
    { id: "2021-0001", name: "Juan Dela Cruz", program: "Computer Science", year: "4th Year", gpa: "1.75", status: "Active", email: "juan.delacruz@cmdi.edu.ph", phone: "+63 912 345 6789" },
    { id: "2021-0002", name: "Maria Garcia", program: "Computer Science", year: "4th Year", gpa: "1.50", status: "Active", email: "maria.garcia@cmdi.edu.ph", phone: "+63 912 345 6790" },
    { id: "2022-0015", name: "Jose Santos", program: "Business Admin", year: "3rd Year", gpa: "2.00", status: "Active", email: "jose.santos@cmdi.edu.ph", phone: "+63 912 345 6791" },
    { id: "2022-0023", name: "Ana Reyes", program: "Engineering", year: "3rd Year", gpa: "1.85", status: "Active", email: "ana.reyes@cmdi.edu.ph", phone: "+63 912 345 6792" },
    { id: "2023-0045", name: "Pedro Cruz", program: "Computer Science", year: "2nd Year", gpa: "2.25", status: "Active", email: "pedro.cruz@cmdi.edu.ph", phone: "+63 912 345 6793" },
    { id: "2023-0052", name: "Carmen Torres", program: "Education", year: "2nd Year", gpa: "1.90", status: "Active", email: "carmen.torres@cmdi.edu.ph", phone: "+63 912 345 6794" },
    { id: "2024-0078", name: "Roberto Silva", program: "Business Admin", year: "1st Year", gpa: "2.50", status: "Active", email: "roberto.silva@cmdi.edu.ph", phone: "+63 912 345 6795" },
    { id: "2024-0089", name: "Linda Ramos", program: "Engineering", year: "1st Year", gpa: "1.65", status: "Active", email: "linda.ramos@cmdi.edu.ph", phone: "+63 912 345 6796" },
    { id: "2023-0034", name: "Miguel Santos", program: "Computer Science", year: "2nd Year", gpa: "2.10", status: "LOA", email: "miguel.santos@cmdi.edu.ph", phone: "+63 912 345 6797" },
    { id: "2022-0019", name: "Sofia Cruz", program: "Education", year: "3rd Year", gpa: "1.95", status: "Active", email: "sofia.cruz@cmdi.edu.ph", phone: "+63 912 345 6798" },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = filterProgram === "all" || student.program === filterProgram;
    const matchesYear = filterYear === "all" || student.year === filterYear;
    return matchesSearch && matchesProgram && matchesYear;
  });

  const getStatusColor = (status: string) => {
    if (status === "Active") return "bg-green-100 text-green-700 border-green-200";
    if (status === "LOA") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getGPAColor = (gpa: string) => {
    const grade = parseFloat(gpa);
    if (grade <= 1.5) return "text-green-600";
    if (grade <= 2.5) return "text-blue-600";
    if (grade <= 3.0) return "text-accent";
    return "text-destructive";
  };

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">View and manage student records</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{students.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {students.filter(s => s.status === "Active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Average GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {(students.reduce((acc, s) => acc + parseFloat(s.gpa), 0) / students.length).toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">
                {students.filter(s => s.status === "LOA").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search and Filter Students</CardTitle>
            <CardDescription>Find students by name, ID, or filter by program and year level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, student ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={filterProgram} onValueChange={setFilterProgram}>
                  <SelectTrigger>
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
              </div>
              <div className="w-full md:w-40">
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student List</CardTitle>
                <CardDescription>
                  {filteredStudents.length} student(s) found
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Year Level</TableHead>
                    <TableHead className="text-center">GPA</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No students found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.program}</TableCell>
                        <TableCell>{student.year}</TableCell>
                        <TableCell className={`text-center font-semibold ${getGPAColor(student.gpa)}`}>
                          {student.gpa}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-xs">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              <span className="truncate max-w-[180px]">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              <span>{student.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
