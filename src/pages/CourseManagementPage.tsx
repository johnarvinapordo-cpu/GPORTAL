import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export default function CourseManagementPage() {
  const location = useLocation();
  const userRole = location.pathname.includes("/teacher")
    ? "teacher"
    : "admin";
  const userName =
    userRole === "teacher"
      ? "Prof. Maria Santos"
      : "Admin User";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] =
    useState("all");
  const [filterSemester, setFilterSemester] = useState("2nd");

  const courses = [
    {
      code: "CS101",
      title: "Introduction to Programming",
      department: "Computer Science",
      units: 3,
      section: "A",
      schedule: "MWF 9:00-10:00 AM",
      instructor: "Prof. Maria Santos",
      enrolled: 35,
      capacity: 40,
      room: "Lab 101",
      semester: "2nd",
    },
    {
      code: "CS201",
      title: "Data Structures and Algorithms",
      department: "Computer Science",
      units: 3,
      section: "B",
      schedule: "TTh 10:00-11:30 AM",
      instructor: "Prof. Jose Garcia",
      enrolled: 28,
      capacity: 35,
      room: "Lab 102",
      semester: "2nd",
    },
    {
      code: "CS301",
      title: "Software Engineering",
      department: "Computer Science",
      units: 3,
      section: "A",
      schedule: "MWF 2:00-3:00 PM",
      instructor: "Prof. Maria Santos",
      enrolled: 32,
      capacity: 35,
      room: "Lab 103",
      semester: "2nd",
    },
    {
      code: "MATH201",
      title: "Calculus I",
      department: "Mathematics",
      units: 3,
      section: "A",
      schedule: "TTh 1:00-2:30 PM",
      instructor: "Prof. Roberto Cruz",
      enrolled: 42,
      capacity: 45,
      room: "Room 201",
      semester: "2nd",
    },
    {
      code: "MATH202",
      title: "Calculus II",
      department: "Mathematics",
      units: 3,
      section: "B",
      schedule: "MWF 10:00-11:00 AM",
      instructor: "Prof. Linda Torres",
      enrolled: 38,
      capacity: 45,
      room: "Room 202",
      semester: "2nd",
    },
    {
      code: "ENG102",
      title: "English Composition",
      department: "English",
      units: 3,
      section: "A",
      schedule: "MWF 1:00-2:00 PM",
      instructor: "Prof. Carmen Silva",
      enrolled: 40,
      capacity: 40,
      room: "Room 301",
      semester: "2nd",
    },
    {
      code: "BUS101",
      title: "Principles of Management",
      department: "Business",
      units: 3,
      section: "A",
      schedule: "MWF 11:00-12:00 PM",
      instructor: "Prof. Miguel Santos",
      enrolled: 35,
      capacity: 50,
      room: "Room 401",
      semester: "2nd",
    },
    {
      code: "BUS201",
      title: "Marketing Management",
      department: "Business",
      units: 3,
      section: "B",
      schedule: "TTh 8:00-9:30 AM",
      instructor: "Prof. Sofia Cruz",
      enrolled: 43,
      capacity: 50,
      room: "Room 402",
      semester: "2nd",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.instructor
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" ||
      course.department === filterDepartment;
    const matchesSemester =
      filterSemester === "all" ||
      course.semester === filterSemester;
    return (
      matchesSearch && matchesDepartment && matchesSemester
    );
  });

  const getCapacityStatus = (
    enrolled: number,
    capacity: number,
  ) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 100)
      return {
        label: "Full",
        color: "bg-red-100 text-red-700 border-red-200",
      };
    if (percentage >= 80)
      return {
        label: "Almost Full",
        color:
          "bg-yellow-100 text-yellow-700 border-yellow-200",
      };
    return {
      label: "Available",
      color: "bg-green-100 text-green-700 border-green-200",
    };
  };

  const handleAddCourse = () => {
    toast.info(
      "Add Course functionality would open a form dialog",
    );
  };

  const handleEditCourse = (courseCode: string) => {
    toast.info(`Editing course ${courseCode}`);
  };

  const handleDeleteCourse = (courseCode: string) => {
    toast.success(`Course ${courseCode} deleted successfully`);
  };

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Course Management
            </h1>
            <p className="text-muted-foreground">
              Manage courses, schedules, and enrollments
            </p>
          </div>
          {userRole === "admin" && (
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleAddCourse}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Course
            </Button>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {courses.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Total Enrolled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {courses.reduce(
                  (acc, c) => acc + c.enrolled,
                  0,
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Total Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {courses.reduce(
                  (acc, c) => acc + c.capacity,
                  0,
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Utilization Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {(
                  (courses.reduce(
                    (acc, c) => acc + c.enrolled,
                    0,
                  ) /
                    courses.reduce(
                      (acc, c) => acc + c.capacity,
                      0,
                    )) *
                  100
                ).toFixed(1)}
                %
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search and Filter Courses</CardTitle>
            <CardDescription>
              Find courses by code, title, or instructor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by course code, title, or instructor..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-48">
                <Select
                  value={filterDepartment}
                  onValueChange={setFilterDepartment}
                >
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      All Departments
                    </SelectItem>
                    <SelectItem value="Computer Science">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="Mathematics">
                      Mathematics
                    </SelectItem>
                    <SelectItem value="English">
                      English
                    </SelectItem>
                    <SelectItem value="Business">
                      Business
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Select
                  value={filterSemester}
                  onValueChange={setFilterSemester}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      All Semesters
                    </SelectItem>
                    <SelectItem value="1st">
                      1st Semester
                    </SelectItem>
                    <SelectItem value="2nd">
                      2nd Semester
                    </SelectItem>
                    <SelectItem value="Summer">
                      Summer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Table */}
        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
            <CardDescription>
              {filteredCourses.length} course(s) found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-center">
                      Units
                    </TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead className="text-center">
                      Enrollment
                    </TableHead>
                    <TableHead className="text-center">
                      Status
                    </TableHead>
                    {userRole === "admin" && (
                      <TableHead className="text-center">
                        Actions
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No courses found matching your search
                        criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCourses.map((course) => {
                      const status = getCapacityStatus(
                        course.enrolled,
                        course.capacity,
                      );
                      return (
                        <TableRow
                          key={`${course.code}-${course.section}`}
                        >
                          <TableCell className="font-medium">
                            {course.code}
                          </TableCell>
                          <TableCell className="font-medium">
                            {course.title}
                          </TableCell>
                          <TableCell>
                            {course.department}
                          </TableCell>
                          <TableCell className="text-center">
                            {course.units}
                          </TableCell>
                          <TableCell className="text-center">
                            {course.section}
                          </TableCell>
                          <TableCell className="text-sm">
                            {course.schedule}
                          </TableCell>
                          <TableCell>{course.room}</TableCell>
                          <TableCell>
                            {course.instructor}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">
                                {course.enrolled}/
                                {course.capacity}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="secondary"
                              className={status.color}
                            >
                              {status.label}
                            </Badge>
                          </TableCell>
                          {userRole === "admin" && (
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleEditCourse(
                                      course.code,
                                    )
                                  }
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleDeleteCourse(
                                      course.code,
                                    )
                                  }
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
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