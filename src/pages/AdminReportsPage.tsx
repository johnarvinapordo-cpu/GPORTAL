import DashboardLayout from "../components/layout/DashboardLayout";
import { FileText } from "lucide-react";

export default function AdminReportsPage() {
  const user = JSON.parse(localStorage.getItem("cmdi_user") || "{}");

  return (
    <DashboardLayout userRole="admin" userName="Administrator">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold">Admin Reports</h2>
          <p className="text-sm text-gray-500">
            Generate and view system reports
          </p>
        </div>

        {/* REPORT CARDS (your design) */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg mb-4 font-semibold">System Reports</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-sm">User Activity Report</p>
            </button>

            <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <FileText className="w-8 h-8 text-green-600 mb-2" />
              <p className="text-sm">Enrollment Report</p>
            </button>

            <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <FileText className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-sm">Financial Report</p>
            </button>

            <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <FileText className="w-8 h-8 text-orange-600 mb-2" />
              <p className="text-sm">Academic Report</p>
            </button>

            <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
              <FileText className="w-8 h-8 text-red-600 mb-2" />
              <p className="text-sm">System Health Report</p>
            </button>

            <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
              <FileText className="w-8 h-8 text-indigo-600 mb-2" />
              <p className="text-sm">Audit Log Report</p>
            </button>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}