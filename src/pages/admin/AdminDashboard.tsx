import { useState, useEffect } from 'react'
import type { AppUser } from '@/types'
import DashboardLayout from "../../components/DashboardLayout";
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

type User = Extract<AppUser, { role: 'admin' }>

interface Student {
  id: number
  student_id: string
  name: string
  email: string
  course: string
  year: string
}

interface Course {
  id: number
  code: string
  title: string
  instructor: string
  enrolled: number
}

interface PaymentRecord {
  id: number
  student_name: string
  amount: number
  status: string
  date: string
}

const demoStudents: Student[] = [
  { id: 1, student_id: 'STU-001', name: 'Juan Dela Cruz', email: 'juan@cmdi.edu', course: 'BS Computer Science', year: '3rd Year' },
  { id: 2, student_id: 'STU-002', name: 'Maria Santos', email: 'maria@cmdi.edu', course: 'BS Business Admin', year: '2nd Year' },
  { id: 3, student_id: 'STU-003', name: 'Pedro Garcia', email: 'pedro@cmdi.edu', course: 'BS Engineering', year: '4th Year' },
  { id: 4, student_id: 'STU-004', name: 'Ana Rodriguez', email: 'ana@cmdi.edu', course: 'BS Nursing', year: '1st Year' },
  { id: 5, student_id: 'STU-005', name: 'Luis Martinez', email: 'luis@cmdi.edu', course: 'BS Education', year: '3rd Year' },
]

const demoCourses: Course[] = [
  { id: 1, code: 'CS101', title: 'Introduction to Computer Science', instructor: 'Prof. Santos', enrolled: 45 },
  { id: 2, code: 'CS201', title: 'Data Structures', instructor: 'Prof. Reyes', enrolled: 38 },
  { id: 3, code: 'MATH101', title: 'Calculus I', instructor: 'Prof. Cruz', enrolled: 52 },
  { id: 4, code: 'ENG101', title: 'Technical Writing', instructor: 'Prof. Lopez', enrolled: 35 },
]

const demoPayments: PaymentRecord[] = [
  { id: 1, student_name: 'Juan Dela Cruz', amount: 25000, status: 'Paid', date: '2026-01-15' },
  { id: 2, student_name: 'Maria Santos', amount: 15000, status: 'Partial', date: '2026-01-20' },
  { id: 3, student_name: 'Pedro Garcia', amount: 30000, status: 'Paid', date: '2026-01-10' },
  { id: 4, student_name: 'Ana Rodriguez', amount: 20000, status: 'Pending', date: '2026-01-25' },
]

export default function AdminDashboard({ user }: { user: User }) {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/students').then(r => r.json()).catch(() => ({ students: demoStudents })),
      fetch('/api/admin/courses').then(r => r.json()).catch(() => ({ courses: demoCourses })),
      fetch('/api/admin/payments').then(r => r.json()).catch(() => ({ payments: demoPayments })),
    ])
      .then(([studentData, courseData, paymentData]) => {
        setStudents(studentData.students || demoStudents)
        setCourses(courseData.courses || demoCourses)
        setPayments(paymentData.payments || demoPayments)
      })
      .finally(() => setLoading(false))
  }, [])

  const totalStudents = students.length || 1400
  const totalCourses = courses.length || 142
  const totalFaculty = 85
  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0) || 12500000

  const enrollmentData = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Students',
        data: [1200, 1250, 1280, 1260, 1300, 1350, 1400],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        borderWidth: 2,
        fill: false
      }
    ]
  }

  const tuitionData = {
    labels: ['Fully Paid', 'Partially Paid', 'Unpaid'],
    datasets: [
      {
        data: [850, 420, 130],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0
      }
    ]
  }

  const performanceData = {
    labels: ['1.0-1.5', '1.6-2.0', '2.1-2.5', '2.6-3.0', '3.1-5.0'],
    datasets: [
      {
        label: 'Students',
        data: [280, 450, 380, 220, 70],
        backgroundColor: '#10b981'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  }

  return (
    <DashboardLayout userRole="admin" userName={user.name}>
      <div className="space-y-8">
        <div className="rounded-b-3xl border-b border-border bg-slate-50 px-6 py-8 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">CARD-MRI Development Institute Inc.</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Academic Management System</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-border">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}!</h2>
                <p className="mt-2 text-base text-slate-600">Here's what's happening with your institution today.</p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-200 text-slate-800">{user.name.charAt(0)}</span>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Total Students</p>
                  <p className="mt-4 text-4xl font-bold text-slate-900">{loading ? '...' : totalStudents.toLocaleString()}</p>
                  <p className="mt-2 text-sm text-emerald-600">+12% from last month</p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-3 text-slate-700">
                  <span className="text-xl">&#128101;</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Total Faculty</p>
                  <p className="mt-4 text-4xl font-bold text-slate-900">{totalFaculty}</p>
                  <p className="mt-2 text-sm text-emerald-600">+5% from last month</p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-3 text-slate-700">
                  <span className="text-xl">&#128104;</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Total Courses</p>
                  <p className="mt-4 text-4xl font-bold text-slate-900">{loading ? '...' : totalCourses}</p>
                  <p className="mt-2 text-sm text-slate-500">Across all programs</p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-3 text-slate-700">
                  <span className="text-xl">&#128218;</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Revenue</p>
                  <p className="mt-4 text-4xl font-bold text-slate-900">&#8369;{(totalRevenue / 1000000).toFixed(1)}M</p>
                  <p className="mt-2 text-sm text-red-600">-2% from last month</p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-3 text-slate-700">
                  <span className="text-xl">&#128176;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Enrollment Trends</h3>
              <div className="h-[200px]">
                <Line data={enrollmentData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Payment Status</h3>
              <div className="h-[200px]">
                <Pie data={tuitionData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Grade Distribution</h3>
              <div className="h-[200px]">
                <Bar data={performanceData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Students</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3">Student ID</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Course</th>
                  <th className="text-left p-3">Year</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.slice(0, 5).map((student) => (
                    <tr key={student.id} className="border-b border-gray-100">
                      <td className="p-3">{student.student_id}</td>
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.course}</td>
                      <td className="p-3">{student.year}</td>
                      <td className="p-3 text-green-600">Active</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">No students found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
