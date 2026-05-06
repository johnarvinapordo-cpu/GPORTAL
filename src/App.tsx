import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";

import StudentDashboard from "./pages/student/StudentDashboard";
import EnrollmentPage from "./pages/Enrollment";
import SubmissionsPage from "./pages/student/Submissions";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import EvaluationsPage from "./pages/teacher/Evaluations";

import NotificationsPage from "./pages/Notifications";

import AdminDashboard from "./pages/admin/AdminDashboard";
import RegistrarDashboard from "./pages/registrar/RegistrarDashboard";
import FinanceDashboard from "./pages/finance/FinanceDashboard";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import { useAuth } from "./context/AuthContext";

import type { AppUser } from "./types";

function App() {
  const { user, loading, setUser, signOut } = useAuth();

  /* =========================
     LOGIN / LOGOUT
  ========================= */
  const handleLogin = (userData: AppUser) => {
    setUser(userData);
  };

  const handleLogout = () => {
    signOut();
  };

  /* =========================
     LOADING SCREEN
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  /* =========================
     NOT LOGGED IN
  ========================= */
  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  /* =========================
     STUDENT ROUTES
  ========================= */
  const StudentRoutes = () => (
    <Routes>
      <Route
        path="/student"
        element={<Navigate to="/student/dashboard" replace />}
      />
      <Route
        path="/student/dashboard"
        element={
          <StudentDashboard
            user={user as Extract<AppUser, { role: "student" }>}
          />
        }
      />
      <Route path="/student/enrollment" element={<EnrollmentPage />} />
      <Route path="/student/submissions" element={<SubmissionsPage />} />
      <Route path="/student/notifications" element={<NotificationsPage />} />
      <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
    </Routes>
  );

  /* =========================
     TEACHER ROUTES
  ========================= */
  const TeacherRoutes = () => (
    <Routes>
      <Route
        path="/teacher"
        element={<Navigate to="/teacher/dashboard" replace />}
      />
      <Route
        path="/teacher/dashboard"
        element={<TeacherDashboard />}
      />
      <Route path="/teacher/evaluations" element={<EvaluationsPage />} />
      <Route path="/teacher/notifications" element={<NotificationsPage />} />
      <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
    </Routes>
  );

  /* =========================
     ROLE DASHBOARD SELECTOR
  ========================= */
  const getDashboard = () => {
    switch (user.role) {
      case "student":
        return <StudentRoutes />;

      case "teacher":
        return <TeacherRoutes />;

      case "admin":
        return <AdminDashboard />;

      case "registrar":
        return (
          <RegistrarDashboard
            user={user as Extract<AppUser, { role: "registrar" }>}
          />
        );

      case "finance":
        return (
          <FinanceDashboard
            user={user as Extract<AppUser, { role: "finance" }>}
          />
        );

      default:
        return <Navigate to="/login" replace />;
    }
  };

  /* =========================
     MAIN APP LAYOUT
  ========================= */
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex">
        <Sidebar user={user} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col ml-64">
          <Header user={user} onLogout={handleLogout} />

          <main className="flex-1 p-6 mt-16 bg-slate-950">
            {getDashboard()}
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;