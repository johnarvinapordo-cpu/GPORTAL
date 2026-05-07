import { useState } from "react";
import { useLocation } from "react-router";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";

export default function EnrollmentPage() {
  const location = useLocation();
  const userRole = location.pathname.includes("/student") ? "student" : 
                   location.pathname.includes("/teacher") ? "teacher" : "admin";
  const userName = userRole === "student" ? "Juan Dela Cruz" : 
                   userRole === "teacher" ? "Prof. Maria Santos" : "Admin User";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");

  const courses = [
    { code: "CS101", title: "Introduction to Programming", units: 3, schedule: "MWF 9:00-10:00 AM", instructor: "Prof. Maria Santos", slots: 5, program: "CS" },
    { code: "CS201", title: "Data Structures and Algorithms", units: 3, schedule: "TTh 10:00-11:30 AM", instructor: "Prof. Jose Garcia", slots: 8, program: "CS" },
    { code: "CS301", title: "Software Engineering", units: 3, schedule: "MWF 2:00-3:00 PM", instructor: "Prof. Ana Reyes", slots: 2, program: "CS" },
    { code: "MATH201", title: "Calculus I", units: 3, schedule: "TTh 1:00-2:30 PM", instructor: "Prof. Roberto Cruz", slots: 10, program: "MATH" },
    { code: "MATH202", title: "Calculus II", units: 3, schedule: "MWF 10:00-11:00 AM", instructor: "Prof. Linda Torres", slots: 12, program: "MATH" },
    { code: "ENG102", title: "English Composition", units: 3, schedule: "MWF 1:00-2:00 PM", instructor: "Prof. Carmen Silva", slots: 0, program: "ENG" },
    { code: "ENG201", title: "Literature and Society", units: 3, schedule: "TTh 3:00-4:30 PM", instructor: "Prof. Pedro Ramos", slots: 6, program: "ENG" },
    { code: "BUS101", title: "Principles of Management", units: 3, schedule: "MWF 11:00-12:00 PM", instructor: "Prof. Miguel Santos", slots: 15, program: "BUS" },
    { code: "BUS201", title: "Marketing Management", units: 3, schedule: "TTh 8:00-9:30 AM", instructor: "Prof. Sofia Cruz", slots: 7, program: "BUS" },
    { code: "PE101", title: "Physical Education", units: 2, schedule: "TTh 3:00-4:30 PM", instructor: "Coach Roberto Cruz", slots: 20, program: "PE" },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = filterProgram === "all" || course.program === filterProgram;
    return matchesSearch && matchesProgram;
  });

  const handleEnroll = (courseCode: string, courseTitle: string) => {
    toast.success(`Successfully enrolled in ${courseCode} - ${courseTitle}`);
  };

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Enrollment</h1>
          <p className="text-muted-foreground">Browse and enroll in available courses</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search and Filter Courses</CardTitle>
            <CardDescription>Find the perfect courses for your academic journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by course code, title, or instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={filterProgram} onValueChange={setFilterProgram}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="CS">Computer Science</SelectItem>
                    <SelectItem value="MATH">Mathematics</SelectItem>
                    <SelectItem value="ENG">English</SelectItem>
                    <SelectItem value="BUS">Business</SelectItem>
                    <SelectItem value="PE">Physical Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Table */}
        <Card>
          <CardHeader>
            <CardTitle>Available Courses</CardTitle>
            <CardDescription>
              {filteredCourses.length} course(s) available for enrollment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead className="text-center">Units</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead className="text-center">Slots Available</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No courses found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCourses.map((course) => (
                      <TableRow key={course.code}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell className="text-center">{course.units}</TableCell>
                        <TableCell className="text-sm">{course.schedule}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={course.slots === 0 ? "destructive" : course.slots < 5 ? "outline" : "secondary"}
                            className={course.slots < 5 && course.slots > 0 ? "bg-accent/10 text-accent border-accent" : ""}
                          >
                            {course.slots === 0 ? "Full" : `${course.slots} left`}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            disabled={course.slots === 0}
                            onClick={() => handleEnroll(course.code, course.title)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            {course.slots === 0 ? "Full" : "Enroll"}
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

        {/* Enrollment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Units Selected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Courses Enrolled</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Enrollment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">Not Finalized</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
