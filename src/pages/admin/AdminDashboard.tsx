import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { apiRequest } from "../../lib/api";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    apiRequest("/api/admin").then(setData).catch(() => {});
  }, []);

  const students = data?.students || 1400;
  const teachers = data?.teachers || 85;
  const courses = data?.courses || 120;

  return (
    <DashboardLayout userRole="admin" userName="Administrator">

      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview & analytics</p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard title="Students" value={students} icon={<Users />} helper="Total enrolled students" />
          <StatCard title="Teachers" value={teachers} icon={<GraduationCap />} helper="Active faculty members" />
          <StatCard title="Courses" value={courses} icon={<BookOpen />} helper="Available courses" />
          <StatCard title="Revenue" value="₱12M" icon={<DollarSign />} helper="Annual revenue" />
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-card p-4 border rounded-xl">
            <h2 className="font-semibold mb-3">Enrollment</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={[
                { m: "Jan", v: 100 },
                { m: "Feb", v: 200 },
                { m: "Mar", v: 300 },
              ]}>
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Line dataKey="v" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card p-4 border rounded-xl">
            <h2 className="font-semibold mb-3">Courses</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { name: "CS", value: 40 },
                { name: "IT", value: 30 },
                { name: "ENG", value: 20 },
              ]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}