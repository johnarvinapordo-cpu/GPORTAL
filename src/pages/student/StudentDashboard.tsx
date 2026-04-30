import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

import {
  GraduationCap,
  BookOpen,
  DollarSign,
  Bell,
  TrendingUp
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function StudentDashboard() {
  const studentName = "Juan Dela Cruz";

  // 📊 Charts
  const gpaData = [
    { name: "Sem 1", gpa: 3.2 },
    { name: "Sem 2", gpa: 3.4 },
    { name: "Sem 3", gpa: 3.1 },
    { name: "Sem 4", gpa: 3.7 },
    { name: "Sem 5", gpa: 3.8 },
  ];

  const gradesData = [
    { subject: "Math", grade: 92 },
    { subject: "Physics", grade: 88 },
    { subject: "History", grade: 95 },
    { subject: "CS101", grade: 98 },
    { subject: "Filipino", grade: 85 },
  ];

  // 📚 Courses (IMPROVED)
  const enrolledCourses = [
    {
      code: "CS101",
      name: "Introduction to Programming",
      units: 3,
      schedule: "MWF 9:00-10:00 AM",
      instructor: "Prof. Maria Santos",
    },
    {
      code: "MATH201",
      name: "Calculus I",
      units: 3,
      schedule: "TTh 10:00-11:30 AM",
      instructor: "Prof. Jose Garcia",
    },
  ];

  // 📢 Announcements
  const announcements = [
    { title: "Midterm Examination Schedule", date: "March 15, 2026" },
    { title: "Enrollment for Summer Classes Now Open", date: "March 10, 2026" },
  ];

  // ⏰ Deadlines
  const deadlines = [
    { task: "Programming Project", date: "March 20, 2026" },
    { task: "Math Problem Set", date: "March 22, 2026" },
  ];

  return (
    <DashboardLayout userRole="student" userName={studentName}>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {studentName} 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your academic overview.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Download Report</Button>
            <Button>Enroll</Button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex justify-between flex-row">
              <CardTitle className="text-sm">GPA</CardTitle>
              <GraduationCap size={18} />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold text-primary">3.75</h2>
              <p className="text-green-500 text-sm flex items-center gap-1">
                <TrendingUp size={14}/> +0.15
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between flex-row">
              <CardTitle className="text-sm">Courses</CardTitle>
              <BookOpen size={18} />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">4</h2>
              <p className="text-muted-foreground text-sm">11 Units</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between flex-row">
              <CardTitle className="text-sm">Balance</CardTitle>
              <DollarSign size={18} />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">₱12,450</h2>
              <Badge variant="outline">Due May 15</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between flex-row">
              <CardTitle className="text-sm">Notifications</CardTitle>
              <Bell size={18} />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">4</h2>
              <p className="text-muted-foreground text-sm">2 new</p>
            </CardContent>
          </Card>
        </div>

        {/* CHARTS (KEEP THIS – IMPORTANT FOR THESIS) */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>GPA Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gpaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 4]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="gpa" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grades Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="grade" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* COURSES */}
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.map((c, i) => (
              <div key={i} className="border p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="font-semibold">{c.code}</p>
                  <Badge>{c.units} Units</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  {c.schedule} • {c.instructor}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ANNOUNCEMENTS + DEADLINES */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((a, i) => (
                <div key={i}>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-muted-foreground">{a.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {deadlines.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <p>{d.task}</p>
                    <p className="text-sm text-muted-foreground">{d.date}</p>
                  </div>
                  <Progress value={70} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}