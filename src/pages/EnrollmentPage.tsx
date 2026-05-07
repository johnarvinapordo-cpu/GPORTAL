import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { apiRequest, getStoredUser } from "../lib/api";


export default function EnrollmentPage() {
  const location = useLocation();
  const userRole = location.pathname.includes("/student") ? "student" : 
                   location.pathname.includes("/teacher") ? "teacher" : "admin";
  const userName = userRole === "student" ? "Juan Dela Cruz" : 
                   userRole === "teacher" ? "Prof. Maria Santos" : "Admin User";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");

  const courses = [
  { id: 1, code: "CS101", title: "Introduction to Programming", units: 3, schedule: "MWF 9:00-10:00 AM", instructor: "Prof. Maria Santos", slots: 5, program: "CS" },
  { id: 2, code: "CS201", title: "Data Structures and Algorithms", units: 3, schedule: "TTh 10:00-11:30 AM", instructor: "Prof. Jose Garcia", slots: 8, program: "CS" },
  { id: 3, code: "CS301", title: "Software Engineering", units: 3, schedule: "MWF 2:00-3:00 PM", instructor: "Prof. Ana Reyes", slots: 2, program: "CS" },
  { id: 4, code: "MATH201", title: "Calculus I", units: 3, schedule: "TTh 1:00-2:30 PM", instructor: "Prof. Roberto Cruz", slots: 10, program: "MATH" },
];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProgram =
      filterProgram === "all" || course.program === filterProgram;

    return matchesSearch && matchesProgram;
  });

  // ✅ FIXED ENROLL FUNCTION (FULL WORKING)
const handleEnroll = async (courseId: number, courseTitle: string) => {
  try {
    const user = getStoredUser();

    if (!user?.user_id) {
      toast.error("User not found. Please login again.");
      return;
    }

    await apiRequest("/api/enroll", {
      method: "POST",
      body: JSON.stringify({
        studentId: user.user_id,
        courseId,
      }),
    });

    toast.success(`Enrollment submitted for ${courseTitle}`);
  } catch (err: any) {
    toast.error(err.message);
  }
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

        {/* Table */}
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
                    <TableHead className="text-center">Slots</TableHead>
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
                          <Badge variant={course.slots === 0 ? "destructive" : "secondary"}>
                            {course.slots === 0 ? "Full" : `${course.slots} left`}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            disabled={course.slots === 0}
                            onClick={() => handleEnroll(course.id, course.title)}
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

      </div>
    </DashboardLayout>
  );
}