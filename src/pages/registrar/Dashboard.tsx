import { UserCheck, BookOpen, ClipboardList, Calendar } from 'lucide-react'
import type { AppUser } from '@/types'

type User = Extract<AppUser, { role: 'registrar' }>

const pendingEnrollments = [
  { id: 1, student: 'Juan Dela Cruz', course: 'CS301', year: '3rd Year', status: 'Pending', date: '2024-01-15' },
  { id: 2, student: 'Maria Santos', course: 'CS401', year: '4th Year', status: 'Pending', date: '2024-01-16' },
  { id: 3, student: 'Pedro Reyes', course: 'CS201', year: '2nd Year', status: 'Approved', date: '2024-01-14' },
  { id: 4, student: 'Ana Mae Torres', course: 'MATH301', year: '3rd Year', status: 'Pending', date: '2024-01-17' },
]

const courses = [
  { id: 1, code: 'CS101', name: 'Intro to Programming', enrolled: 35, capacity: 40 },
  { id: 2, code: 'CS201', name: 'Data Structures', enrolled: 28, capacity: 35 },
  { id: 3, code: 'CS301', name: 'Algorithms', enrolled: 22, capacity: 30 },
  { id: 4, code: 'MATH101', name: 'Calculus I', enrolled: 45, capacity: 50 },
]

export default function RegistrarDashboard({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, Registrar {user.name.split(' ').pop()}!</h1>
        <p className="text-muted-foreground">Manage enrollments and course schedules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Enrollments</p>
              <p className="text-2xl font-bold">{pendingEnrollments.filter(e => e.status === 'Pending').length}</p>
            </div>
            <ClipboardList className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved Today</p>
              <p className="text-2xl font-bold">{pendingEnrollments.filter(e => e.status === 'Approved').length}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Enrolled</p>
              <p className="text-2xl font-bold">{courses.reduce((a, c) => a + c.enrolled, 0)}</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Enrollment Requests</h2>
          <div className="space-y-3">
            {pendingEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">{enrollment.student}</p>
                  <p className="text-sm text-muted-foreground">{enrollment.course} - {enrollment.year}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    enrollment.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {enrollment.status}
                  </span>
                  {enrollment.status === 'Pending' && (
                    <>
                      <button className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">Approve</button>
                      <button className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">Reject</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Course Enrollment Status</h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-medium">{course.code}</p>
                    <p className="text-sm text-muted-foreground">{course.name}</p>
                  </div>
                  <p className="text-sm">{course.enrolled}/{course.capacity}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-primary rounded-full h-2 w-[${Math.round((course.enrolled / course.capacity) * 100)}%]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
