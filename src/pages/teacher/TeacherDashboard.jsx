import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import { Badge } from "../../components/ui/badge";
import { AlertCircle, Bell, BookOpen, ClipboardCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest, getStoredUser } from "../../lib/api";

export default function TeacherDashboard() {
  const teacherName = "Prof. Maria Santos";
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const [apiData, setApiData] = useState(null);

  const fallbackClasses = [
    { code: "CS101", name: "Introduction to Programming", section: "A", students: 35, schedule: "MWF 9:00-10:00 AM" },
    { code: "CS201", name: "Data Structures", section: "B", students: 28, schedule: "TTh 1:00-2:30 PM" },
    { code: "CS301", name: "Software Engineering", section: "A", students: 32, schedule: "MWF 2:00-3:00 PM" },
  ];
  const classes = apiData?.courses?.length
    ? apiData.courses.map((course) => ({
        code: course.course_code,
        name: course.title,
        section: course.section || "A",
        students: course.enrolled || 0,
        schedule: course.schedule,
      }))
    : fallbackClasses;

  useEffect(() => {
    if (!storedUser?.user_id) return;
    apiRequest(`/api/teacher/${storedUser.user_id}`).then(setApiData).catch(() => {});
  }, [storedUser?.user_id]);

  const pendingGrades = [
    { course: "CS101 - Section A", type: "Midterm Exam", dueDate: "March 25, 2026", submitted: 30, total: 35 },
    { course: "CS201 - Section B", type: "Final Project", dueDate: "March 28, 2026", submitted: 20, total: 28 },
  ];

  const announcements = [
    { title: "Faculty Meeting - March 20", date: "March 15, 2026" },
    { title: "Grade Submission Deadline Reminder", date: "March 14, 2026" },
    { title: "New LMS Features Available", date: "March 10, 2026" },
  ];

  const evaluations = [
    { semester: "2nd Semester 2025-2026", responses: 85, total: 95, rating: 4.5 },
  ];

  return (
    <DashboardLayout userRole="teacher" userName={teacherName}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {teacherName}!</h1>
          <p className="text-muted-foreground">Here's an overview of your classes and activities.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Classes Handled" value={classes.length} helper={`${classes.reduce((sum, item) => sum + Number(item.students || 0), 0)} total students`} icon={<BookOpen />} />
          <StatCard title="Pending Grades" value="2" helper="Submissions due soon" icon={<ClipboardCheck />} tone="accent" />
          <StatCard title="Student Evaluations" value="4.5" helper="Average rating" icon={<Users />} tone="default" />
          <StatCard title="Notifications" value="4" helper="2 unread messages" icon={<Bell />} tone="default" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">My Classes</h2>
              <p className="text-sm text-muted-foreground">Current semester courses you're teaching</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {classes.map((item) => (
                <div key={`${item.code}-${item.section}`} className="border-l-4 border-primary py-2 pl-4">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{item.code} - {item.name}</h3>
                      <p className="text-sm text-muted-foreground">Section {item.section}</p>
                      <p className="text-sm text-muted-foreground">{item.schedule}</p>
                    </div>
                    <Badge variant="secondary">{item.students} students</Badge>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate("/teacher/grades")} className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-muted">Enter Grades</button>
                    <button onClick={() => navigate("/teacher/students")} className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-muted">View Students</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <AlertCircle className="h-5 w-5 text-accent" />
                Pending Grade Submissions
              </h2>
              <p className="text-sm text-muted-foreground">Grades waiting for your input</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {pendingGrades.map((grade) => (
                <div key={grade.course} className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{grade.course}</h3>
                      <p className="text-sm text-muted-foreground">{grade.type}</p>
                    </div>
                    <Badge variant="outline" className="border-accent bg-accent/10 text-accent">
                      Due: {grade.dueDate}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {grade.submitted}/{grade.total} grades submitted
                  </p>
                  <button onClick={() => navigate("/teacher/grades")} className="mt-3 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90">
                    Submit Grades
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Student Evaluations</h2>
              <p className="text-sm text-muted-foreground">Feedback from your students</p>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {evaluations.map((evaluation) => (
                <div key={evaluation.semester} className="rounded-lg bg-muted/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">{evaluation.semester}</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-primary">{evaluation.rating}</div>
                      <div className="text-sm text-muted-foreground">/ 5.0</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {evaluation.responses}/{evaluation.total} students responded
                    </p>
                    <button className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-muted">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Announcements</h2>
              <p className="text-sm text-muted-foreground">Latest updates and notifications</p>
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
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
