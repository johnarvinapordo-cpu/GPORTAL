// @ts-nocheck
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { apiRequest, getStoredUser } from "../../lib/api";

import {
  GraduationCap,
  BookOpen,
  DollarSign,
  Bell
} from "lucide-react";

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
} from "chart.js";

import { Line, Bar, Pie } from "react-chartjs-2";

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
);

export default function StudentDashboard({ user }: any) {
  const storedUser = getStoredUser();
  const currentUser = user || storedUser;

  const [courses, setCourses] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser?.user_id) return;

    apiRequest(`/api/student/${currentUser.user_id}`)
      .then((data) => {
        setCourses(data.courses || []);
        setGrades(data.grades || []);
        setPayments(data.payments || []);
      })
      .catch(() => {
        // fallback
        setCourses([
          { course_code: "CS101", title: "Programming", units: 3 },
          { course_code: "MATH201", title: "Calculus", units: 4 },
        ]);
        setGrades([
          { midterm: 85, finals: 90 },
          { midterm: 80, finals: 85 },
        ]);
        setPayments([
          { total_amount: 25000, paid_amount: 20000 },
        ]);
      });
  }, [currentUser?.user_id]);

  const totalBalance = payments.reduce((a, p) => a + (p.total_amount - p.paid_amount), 0);
  const totalPaid = payments.reduce((a, p) => a + p.paid_amount, 0);

  const gpa =
    grades.length > 0
      ? (grades.reduce((a, g) => a + (g.midterm + g.finals) / 2, 0) / grades.length / 25).toFixed(2)
      : "3.75";

  const chartData = {
    labels: ["Prelim", "Midterm", "Final"],
    datasets: [
      {
        label: "GPA",
        data: [2.0, Number(gpa), Number(gpa)],
        borderColor: "#3b82f6",
      },
    ],
  };

  return (
    <DashboardLayout userRole="student" userName={currentUser?.name}>
      <div className="space-y-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {currentUser?.name}
        </h1>

        {/* CARDS */}
        <div className="grid md:grid-cols-4 gap-4">

          <Card title="GPA" value={gpa} icon={<GraduationCap />} />
          <Card title="Courses" value={courses.length} icon={<BookOpen />} />
          <Card title="Balance" value={`₱${totalBalance}`} icon={<DollarSign />} />
          <Card title="Notifications" value="3" icon={<Bell />} />

        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-3 gap-4">

          <ChartBox title="Grade Trend">
            <Line data={chartData} />
          </ChartBox>

          <ChartBox title="Attendance">
            <Bar
              data={{
                labels: ["Mon", "Tue", "Wed"],
                datasets: [{ data: [100, 90, 95] }],
              }}
            />
          </ChartBox>

          <ChartBox title="Payments">
            <Pie
              data={{
                labels: ["Paid", "Remaining"],
                datasets: [{
                  data: [totalPaid, totalBalance],
                  backgroundColor: ["#22c55e", "#ef4444"],
                }],
              }}
            />
          </ChartBox>

        </div>

        {/* COURSES */}
        <div className="bg-slate-900 p-4 rounded">
          <h2 className="text-lg font-bold text-white">My Subjects</h2>

          {courses.map((c, i) => (
            <div key={i} className="border-b py-2 text-white">
              {c.title} ({c.course_code})
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}

/* SMALL COMPONENTS */

function Card({ title, value, icon }: any) {
  return (
    <div className="bg-slate-900 p-4 rounded shadow text-white">
      {icon}
      <p>{title}</p>
      <h2 className="text-xl">{value}</h2>
    </div>
  );
}

function ChartBox({ title, children }: any) {
  return (
    <div className="bg-slate-900 p-4 rounded text-white">
      <h3 className="mb-2">{title}</h3>
      {children}
    </div>
  );
}