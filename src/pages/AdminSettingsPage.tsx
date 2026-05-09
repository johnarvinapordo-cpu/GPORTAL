import DashboardLayout from "../components/layout/DashboardLayout";

export default function AdminSettingsPage() {
  return (
    <DashboardLayout userRole="admin" userName="Administrator">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold">System Settings</h1>
        <p className="text-gray-500">Configure system preferences</p>
      </div>
    </DashboardLayout>
  );
}