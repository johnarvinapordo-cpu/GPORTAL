// @ts-nocheck
import { useEffect, useState } from "react"
import type { AppUser } from "@/types"

import DashboardLayout from "@/components/layout/DashboardLayout"
import StatCard from "../../components/ui/StatCard"
import { Badge } from "../../components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  FileText,
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  Users
} from "lucide-react"

import { apiRequest } from "../../lib/api"

/* =========================
   TYPES
========================= */
type User = Extract<AppUser, { role: "registrar" }>

/* =========================
   STATIC DATA (KEEP ALL)
========================= */
const pendingEnrollments = [
  { id: 1, student: "Juan Dela Cruz", course: "CS301", year: "3rd Year", status: "Pending", date: "2024-01-15" },
  { id: 2, student: "Maria Santos", course: "CS401", year: "4th Year", status: "Pending", date: "2024-01-16" },
  { id: 3, student: "Pedro Reyes", course: "CS201", year: "2nd Year", status: "Approved", date: "2024-01-14" },
  { id: 4, student: "Ana Mae Torres", course: "MATH301", year: "3rd Year", status: "Pending", date: "2024-01-17" },
]

const courses = [
  { id: 1, code: "CS101", name: "Intro to Programming", enrolled: 35, capacity: 40 },
  { id: 2, code: "CS201", name: "Data Structures", enrolled: 28, capacity: 35 },
  { id: 3, code: "CS301", name: "Algorithms", enrolled: 22, capacity: 30 },
  { id: 4, code: "MATH101", name: "Calculus I", enrolled: 45, capacity: 50 },
]

/* =========================
   MAIN COMPONENT
========================= */
export default function RegistrarDashboard({ user }: { user?: User }) {
  const [apiData, setApiData] = useState<any>(null)

  /* =========================
     API + FALLBACK
  ========================= */
  const fallbackRequests = [
    { student: "Maria Villanueva", program: "BS Computer Science", status: "For Review", date: "May 2, 2026" },
    { student: "Kevin Ramos", program: "BS Business Administration", status: "Missing Form", date: "May 1, 2026" },
    { student: "Angel Santos", program: "BSEd English", status: "Ready", date: "April 30, 2026" },
  ]

  const enrollmentRequests =
    apiData?.pendingEnrollments?.length
      ? apiData.pendingEnrollments.map((request: any) => ({
          student: request.student_name,
          program: `${request.course_code} - ${request.title}`,
          status: request.status === "pending" ? "For Review" : request.status,
          date: new Date(request.enrolled_at).toLocaleDateString(),
        }))
      : fallbackRequests

  useEffect(() => {
    apiRequest("/api/registrar").then(setApiData).catch(() => {})
  }, [])

  /* =========================
     EXTRA DATA (KEEP ALL)
  ========================= */
  const recordsQueue = [
    { request: "Transcript of Records", count: 18, owner: "Records Window 1" },
    { request: "Certificate of Enrollment", count: 32, owner: "Enrollment Desk" },
    { request: "Good Moral Certificate", count: 11, owner: "Registrar Clerk" },
  ]

  const programStats = [
    { label: "Computer Science", value: "450 enrolled" },
    { label: "Business Administration", value: "380 enrolled" },
    { label: "Education", value: "250 enrolled" },
  ]

  /* =========================
     UI
  ========================= */
  return (
    <DashboardLayout userRole="registrar" userName="Registrar Office">
      <div className="space-y-6 pb-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {user ? `Welcome, Registrar ${user.name.split(" ").pop()}!` : "Registrar Dashboard"}
            </h1>
            <p className="text-muted-foreground">
              Enrollment processing, records requests, and academic documents
            </p>
          </div>
          <Button size="sm">Create New Section</Button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Students" value="1,400" helper="+72 this semester" icon={<Users />} />
          <StatCard
            title="Pending Enrollment"
            value={apiData?.pendingEnrollments?.length ?? "47"}
            helper="Needs validation"
            icon={<CalendarCheck />}
            tone="accent"
          />
          <StatCard title="Record Requests" value="61" helper="18 due today" icon={<FileText />} />
          <StatCard
            title="Active Courses"
            value={apiData?.courses?.length ?? courses.length}
            helper="All programs"
            icon={<BookOpen />}
          />
        </div>

        {/* ENROLLMENT + RECORDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ENROLLMENT REQUESTS */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">Enrollment Requests</h2>
            <p className="text-sm text-muted-foreground mb-4">Applications needing action</p>

            {enrollmentRequests.map((req: any) => (
              <div key={req.student} className="border-l-4 border-primary pl-4 py-2 mb-3">
                <h3 className="font-semibold">{req.student}</h3>
                <p className="text-sm text-muted-foreground">{req.program}</p>
                <p className="text-sm text-muted-foreground">{req.date}</p>

                <Badge variant="outline">{req.status}</Badge>
              </div>
            ))}
          </section>

          {/* RECORDS QUEUE */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">Records Queue</h2>
            {recordsQueue.map((item) => (
              <div key={item.request} className="p-3 bg-muted rounded mb-2 flex justify-between">
                <div>
                  <p className="font-semibold">{item.request}</p>
                  <p className="text-sm text-muted-foreground">{item.owner}</p>
                </div>
                <div className="text-xl font-bold">{item.count}</div>
              </div>
            ))}
          </section>
        </div>

        {/* PROGRAM SNAPSHOT */}
        <section className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Program Enrollment Snapshot
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {programStats.map((program) => (
              <div key={program.label} className="bg-muted p-4 rounded">
                <p className="text-sm text-muted-foreground">{program.label}</p>
                <p className="text-2xl font-bold">{program.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LEGACY TABLE + ACTIONS (KEPT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* OLD ENROLLMENT TABLE */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">Enrollment Requests (Legacy)</h2>

            {pendingEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex justify-between p-3 bg-muted rounded mb-2">
                <div>
                  <p>{enrollment.student}</p>
                  <p className="text-sm">{enrollment.course} - {enrollment.year}</p>
                </div>

                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-yellow-200 rounded">
                    {enrollment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* COURSE STATUS */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">Course Enrollment</h2>

            {courses.map((course) => (
              <div key={course.id} className="mb-3">
                <div className="flex justify-between">
                  <p>{course.code}</p>
                  <p>{course.enrolled}/{course.capacity}</p>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-blue-500 h-2 rounded"
                    style={{
                      width: `${(course.enrolled / course.capacity) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}