import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import { Badge } from "../../components/ui/badge";
import { Bell, BookOpen, Calendar, DollarSign, GraduationCap, TrendingUp } from "lucide-react";
import { apiRequest, getStoredUser } from "../../lib/api";

export default function StudentDashboard() {
  const storedUser = getStoredUser();
  const [dashboardData, setDashboardData] = useState(null);
  const studentName = dashboardData?.user?.name || storedUser?.name || "Juan Dela Cruz";

  const fallbackCourses = [
    { code: "CS101", name: "Introduction to Programming", units: 3, schedule: "MWF 9:00-10:00 AM", instructor: "Prof. Maria Santos" },
    { code: "MATH201", name: "Calculus I", units: 3, schedule: "TTh 10:00-11:30 AM", instructor: "Prof. Jose Garcia" },
    { code: "ENG102", name: "English Composition", units: 3, schedule: "MWF 1:00-2:00 PM", instructor: "Prof. Ana Reyes" },
    { code: "PE101", name: "Physical Education", units: 2, schedule: "TTh 3:00-4:30 PM", instructor: "Coach Roberto Cruz" },
  ];
  const enrolledCourses = dashboardData?.courses?.length
    ? dashboardData.courses.map((course) => ({
        code: course.course_code,
        name: course.title,
        units: course.units,
        schedule: course.schedule,
        instructor: course.instructor_name || "TBA",
      }))
    : fallbackCourses;
  const payments = dashboardData?.payments ?? [];
  const totalBalance = payments.reduce((sum, payment) => sum + Number(payment.total_amount || 0) - Number(payment.paid_amount || 0), 0);
  const gpa = dashboardData?.student?.gpa || "3.75";

  useEffect(() => {
    if (!storedUser?.user_id) return;
    apiRequest(`/api/student/${storedUser.user_id}`)
      .then(setDashboardData)
      .catch(() => {});
  }, [storedUser?.user_id]);

  const announcements = [
    { title: "Midterm Examination Schedule", date: "March 15, 2026", type: "exam" },
    { title: "Enrollment for Summer Classes Now Open", date: "March 10, 2026", type: "enrollment" },
    { title: "Library Operating Hours Update", date: "March 8, 2026", type: "general" },
  ];

  const deadlines = [
    "CS101 - Programming Project Submission",
    "MATH201 - Problem Set 5",
    "ENG102 - Essay Draft",
  ];

  return (
    <DashboardLayout userRole="student" userName={studentName}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {studentName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your academic journey today.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Current GPA" value={gpa} helper="+0.15 from last semester" icon={<GraduationCap />} />
          <StatCard title="Enrolled Courses" value={enrolledCourses.length} helper={`${enrolledCourses.reduce((sum, course) => sum + Number(course.units || 0), 0)} total units`} icon={<BookOpen />} tone="default" />
          <StatCard title="Tuition Balance" value={`PHP ${totalBalance.toLocaleString()}`} helper={totalBalance === 0 ? "Fully paid" : "Payment pending"} icon={<DollarSign />} tone="accent" />
          <StatCard title="Notifications" value="5" helper="3 unread messages" icon={<Bell />} tone="default" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Enrolled Courses</h2>
              <p className="text-sm text-muted-foreground">Current semester courses</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {enrolledCourses.map((course) => (
                <div key={course.code} className="border-l-4 border-primary py-2 pl-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{course.code} - {course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">{course.schedule}</p>
                    </div>
                    <Badge variant="secondary">{course.units} units</Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Recent Announcements</h2>
              <p className="text-sm text-muted-foreground">Stay updated with the latest news</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {announcements.map((announcement) => (
                <div key={announcement.title} className="flex items-start gap-3 border-b pb-3 last:border-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                    <Bell className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground">{announcement.date}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">{announcement.type}</Badge>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Calendar className="h-5 w-5" />
              Upcoming Deadlines
            </h2>
            <p className="text-sm text-muted-foreground">Don't miss these important dates</p>
          </div>
          <div className="space-y-3 p-6 pt-0">
            {deadlines.map((task, index) => (
              <div key={task} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <h3 className="font-medium">{task}</h3>
                <Badge variant="outline" className="border-accent bg-accent/10 text-accent">
                  March {20 + index * 2}, 2026
                </Badge>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
