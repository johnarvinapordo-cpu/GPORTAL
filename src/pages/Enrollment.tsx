import { useState } from "react";
import { useLocation } from "react-router";
import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select } from "../components/ui/select";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";

const initialCourses = [
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

export default function EnrollmentPage() {
  const location = useLocation();
  const userRole = location.pathname.includes("/student") ? "student" : 
                   location.pathname.includes("/teacher") ? "teacher" : "admin";
  const userName = userRole === "student" ? "Juan Dela Cruz" : 
                   userRole === "teacher" ? "Prof. Maria Santos" : "Admin User";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [courses, setCourses] = useState(initialCourses);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = filterProgram === "all" || course.program === filterProgram;
    return matchesSearch && matchesProgram;
  });

  const handleEnroll = async (courseCode: string) => {
    try {
      // Get current user from localStorage
      const user = JSON.parse(localStorage.getItem("cmdi_user") || "{}");
      if (!user.user_id) {
        toast.error("Please log in to enroll in courses");
        return;
      }

      // Find course from course code
      const course = courses.find(c => c.code === courseCode);
      if (!course) {
        toast.error("Course not found");
        return;
      }

      if (course.slots === 0) {
        toast.error("No slots available for this course");
        return;
      }

      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("cmdi_token")}`,
        },
        body: JSON.stringify({
          studentId: user.user_id,
          courseCode: courseCode,
        }),
      });

      if (response.ok) {
        toast.success(`Successfully enrolled in ${courseCode}!`);
        // Update the courses list to reflect the enrollment
        setCourses(prevCourses =>
          prevCourses.map(c =>
            c.code === courseCode ? { ...c, slots: Math.max(0, c.slots - 1) } : c
          )
        );
        // Track enrolled courses
        setEnrolledCourses(prev => [...prev, courseCode]);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to enroll in course");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Enrollment</h1>
          <p className="text-muted-foreground mt-1">Browse and enroll in available courses for this semester</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Available Courses</CardDescription>
              <CardTitle className="text-3xl">{courses.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Units</CardDescription>
              <CardTitle className="text-3xl">{courses.reduce((sum, c) => sum + c.units, 0)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Open Slots</CardDescription>
              <CardTitle className="text-3xl">{courses.reduce((sum, c) => sum + c.slots, 0)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Programs</CardDescription>
              <CardTitle className="text-3xl">5</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search Courses</CardTitle>
            <CardDescription>Find and enroll in available courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by course code or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                className="w-[200px]"
                value={filterProgram}
                onChange={(event) => setFilterProgram(event.target.value)}
              >
                <option value="all">All Programs</option>
                <option value="CS">Computer Science</option>
                <option value="MATH">Mathematics</option>
                <option value="ENG">English</option>
                <option value="BUS">Business</option>
                <option value="PE">Physical Education</option>
              </Select>
            </div>

            {/* Course Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Slots</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.code}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.units}</TableCell>
                    <TableCell>{course.schedule}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>
                      <Badge variant={course.slots > 0 ? "success" : "destructive"}>
                        {course.slots} slots
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        onClick={() => handleEnroll(course.code)}
                        disabled={course.slots === 0 || enrolledCourses.includes(course.code)}
                        variant={enrolledCourses.includes(course.code) ? "secondary" : "default"}
                      >
                        {enrolledCourses.includes(course.code) ? "Enrolled" : "Enroll"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredCourses.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No courses found matching your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
