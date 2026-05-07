import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { GraduationCap, BookOpen, DollarSign, Bell, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "../components/ui/progress";

export default function StudentDashboard() {
  const studentName = "Juan Dela Cruz";

  const enrolledCourses = [
    { code: "CS101", name: "Introduction to Programming", units: 3, schedule: "MWF 9:00-10:00 AM", instructor: "Prof. Maria Santos" },
    { code: "MATH201", name: "Calculus I", units: 3, schedule: "TTh 10:00-11:30 AM", instructor: "Prof. Jose Garcia" },
    { code: "ENG102", name: "English Composition", units: 3, schedule: "MWF 1:00-2:00 PM", instructor: "Prof. Ana Reyes" },
    { code: "PE101", name: "Physical Education", units: 2, schedule: "TTh 3:00-4:30 PM", instructor: "Coach Roberto Cruz" },
  ];

  const announcements = [
    { title: "Midterm Examination Schedule", date: "March 15, 2026", type: "exam" },
    { title: "Enrollment for Summer Classes Now Open", date: "March 10, 2026", type: "enrollment" },
    { title: "Library Operating Hours Update", date: "March 8, 2026", type: "general" },
  ];

  const upcomingDeadlines = [
    { task: "CS101 - Programming Project Submission", date: "March 20, 2026" },
    { task: "MATH201 - Problem Set 5", date: "March 22, 2026" },
    { task: "ENG102 - Essay Draft", date: "March 25, 2026" },
  ];

  return (
    <DashboardLayout userRole="student" userName={studentName}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {studentName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your academic journey today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">3.75</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+0.15 from last semester</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
              <p className="text-xs text-muted-foreground mt-1">11 total units</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tuition Balance</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">₱15,000</div>
              <Progress value={60} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">60% paid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">3 unread messages</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrolled Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>Current semester courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.code} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{course.code} - {course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        <p className="text-sm text-muted-foreground">{course.schedule}</p>
                      </div>
                      <Badge variant="secondary">{course.units} units</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Stay updated with the latest news</CardDescription>
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
                    <Badge variant="outline" className="capitalize">{announcement.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Don't miss these important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{deadline.task}</h4>
                  </div>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                    {deadline.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
