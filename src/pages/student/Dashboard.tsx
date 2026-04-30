import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'
import type { AppUser } from '@/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

type User = Extract<AppUser, { role: 'student' }>

interface Course {
  id: number
  course_code: string
  title: string
  units: number
  schedule: string
  instructor_id: string
}

interface Grade {
  course_code: string
  midterm: number
  finals: number
}

interface Payment {
  id: number
  total_amount: number
  paid_amount: number
  status: string
}

// Demo data for offline mode
const demoCourses: Course[] = [
  { id: 1, course_code: 'CS101', title: 'Introduction to Computer Science', units: 3, schedule: 'Mon/Wed 9:00-10:30', instructor_id: 'TCH-001' },
  { id: 2, course_code: 'MATH201', title: 'Calculus I', units: 4, schedule: 'Tue/Thu 8:00-9:30', instructor_id: 'TCH-001' },
  { id: 3, course_code: 'ENG101', title: 'Technical Writing', units: 3, schedule: 'Fri 10:00-12:00', instructor_id: 'TCH-001' },
]

const demoGrades: Grade[] = [
  { course_code: 'CS101', midterm: 85, finals: 90 },
  { course_code: 'MATH201', midterm: 78, finals: 82 },
  { course_code: 'ENG101', midterm: 88, finals: 92 },
]

const demoPayments: Payment[] = [
  { id: 1, total_amount: 25000, paid_amount: 20000, status: 'Partial' },
]

export default function StudentDashboard({ user }: { user: User }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    fetch(`/api/student/${user.user_id}`)
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses || [])
        setGrades(data.grades || [])
        setPayments(data.payments || [])
      })
      .catch(() => {
        // Fallback to demo data if server is not running
        setCourses(demoCourses)
        setGrades(demoGrades)
        setPayments(demoPayments)
      })
  }, [user.user_id])

  const totalUnits = courses.reduce((acc, c) => acc + c.units, 0)
  const totalBalance = payments.reduce((acc, p) => acc + (p.total_amount - p.paid_amount), 0)
  const totalPaid = payments.reduce((acc, p) => acc + p.paid_amount, 0)

  const instructorMap: Record<string, string> = {
    'TCH-001': 'Prof. Santos'
  }

  const calculateGPA = () => {
    if (grades.length === 0) return '0.00'
    const total = grades.reduce((acc, g) => acc + ((g.midterm + g.finals) / 2), 0)
    return (total / grades.length / 25).toFixed(2)
  }

  const gpaDisplay = calculateGPA()

  const gradeChartData = {
    labels: ['Prelim', 'Midterm', 'Final'],
    datasets: [
      {
        label: 'Grades',
        data: [2.0, parseFloat(gpaDisplay) || 1.8, parseFloat(gpaDisplay) || 1.7],
        borderColor: '#1e293b',
        backgroundColor: '#1e293b',
        borderWidth: 2,
        fill: false
      }
    ]
  }

  const attendanceChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Attendance %',
        data: [100, 90, 95, 85, 100],
        backgroundColor: ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8'],
        borderWidth: 1
      }
    ]
  }

  const financeChartData = {
    labels: ['Paid', 'Remaining'],
    datasets: [
      {
        data: [totalPaid || 15000, totalBalance || 5000],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 0
      }
    ]
  }

  const tuitionProgress = totalBalance > 0 && totalPaid + totalBalance > 0
    ? Math.min(100, Math.round((totalPaid / (totalPaid + totalBalance)) * 100))
    : 100

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  }

return (
    <div className="space-y-8">
      <div className="rounded-b-3xl border-b border-blue-900/30 bg-slate-900/50 px-6 py-8 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-400">CARD-MRI Development Institute Inc.</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Academic Management System</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="rounded-3xl bg-slate-900 p-8 shadow-sm border border-blue-900/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Welcome back, {user.name}!</h2>
              <p className="mt-2 text-base text-blue-300">Here's what's happening with your academic journey today.</p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-800 border border-blue-900/30 px-4 py-3 text-sm text-blue-200">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">{user.name.charAt(0)}</span>
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-blue-400">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-blue-900/30 bg-slate-900 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Current GPA</p>
                <p className="mt-4 text-4xl font-bold text-white">{gpaDisplay}</p>
                <p className="mt-2 text-sm text-emerald-400">+0.15 from last semester</p>
              </div>
              <div className="rounded-3xl bg-slate-800 p-3 text-blue-300">
                <span className="text-xl">🎓</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-900/30 bg-slate-900 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Enrolled Courses</p>
                <p className="mt-4 text-4xl font-bold text-white">{courses.length}</p>
                <p className="mt-2 text-sm text-blue-400">{totalUnits} total units</p>
              </div>
              <div className="rounded-3xl bg-slate-800 p-3 text-blue-300">
                <span className="text-xl">📚</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-900/30 bg-slate-900 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Tuition Balance</p>
                <p className="mt-4 text-4xl font-bold text-white">₱{totalBalance.toLocaleString()}</p>
                <p className="mt-2 text-sm text-blue-400">{totalBalance > 0 ? `${Math.max(0, Math.round(((totalBalance + totalPaid) > 0 ? totalPaid / (totalPaid + totalBalance) * 100 : 0)))}% paid` : 'Paid in full'}</p>
              </div>
              <div className="rounded-3xl bg-slate-800 p-3 text-blue-300">
                <span className="text-xl">💳</span>
              </div>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className={`h-full rounded-full bg-blue-600 w-[${tuitionProgress}%]`} />
            </div>
          </div>

          <div className="rounded-3xl border border-blue-900/30 bg-slate-900 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Notifications</p>
                <p className="mt-4 text-4xl font-bold text-white">5</p>
                <p className="mt-2 text-sm text-blue-400">3 unread messages</p>
              </div>
              <div className="rounded-3xl bg-slate-800 p-3 text-blue-300">
                <span className="text-xl">🔔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          <div className="bg-slate-900 border border-blue-900/30 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-white">Grade Trend</h3>
            <div className="h-[200px]">
              <Line data={gradeChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-slate-900 border border-blue-900/30 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-white">Attendance</h3>
            <div className="h-[200px]">
              <Bar data={attendanceChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-slate-900 border border-blue-900/30 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4 text-white">Payment Status</h3>
            <div className="h-[200px]">
              <Pie data={financeChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-blue-900/30 p-5 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold mb-4 text-white">My Subjects</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-blue-900/30">
                <th className="text-left p-3 text-blue-300">Subject</th>
                <th className="text-left p-3 text-blue-300">Instructor</th>
                <th className="text-left p-3 text-blue-300">Schedule</th>
                <th className="text-left p-3 text-blue-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id} className="border-b border-blue-900/20">
                    <td className="p-3 text-white">{course.title} ({course.course_code})</td>
                    <td className="p-3 text-blue-300">{instructorMap[course.instructor_id] || 'TBA'}</td>
                    <td className="p-3 text-blue-300">{course.schedule}</td>
                    <td className="p-3 text-emerald-400">Active</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-blue-400">No enrolled courses</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
