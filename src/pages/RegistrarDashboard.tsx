import DashboardLayout from "../components/layout/DashboardLayout";

export default function RegistrarDashboard() {
  const user = JSON.parse(localStorage.getItem("cmdi_user") || "null");

  // protect dashboard if no user
  if (!user) return null;

  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="p-6">
        <h1 className="text-xl font-bold">
          Registrar Dashboard
        </h1>
      </div>
    </DashboardLayout>
  );
}