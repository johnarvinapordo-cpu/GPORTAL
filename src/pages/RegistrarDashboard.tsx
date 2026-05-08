import DashboardLayout from "../components/layout/DashboardLayout";

export default function RegistrarDashboard() {
  return (
    <DashboardLayout userRole="registrar" userName="Registrar Officer">
      <h1 className="text-2xl font-bold">Registrar Dashboard</h1>
    </DashboardLayout>
  );
}