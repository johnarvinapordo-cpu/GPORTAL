import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

// ================= DASHBOARDS =================
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import RegistrarDashboard from "./pages/RegistrarDashboard";

// ================= STUDENT =================
import EnrollmentPage from "./pages/EnrollmentPage";
import GradesPage from "./pages/GradesPage";
import TuitionPage from "./pages/TuitionPage";
import EvaluationPage from "./pages/EvaluationPage";

import StudentProfilePage from "./pages/profile/StudentProfilePage";
import StudentSettingsPage from "./pages/settings/StudentSettingsPage";

// ================= TEACHER =================
import TeacherProfilePage from "./pages/profile/TeacherProfilePage";
import TeacherSettingsPage from "./pages/settings/TeacherSettingsPage";

// ================= ADMIN =================
import AdminReportsPage from "./pages/AdminReportsPage";
import AdminProfilePage from "./pages/profile/AdminProfilePage";
import AdminSettingsPage from "./pages/settings/AdminSettingsPage";

// ================= FINANCE =================
import FinanceStudentAccountsPage from "./pages/FinanceStudentAccountsPage";
import FinancePaymentsBillingPage from "./pages/FinancePaymentsBillingPage";
import FinanceReportsPage from "./pages/FinanceReportsPage";

import FinanceProfilePage from "./pages/profile/FinanceProfilePage";
import FinanceSettingsPage from "./pages/settings/FinanceSettingsPage";

// ================= REGISTRAR =================
import RegistrarEnrollmentPage from "./pages/RegistrarEnrollmentPage";
import RegistrarStudentRecordsPage from "./pages/RegistrarStudentRecordsPage";

import RegistrarProfilePage from "./pages/profile/RegistrarProfilePage";
import RegistrarSettingsPage from "./pages/settings/RegistrarSettingsPage";

// ================= SHARED =================
import NotificationsPage from "./pages/NotificationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

import { useAuth } from "./context/AuthContext";

// ================= AUTH GUARD =================
const ProtectedRoute = ({ children, role }: any) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

// ================= ROUTER =================
export const router = createBrowserRouter([

  // ================= LOGIN =================
  { path: "/", element: <LoginPage /> },

  // ================= STUDENT =================
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },
  { path: "/student/enrollment", element: <EnrollmentPage /> },
  { path: "/student/grades", element: <GradesPage /> },
  { path: "/student/tuition", element: <TuitionPage /> },
  { path: "/student/evaluation", element: <EvaluationPage /> },

  { path: "/student/profile", element: <StudentProfilePage /> },
  { path: "/student/settings", element: <StudentSettingsPage /> },
  { path: "/student/reports", element: <AnalyticsPage /> },

  {
    path: "/student/notifications",
    element: <NotificationsPage userRole="student" userName="Student" />,
  },

  // ================= TEACHER =================
  {
    path: "/teacher",
    element: (
      <ProtectedRoute role="teacher">
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },

  { path: "/teacher/profile", element: <TeacherProfilePage /> },
  { path: "/teacher/settings", element: <TeacherSettingsPage /> },

  {
    path: "/teacher/notifications",
    element: <NotificationsPage userRole="teacher" userName="Teacher" />,
  },

  // ================= ADMIN =================
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },

  { path: "/admin/reports", element: <AdminReportsPage /> },
  { path: "/admin/profile", element: <AdminProfilePage /> },
  { path: "/admin/settings", element: <AdminSettingsPage /> },

  {
    path: "/admin/notifications",
    element: <NotificationsPage userRole="admin" userName="Administrator" />,
  },

  // ================= FINANCE =================
  {
    path: "/finance",
    element: (
      <ProtectedRoute role="finance">
        <FinanceDashboard />
      </ProtectedRoute>
    ),
  },

  { path: "/finance/profile", element: <FinanceProfilePage /> },
  { path: "/finance/settings", element: <FinanceSettingsPage /> },

  {
    path: "/finance/notifications",
    element: <NotificationsPage userRole="finance" userName="Finance Officer" />,
  },

  // ================= REGISTRAR =================
  {
    path: "/registrar",
    element: (
      <ProtectedRoute role="registrar">
        <RegistrarDashboard />
      </ProtectedRoute>
    ),
  },

  { path: "/registrar/enrollment", element: <RegistrarEnrollmentPage /> },
  { path: "/registrar/students", element: <RegistrarStudentRecordsPage /> },

  { path: "/registrar/profile", element: <RegistrarProfilePage /> },
  { path: "/registrar/settings", element: <RegistrarSettingsPage /> },

  {
    path: "/registrar/notifications",
    element: <NotificationsPage userRole="registrar" userName="Registrar Officer" />,
  },

  // ================= FALLBACK =================
  { path: "*", element: <Navigate to="/" /> },
]);