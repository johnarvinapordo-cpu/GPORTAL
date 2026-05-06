// @ts-nocheck
import { useEffect, useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import StatCard from "../../components/ui/StatCard"
import { Badge } from "../../components/ui/badge"
import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  AlertCircle,
  Bell
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { apiRequest, getStoredUser } from "../../lib/api"

export default function TeacherDashboard() {
  const teacherName = "Prof. Maria Santos"
  const navigate = useNavigate()
  const storedUser = getStoredUser()
  const [apiData, setApiData] = useState<any>(null)

  const fallbackClasses = [
    { code: "CS101", name: "Introduction to Programming", section: "A", students: 35, schedule: "MWF 9:00-10:00 AM" },
    { code: "CS201", name: "Data Structures", section: "B", students: 28, schedule: "TTh 1:00-2:30 PM" },
    { code: "CS301", name: "Software Engineering", section: "A", students: 32, schedule: "MWF 2:00-3:00 PM" },
  ]

  const classes = apiData?.courses?.length
    ? apiData.courses.map((course: any) => ({
        code: course.course_code,
        name: course.title,
        section: course.section || "A",
        students: course.enrolled || 0,
        schedule: course.schedule,
      }))
    : fallbackClasses

  useEffect(() => {
    if (!storedUser?.user_id) return
    apiRequest(`/api/teacher/${storedUser.user_id}`)
      .then(setApiData)
      .catch(() => {})
  }, [storedUser?.user_id])

  const pendingGrades = [
    { course: "CS101 - Section A", type: "Midterm Exam", dueDate: "March 25, 2026", submitted: 30, total: 35 },
    { course: "CS201 - Section B", type: "Final Project", dueDate: "March 28, 2026", submitted: 20, total: 28 },
  ]

  const announcements = [
    { title: "Faculty Meeting - March 20", date: "March 15, 2026" },
    { title: "Grade Submission Deadline Reminder", date: "March 14, 2026" },
    { title: "New LMS Features Available", date: "March 10, 2026" },
  ]

  const evaluations = [
    { semester: "2nd Semester 2025-2026", responses: 85, total: 95, rating: 4.5 },
  ]

  const totalStudents = classes.reduce((sum: number, c: any) => sum + Number(c.students || 0), 0)

  return (
    <DashboardLayout userRole="teacher" userName={teacherName}>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Welcome, {teacherName}!</h1>
          <p className="text-muted-foreground">
            Manage classes, grades, and student evaluations
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            title="Classes Handled"
            value={classes.length}
            helper={`${totalStudents} total students`}
            icon={<BookOpen />}
          />

          <StatCard
            title="Pending Grades"
            value="2"
            helper="Needs submission"
            icon={<ClipboardCheck />}
            tone="accent"
          />

          <StatCard
            title="Student Rating"
            value="4.5"
            helper="Average evaluation"
            icon={<TrendingUp />}
          />

          <StatCard
            title="Notifications"
            value="4"
            helper="2 unread"
            icon={<Bell />}
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* CLASSES */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">My Classes</h2>

            <div className="space-y-3">
              {classes.map((cls: any) => (
                <div
                  key={`${cls.code}-${cls.section}`}
                  className="p-3 rounded-lg bg-muted flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{cls.code} - {cls.name}</p>
                    <p className="text-sm text-muted-foreground">{cls.schedule}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">{cls.students} students</p>
                    <button
                      onClick={() => navigate("/teacher/evaluations")}
                      className="text-xs text-primary hover:underline"
                    >
                      Manage Grades
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GRADES */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Pending Grades</h2>

            <div className="space-y-3">
              {pendingGrades.map((g) => (
                <div key={g.course} className="p-3 rounded-lg border border-border bg-muted/40">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{g.course}</p>
                      <p className="text-sm text-muted-foreground">{g.type}</p>
                    </div>

                    <Badge variant="outline">
                      {g.dueDate}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    {g.submitted}/{g.total} submitted
                  </p>

                  <button
                    onClick={() => navigate("/teacher/evaluations")}
                    className="mt-2 text-sm text-primary hover:underline"
                  >
                    Go to Evaluation
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* EVALUATIONS SUMMARY */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Student Evaluations</h2>

            {evaluations.map((e) => (
              <div key={e.semester} className="p-4 rounded-lg bg-muted">
                <div className="flex justify-between">
                  <p className="font-semibold">{e.semester}</p>
                  <p className="font-bold text-primary">{e.rating}/5</p>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {e.responses}/{e.total} responses
                </p>

                <button
                  onClick={() => navigate("/teacher/evaluations")}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  View Full Evaluation
                </button>
              </div>
            ))}
          </div>

          {/* ANNOUNCEMENTS */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Announcements</h2>

            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.title} className="flex gap-3 items-start">
                  <AlertCircle className="w-4 h-4 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}