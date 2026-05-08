import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import RegistrarDashboard from "./pages/RegistrarDashboard";

import EnrollmentPage from "./pages/EnrollmentPage";
import GradesPage from "./pages/GradesPage";
import TuitionPage from "./pages/TuitionPage";
import EvaluationPage from "./pages/EvaluationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import StudentListPage from "./pages/StudentListPage";
import CourseManagementPage from "./pages/CourseManagementPage";

import FinanceStudentAccountsPage from "./pages/FinanceStudentAccountsPage";
import FinancePaymentsBillingPage from "./pages/FinancePaymentsBillingPage";
import FinanceReportsPage from "./pages/FinanceReportsPage";

import RegistrarStudentRecordsPage from "./pages/RegistrarStudentRecordsPage";

import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";


// 🔐 simple auth guard
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("cmdi_user") || "null");
  } catch {
    return null;
  }
};

import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, role }: any) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/" replace />;

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  // LOGIN
  {
    path: "/",
    element: <LoginPage />,
  },

  // STUDENT
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

  // TEACHER
  {
    path: "/teacher",
    element: (
      <ProtectedRoute role="teacher">
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  { path: "/teacher/courses", element: <CourseManagementPage /> },
  { path: "/teacher/grades", element: <GradesPage /> },
  { path: "/teacher/students", element: <StudentListPage /> },
  { path: "/teacher/evaluation", element: <EvaluationPage /> },

  // ADMIN
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  { path: "/admin/analytics", element: <AnalyticsPage /> },
  { path: "/admin/students", element: <StudentListPage /> },
  { path: "/admin/courses", element: <CourseManagementPage /> },
  { path: "/admin/enrollment", element: <EnrollmentPage /> },
  { path: "/admin/grades", element: <GradesPage /> },
  { path: "/admin/financial", element: <TuitionPage /> },

  // FINANCE
  {
    path: "/finance",
    element: (
      <ProtectedRoute role="finance">
        <FinanceDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/finance/students",
    element: <FinanceStudentAccountsPage />,
  },
  {
    path: "/finance/payments",
    element: <FinancePaymentsBillingPage />,
  },
  {
    path: "/finance/reports",
    element: <FinanceReportsPage />,
  },
  {
    path: "/finance/notifications",
    element: (
      <NotificationsPage userRole="finance" userName="Finance Officer" />
    ),
  },
  {
    path: "/finance/profile",
    element: (
      <ProfilePage userRole="finance" userName="Finance Officer" />
    ),
  },

  // REGISTRAR
  {
    path: "/registrar",
    element: (
      <ProtectedRoute role="registrar">
        <RegistrarDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/registrar/students",
    element: <RegistrarStudentRecordsPage />,
  },
  {
    path: "/registrar/enrollment",
    element: <EnrollmentPage />,
  },
  {
    path: "/registrar/grades",
    element: <GradesPage />,
  },
  {
    path: "/registrar/courses",
    element: <CourseManagementPage />,
  },
  {
    path: "/registrar/notifications",
    element: (
      <NotificationsPage userRole="registrar" userName="Registrar Officer" />
    ),
  },
  {
    path: "/registrar/profile",
    element: (
      <ProfilePage userRole="registrar" userName="Registrar Officer" />
    ),
  },

  // FALLBACK (IMPORTANT FIX)
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);