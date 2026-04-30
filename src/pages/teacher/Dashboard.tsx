import { BookOpen, Users, ClipboardCheck, TrendingUp } from 'lucide-react'
import type { AppUser } from '@/types'

type User = Extract<AppUser, { role: 'teacher' }>

const myClasses = [
  { id: 1, code: 'CS101', name: 'Introduction to Programming', schedule: 'MWF 9:00-10:00', students: 35 },
  { id: 2, code: 'CS201', name: 'Data Structures', schedule: 'TTH 10:00-12:00', students: 28 },
  { id: 3, code: 'CS301', name: 'Algorithms', schedule: 'MWF 11:00-12:00', students: 22 },
]

const pendingGrades = [
  { id: 1, student: 'Juan Dela Cruz', course: 'CS101', midtermStatus: 'Pending', finalStatus: 'Pending' },
  { id: 2, student: 'Maria Santos', course: 'CS101', midtermStatus: 'Submitted', finalStatus: 'Pending' },
  { id: 3, student: 'Pedro Reyes', course: 'CS201', midtermStatus: 'Pending', finalStatus: 'Pending' },
]

export default function TeacherDashboard({ user }: { user: User }) {
  const totalStudents = myClasses.reduce((acc, c) => acc + c.students, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, Professor {user.name.split(' ').pop()}!</h1>
        <p className="text-muted-foreground">Manage your classes and submit student grades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Classes</p>
              <p className="text-2xl font-bold">{myClasses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-bold">{totalStudents}</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Midterms</p>
              <p className="text-2xl font-bold">{pendingGrades.filter(g => g.midtermStatus === 'Pending').length}</p>
            </div>
            <ClipboardCheck className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Finals</p>
              <p className="text-2xl font-bold">{pendingGrades.filter(g => g.finalStatus === 'Pending').length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">My Classes</h2>
          <div className="space-y-3">
            {myClasses.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">{cls.code}</p>
                  <p className="text-sm text-muted-foreground">{cls.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{cls.students} students</p>
                  <p className="text-xs text-muted-foreground">{cls.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Grade Submission</h2>
          <div className="space-y-3">
            {pendingGrades.map((grade) => (
              <div key={grade.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">{grade.student}</p>
                  <p className="text-sm text-muted-foreground">{grade.course}</p>
                </div>
                <div className="text-right text-sm">
                  <p className={grade.midtermStatus === 'Pending' ? 'text-orange-600' : 'text-green-600'}>
                    Midterm: {grade.midtermStatus}
                  </p>
                  <p className={grade.finalStatus === 'Pending' ? 'text-orange-600' : 'text-green-600'}>
                    Final: {grade.finalStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
