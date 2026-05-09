import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import RegistrarDashboard from "./pages/RegistrarDashboard";

import EnrollmentPage from "./pages/EnrollmentPage";
import RegistrarEnrollmentPage from "./pages/RegistrarEnrollmentPage";

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

// ✅ NEW IMPORT (FIX)
import AdminReportsPage from "./pages/AdminReportsPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import { useAuth } from "./context/AuthContext";

// AUTH GUARD
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

  // ================= LOGIN =================
  {
    path: "/",
    element: <LoginPage />,
  },

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

  // ================= TEACHER =================
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

  {
    path: "/teacher/reports",
    element: <AnalyticsPage />,
  },

  {
    path: "/teacher/notifications",
    element: (
      <NotificationsPage userRole="teacher" userName="Teacher" />
    ),
  },

  {
    path: "/teacher/profile",
    element: (
      <ProfilePage userRole="teacher" userName="Teacher" />
    ),
  },

  {
    path: "/teacher/settings",
    element: (
      <ProfilePage userRole="teacher" userName="Teacher" />
    ),
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

  { path: "/admin/analytics", element: <AnalyticsPage /> },

  { path: "/admin/students", element: <StudentListPage /> },
  { path: "/admin/courses", element: <CourseManagementPage /> },
  { path: "/admin/enrollment", element: <EnrollmentPage /> },
  { path: "/admin/grades", element: <GradesPage /> },
  { path: "/admin/financial", element: <TuitionPage /> },

  // ✅ FIXED: REAL SEPARATE REPORT PAGE
  {
    path: "/admin/reports",
    element: <AdminReportsPage />,
  },

  {
    path: "/admin/notifications",
    element: (
      <NotificationsPage userRole="admin" userName="Administrator" />
    ),
  },

{
  path: "/admin/profile",
  element: <AdminProfilePage />,
},
{
  path: "/admin/settings",
  element: <AdminSettingsPage />,
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
  { path: "/finance/students", element: <FinanceStudentAccountsPage /> },
  { path: "/finance/payments", element: <FinancePaymentsBillingPage /> },
  { path: "/finance/reports", element: <FinanceReportsPage /> },

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

  {
    path: "/registrar/students",
    element: <RegistrarStudentRecordsPage />,
  },

  {
    path: "/registrar/subjects",
    element: <CourseManagementPage />,
  },

  {
    path: "/registrar/reports",
    element: <AnalyticsPage />,
  },

  {
    path: "/registrar/settings",
    element: (
      <ProfilePage userRole="registrar" userName="Registrar Officer" />
    ),
  },

  // ================= STUDENT EXTRA PAGES =================
  {
    path: "/student/notifications",
    element: (
      <NotificationsPage userRole="student" userName="Student" />
    ),
  },

  {
    path: "/student/profile",
    element: (
      <ProfilePage userRole="student" userName="Student" />
    ),
  },

  {
    path: "/student/reports",
    element: <AnalyticsPage />,
  },

  {
    path: "/student/settings",
    element: (
      <ProfilePage userRole="student" userName="Student" />
    ),
  },

  // ================= FALLBACK =================
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);