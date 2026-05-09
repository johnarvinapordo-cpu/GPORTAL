import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

// DASHBOARDS
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import RegistrarDashboard from "./pages/RegistrarDashboard";

// STUDENT
import EnrollmentPage from "./pages/EnrollmentPage";
import GradesPage from "./pages/GradesPage";
import TuitionPage from "./pages/TuitionPage";
import EvaluationPage from "./pages/EvaluationPage";
import StudentProfilePage from "./pages/profile/StudentProfilePage";
import StudentSettingsPage from "./pages/settings/StudentSettingsPage";

// TEACHER
import TeacherProfilePage from "./pages/profile/TeacherProfilePage";
import TeacherSettingsPage from "./pages/settings/TeacherSettingsPage";

// ADMIN
import AdminReportsPage from "./pages/AdminReportsPage";
import AdminProfilePage from "./pages/profile/AdminProfilePage";
import AdminSettingsPage from "./pages/settings/AdminSettingsPage";

// FINANCE
import FinanceProfilePage from "./pages/profile/FinanceProfilePage";
import FinanceSettingsPage from "./pages/settings/FinanceSettingsPage";
import FinanceStudentAccountsPage from "./pages/FinanceStudentAccountsPage";
import FinancePaymentsBillingPage from "./pages/FinancePaymentsBillingPage";
import FinanceReportsPage from "./pages/FinanceReportsPage";

// REGISTRAR
import RegistrarEnrollmentPage from "./pages/RegistrarEnrollmentPage";
import RegistrarStudentRecordsPage from "./pages/RegistrarStudentRecordsPage";
import RegistrarProfilePage from "./pages/profile/RegistrarProfilePage";
import RegistrarSettingsPage from "./pages/settings/RegistrarSettingsPage";

// SHARED
import NotificationsPage from "./pages/NotificationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, role }: any) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const storedUser = JSON.parse(localStorage.getItem("cmdi_user") || "null");
  const activeUser = user || storedUser;

  if (!activeUser) return <Navigate to="/" replace />;

  const activeRole = activeUser.role?.toLowerCase()?.trim();

  if (role && activeRole !== role) {
    return <Navigate to={`/${activeRole}`} replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },

  // STUDENT
  {
    path: "/student",
    element: <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>,
  },
  {
    path: "/student/enrollment",
    element: <ProtectedRoute role="student"><EnrollmentPage /></ProtectedRoute>,
  },
  {
    path: "/student/grades",
    element: <ProtectedRoute role="student"><GradesPage /></ProtectedRoute>,
  },
  {
    path: "/student/tuition",
    element: <ProtectedRoute role="student"><TuitionPage /></ProtectedRoute>,
  },
  {
    path: "/student/evaluation",
    element: <ProtectedRoute role="student"><EvaluationPage /></ProtectedRoute>,
  },
  {
    path: "/student/profile",
    element: <ProtectedRoute role="student"><StudentProfilePage /></ProtectedRoute>,
  },
  {
    path: "/student/settings",
    element: <ProtectedRoute role="student"><StudentSettingsPage /></ProtectedRoute>,
  },
  {
    path: "/student/reports",
    element: <ProtectedRoute role="student"><AnalyticsPage /></ProtectedRoute>,
  },
  {
    path: "/student/notifications",
    element: <ProtectedRoute role="student"><NotificationsPage userRole="student" userName="Student" /></ProtectedRoute>,
  },

  // TEACHER
  {
    path: "/teacher",
    element: <ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>,
  },
  {
    path: "/teacher/profile",
    element: <ProtectedRoute role="teacher"><TeacherProfilePage /></ProtectedRoute>,
  },
  {
    path: "/teacher/settings",
    element: <ProtectedRoute role="teacher"><TeacherSettingsPage /></ProtectedRoute>,
  },

  // ADMIN
  {
    path: "/admin",
    element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: "/admin/reports",
    element: <ProtectedRoute role="admin"><AdminReportsPage /></ProtectedRoute>,
  },
  {
    path: "/admin/profile",
    element: <ProtectedRoute role="admin"><AdminProfilePage /></ProtectedRoute>,
  },
  {
    path: "/admin/settings",
    element: <ProtectedRoute role="admin"><AdminSettingsPage /></ProtectedRoute>,
  },

  // FINANCE
  {
    path: "/finance",
    element: <ProtectedRoute role="finance"><FinanceDashboard /></ProtectedRoute>,
  },
  {
    path: "/finance/students",
    element: <ProtectedRoute role="finance"><FinanceStudentAccountsPage /></ProtectedRoute>,
  },
  {
    path: "/finance/payments",
    element: <ProtectedRoute role="finance"><FinancePaymentsBillingPage /></ProtectedRoute>,
  },
  {
    path: "/finance/reports",
    element: <ProtectedRoute role="finance"><FinanceReportsPage /></ProtectedRoute>,
  },
  {
    path: "/finance/profile",
    element: <ProtectedRoute role="finance"><FinanceProfilePage /></ProtectedRoute>,
  },
  {
    path: "/finance/settings",
    element: <ProtectedRoute role="finance"><FinanceSettingsPage /></ProtectedRoute>,
  },

  // REGISTRAR
  {
    path: "/registrar",
    element: <ProtectedRoute role="registrar"><RegistrarDashboard /></ProtectedRoute>,
  },
  {
    path: "/registrar/enrollment",
    element: <ProtectedRoute role="registrar"><RegistrarEnrollmentPage /></ProtectedRoute>,
  },
  {
    path: "/registrar/students",
    element: <ProtectedRoute role="registrar"><RegistrarStudentRecordsPage /></ProtectedRoute>,
  },
  {
    path: "/registrar/profile",
    element: <ProtectedRoute role="registrar"><RegistrarProfilePage /></ProtectedRoute>,
  },
  {
    path: "/registrar/settings",
    element: <ProtectedRoute role="registrar"><RegistrarSettingsPage /></ProtectedRoute>,
  },

  { path: "*", element: <Navigate to="/" /> },
]);