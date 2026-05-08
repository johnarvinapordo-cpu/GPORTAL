import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function RegistrarDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { label: "Total Students", value: 1240 },
    { label: "Pending Enrollment", value: 32 },
    { label: "Approved", value: 980 },
    { label: "Rejected", value: 45 },
  ];

  return (
    <DashboardLayout userRole="registrar" userName="Registrar Officer">

      <div className="p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">
          Registrar Dashboard
        </h1>

        {/* STATS CARDS */}
        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow">
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>

            {/* STATUS CARDS */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-xl flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                <p>Approved</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl flex items-center gap-2">
                <Clock className="text-yellow-600" />
                <p>Pending</p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl flex items-center gap-2">
                <XCircle className="text-red-600" />
                <p>Rejected</p>
              </div>
            </div>
          </>
        )}

        {/* ENROLLMENT */}
        {activeTab === "enrollment" && (
          <div>
            <h1 className="text-xl font-bold">Enrollment Module</h1>
            <p className="text-gray-500">
              Regadfinance-style enrollment table goes here
            </p>
          </div>
        )}

        {/* SUBJECTS */}
        {activeTab === "subjects" && (
          <div>
            <h1 className="text-xl font-bold">Subjects</h1>
            <p className="text-gray-500">Subject management UI</p>
          </div>
        )}

        {/* STUDENTS */}
        {activeTab === "students" && (
          <div>
            <h1 className="text-xl font-bold">Students</h1>
            <p className="text-gray-500">Student records table</p>
          </div>
        )}

        {/* REPORTS */}
        {activeTab === "reports" && (
          <div>
            <h1 className="text-xl font-bold">Reports</h1>
            <p className="text-gray-500">Analytics and reports section</p>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div>
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-gray-500">System configuration</p>
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}