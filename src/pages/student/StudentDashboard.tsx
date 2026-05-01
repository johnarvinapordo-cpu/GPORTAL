import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  GraduationCap,
  BookOpen,
  DollarSign,
  Bell
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function StudentDashboard() {

  const student = {
    name: "Juan Dela Cruz",
    gpa: 3.75,
    balance: 12450
  };

  const courses = [
    { code: "CS101", name: "Programming" },
    { code: "MATH201", name: "Calculus" }
  ];

  const gpaData = [
    { sem: "1", gpa: 3.2 },
    { sem: "2", gpa: 3.4 },
    { sem: "3", gpa: 3.7 },
  ];

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {student.name}
        </h1>
        <p className="text-gray-600">Student Dashboard Overview</p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <GraduationCap />
          <p>GPA</p>
          <h2 className="text-xl font-bold">{student.gpa}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <BookOpen />
          <p>Courses</p>
          <h2>{courses.length}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <DollarSign />
          <p>Balance</p>
          <h2>₱{student.balance}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <Bell />
          <p>Notifications</p>
          <h2>3</h2>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded shadow h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={gpaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sem" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="gpa" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* COURSES */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-3">Enrolled Courses</h2>

        {courses.map((c, i) => (
          <div key={i} className="border-b py-2">
            {c.code} - {c.name}
          </div>
        ))}
      </div>

    </DashboardLayout>
  );
}