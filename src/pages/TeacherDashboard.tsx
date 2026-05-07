import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BookOpen, ClipboardCheck, Users, Bell, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const teacherName = "Prof. Maria Santos";
  const navigate = useNavigate();

  const classes = [
    { code: "CS101", name: "Introduction to Programming", section: "A", students: 35, schedule: "MWF 9:00-10:00 AM" },
    { code: "CS201", name: "Data Structures", section: "B", students: 28, schedule: "TTh 1:00-2:30 PM" },
    { code: "CS301", name: "Software Engineering", section: "A", students: 32, schedule: "MWF 2:00-3:00 PM" },
  ];

  const pendingGrades = [
    { course: "CS101 - Section A", type: "Midterm Exam", dueDate: "March 25, 2026", submitted: 30, total: 35 },
    { course: "CS201 - Section B", type: "Final Project", dueDate: "March 28, 2026", submitted: 20, total: 28 },
  ];

  const evaluations = [
    { semester: "2nd Semester 2025-2026", responses: 85, total: 95, rating: 4.5 },
  ];

  const announcements = [
    { title: "Faculty Meeting - March 20", date: "March 15, 2026" },
    { title: "Grade Submission Deadline Reminder", date: "March 14, 2026" },
    { title: "New LMS Features Available", date: "March 10, 2026" },
  ];

  return (
    <DashboardLayout userRole="teacher" userName={teacherName}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {teacherName}!</h1>
          <p className="text-muted-foreground">Here's an overview of your classes and activities.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Classes Handled</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">3</div>
              <p className="text-xs text-muted-foreground mt-1">95 total students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
              <ClipboardCheck className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">2</div>
              <p className="text-xs text-muted-foreground mt-1">Submissions due soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Student Evaluations</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.5</div>
              <p className="text-xs text-muted-foreground mt-1">Average rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
              <p className="text-xs text-muted-foreground mt-1">2 unread messages</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Classes */}
          <Card>
            <CardHeader>
              <CardTitle>My Classes</CardTitle>
              <CardDescription>Current semester courses you're teaching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map((cls) => (
                  <div key={`${cls.code}-${cls.section}`} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{cls.code} - {cls.name}</h4>
                        <p className="text-sm text-muted-foreground">Section {cls.section}</p>
                        <p className="text-sm text-muted-foreground">{cls.schedule}</p>
                      </div>
                      <Badge variant="secondary">{cls.students} students</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate("/teacher/grades")}>
                        Enter Grades
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate("/teacher/students")}>
                        View Students
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Grade Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent" />
                Pending Grade Submissions
              </CardTitle>
              <CardDescription>Grades waiting for your input</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingGrades.map((grade, idx) => (
                  <div key={idx} className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{grade.course}</h4>
                        <p className="text-sm text-muted-foreground">{grade.type}</p>
                      </div>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                        Due: {grade.dueDate}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {grade.submitted}/{grade.total} grades submitted
                      </p>
                      <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate("/teacher/grades")}>
                        Submit Grades
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Evaluations */}
          <Card>
            <CardHeader>
              <CardTitle>Student Evaluations</CardTitle>
              <CardDescription>Feedback from your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluations.map((evaluation, idx) => (
                  <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{evaluation.semester}</h4>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-primary">{evaluation.rating}</div>
                        <div className="text-sm text-muted-foreground">/ 5.0</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {evaluation.responses}/{evaluation.total} students responded
                      </p>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm text-muted-foreground">{announcement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
