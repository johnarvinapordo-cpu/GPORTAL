import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Save, Download } from "lucide-react";
import { toast } from "sonner";

export default function GradesPage() {
  const location = useLocation();
  const userRole = location.pathname.includes("/student") ? "student" : 
                   location.pathname.includes("/teacher") ? "teacher" : "admin";
  const userName = userRole === "student" ? "Juan Dela Cruz" : 
                   userRole === "teacher" ? "Prof. Maria Santos" : "Admin User";

  const [selectedCourse, setSelectedCourse] = useState("CS101");

  // Student view data
  const studentGrades = [
    { course: "CS101", title: "Introduction to Programming", midterm: "1.75", final: "1.50", gpa: "1.62", remarks: "Passed" },
    { course: "MATH201", title: "Calculus I", midterm: "2.00", final: "2.25", gpa: "2.12", remarks: "Passed" },
    { course: "ENG102", title: "English Composition", midterm: "1.50", final: "1.75", gpa: "1.62", remarks: "Passed" },
    { course: "PE101", title: "Physical Education", midterm: "1.25", final: "1.25", gpa: "1.25", remarks: "Passed" },
  ];

  // Teacher/Admin view data
  const courseStudents = [
    { id: "2021-0001", name: "Juan Dela Cruz", midterm: "1.75", final: "1.50", gpa: "1.62" },
    { id: "2021-0002", name: "Maria Garcia", midterm: "1.50", final: "1.25", gpa: "1.38" },
    { id: "2021-0003", name: "Jose Santos", midterm: "2.00", final: "2.25", gpa: "2.12" },
    { id: "2021-0004", name: "Ana Reyes", midterm: "1.25", final: "1.50", gpa: "1.38" },
    { id: "2021-0005", name: "Pedro Cruz", midterm: "2.50", final: "2.00", gpa: "2.25" },
    { id: "2021-0006", name: "Carmen Torres", midterm: "1.75", final: "1.75", gpa: "1.75" },
    { id: "2021-0007", name: "Roberto Silva", midterm: "2.25", final: "2.50", gpa: "2.38" },
    { id: "2021-0008", name: "Linda Ramos", midterm: "1.00", final: "1.00", gpa: "1.00" },
  ];

  const courses = [
    { code: "CS101", name: "Introduction to Programming - Section A" },
    { code: "CS201", name: "Data Structures - Section B" },
    { code: "CS301", name: "Software Engineering - Section A" },
  ];

  const handleSaveGrades = () => {
    toast.success("Grades saved successfully!");
  };

  const handleSubmitGrades = () => {
    toast.success("Grades submitted for approval!");
  };

  const calculateGPA = (grades: typeof studentGrades) => {
    const sum = grades.reduce((acc, grade) => acc + parseFloat(grade.gpa), 0);
    return (sum / grades.length).toFixed(2);
  };

  const getGradeColor = (gpa: string) => {
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
          <h1 className="text-3xl font-bold text-foreground">
            {userRole === "student" ? "My Grades" : "Grade Management"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "student" 
              ? "View your academic performance and grades" 
              : "Enter and manage student grades"}
          </p>
        </div>

        {userRole === "student" ? (
          // Student View
          <>
            {/* GPA Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Current Semester GPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{calculateGPA(studentGrades)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Enrolled Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{studentGrades.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Units</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">11</p>
                </CardContent>
              </Card>
            </div>

            {/* Grades Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Grade Summary</CardTitle>
                    <CardDescription>2nd Semester, AY 2025-2026</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Title</TableHead>
                        <TableHead className="text-center">Midterm</TableHead>
                        <TableHead className="text-center">Final</TableHead>
                        <TableHead className="text-center">GPA</TableHead>
                        <TableHead className="text-center">Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentGrades.map((grade) => (
                        <TableRow key={grade.course}>
                          <TableCell className="font-medium">{grade.course}</TableCell>
                          <TableCell>{grade.title}</TableCell>
                          <TableCell className="text-center">{grade.midterm}</TableCell>
                          <TableCell className="text-center">{grade.final}</TableCell>
                          <TableCell className={`text-center font-semibold ${getGradeColor(grade.gpa)}`}>
                            {grade.gpa}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={grade.remarks === "Passed" ? "secondary" : "destructive"}>
                              {grade.remarks}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          // Teacher/Admin View
          <>
            {/* Course Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Course</CardTitle>
                <CardDescription>Choose a course to enter or edit grades</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.code} value={course.code}>
                        {course.code} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Grade Entry Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Grades - {selectedCourse}</CardTitle>
                    <CardDescription>{courseStudents.length} students enrolled</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSaveGrades}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleSubmitGrades}>
                      Submit Grades
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead className="text-center">Midterm Grade</TableHead>
                        <TableHead className="text-center">Final Grade</TableHead>
                        <TableHead className="text-center">GPA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courseStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              step="0.25"
                              min="1.00"
                              max="5.00"
                              defaultValue={student.midterm}
                              className="w-24 text-center mx-auto"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              step="0.25"
                              min="1.00"
                              max="5.00"
                              defaultValue={student.final}
                              className="w-24 text-center mx-auto"
                            />
                          </TableCell>
                          <TableCell className={`text-center font-semibold ${getGradeColor(student.gpa)}`}>
                            {student.gpa}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Grade Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Class Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">1.86</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Passing Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Dean's Listers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">3</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                    Draft
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
