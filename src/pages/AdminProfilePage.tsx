import DashboardLayout from "../components/layout/DashboardLayout";

export default function AdminProfilePage() {
  return (
    <DashboardLayout userRole="admin" userName="Administrator">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold">Admin Profile</h1>
        <p className="text-gray-500">View and update profile information</p>
      </div>
    </DashboardLayout>
  );
}