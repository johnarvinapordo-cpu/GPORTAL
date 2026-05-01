import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import { BookOpen, DollarSign, GraduationCap, TrendingDown, TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { apiRequest } from "../../lib/api";

export default function AdminDashboard() {
  const [apiData, setApiData] = useState(null);
  const enrollmentData = [
    { month: "Sep", students: 1200 },
    { month: "Oct", students: 1250 },
    { month: "Nov", students: 1280 },
    { month: "Dec", students: 1260 },
    { month: "Jan", students: 1300 },
    { month: "Feb", students: 1350 },
    { month: "Mar", students: 1400 },
  ];

  const tuitionData = [
    { name: "Fully Paid", value: 850, color: "#10b981" },
    { name: "Partially Paid", value: 420, color: "#f59e0b" },
    { name: "Unpaid", value: 130, color: "#ef4444" },
  ];

  const courseEnrollment = [
    { course: "Computer Science", enrolled: 450 },
    { course: "Business Admin", enrolled: 380 },
    { course: "Engineering", enrolled: 320 },
    { course: "Education", enrolled: 250 },
  ];

  useEffect(() => {
    apiRequest("/api/admin").then(setApiData).catch(() => {});
  }, []);

  const stats = apiData?.stats ?? {};

  const performanceData = [
    { grade: "1.0-1.5", students: 280 },
    { grade: "1.6-2.0", students: 450 },
    { grade: "2.1-2.5", students: 380 },
    { grade: "2.6-3.0", students: 220 },
    { grade: "3.1-5.0", students: 70 },
  ];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administrative Dashboard</h1>
          <p className="text-muted-foreground">Overview of institutional metrics and analytics</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Students" value={stats.totalStudents ?? "1,400"} helper="+8.5% from last year" icon={<Users />} />
          <StatCard title="Total Teachers" value={stats.totalTeachers ?? "85"} helper="+5 new hires" icon={<GraduationCap />} tone="default" />
          <StatCard title="Active Courses" value={stats.totalCourses ?? "120"} helper={`${stats.activeEnrollments ?? "Approved"} enrollments`} icon={<BookOpen />} tone="default" />
          <StatCard title="Tuition Collection" value="PHP 42.5M" helper="9.3% pending" icon={<DollarSign />} tone="accent" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Enrollment Trends" description="Student enrollment over the academic year">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="Students" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Tuition Payment Status" description="Distribution of payment statuses">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={tuitionData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                  {tuitionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Student Performance Distribution" description="GPA distribution across student population">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#3b82f6" name="Number of Students" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Course Enrollment by Program" description="Students enrolled per program">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseEnrollment} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="course" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="enrolled" fill="#f59e0b" name="Enrolled Students" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Enrollment Statistics Summary</h2>
              <p className="text-sm text-muted-foreground">Quick overview of key enrollment metrics</p>
            </div>
            <div className="grid gap-4 p-6 pt-0">
              <SummaryItem label="Average Class Size" value="28 students" icon={<TrendingUp />} />
              <SummaryItem label="Student-Teacher Ratio" value="16:1" icon={<Users />} />
              <SummaryItem label="Graduation Rate" value="92%" icon={<TrendingDown />} />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ChartCard({ title, description, children }) {
  return (
    <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-6 pt-0">{children}</div>
    </section>
  );
}

function SummaryItem({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-muted-foreground [&>svg]:h-5 [&>svg]:w-5">{icon}</div>
    </div>
  );
}
