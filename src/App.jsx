import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegistrarDashboard from "./pages/registrar/RegistrarDashboard";
import FinanceDashboard from "./pages/finance/FinanceDashboard";

import {
  AnalyticsPage,
  CourseManagementPage,
  EnrollmentPage,
  EvaluationPage,
  financeItems,
  GradesPage,
  NotificationPage,
  recordsItems,
  SimpleWorkQueuePage,
  StudentListPage,
  TeacherManagementPage,
  TuitionPage,
} from "./pages/shared/PortalPages";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },

  // STUDENT
  { path: "/student", element: <StudentDashboard /> },
  { path: "/student/enrollment", element: <EnrollmentPage /> },
  { path: "/student/grades", element: <GradesPage /> },
  { path: "/student/tuition", element: <TuitionPage /> },
  { path: "/student/evaluation", element: <EvaluationPage /> },
  { path: "/student/notifications", element: <NotificationPage /> },
  {
    path: "/student/profile",
    element: (
      <SimpleWorkQueuePage
        title="Student Profile"
        description="Personal information, program details, and account status"
        items={[
          { title: "Juan Dela Cruz", meta: "BS Computer Science • 4th Year • Active", status: "Verified" },
          { title: "Academic Adviser", meta: "Prof. Maria Santos • Computer Science Department", status: "Assigned" },
          { title: "Contact Information", meta: "juan.delacruz@cmdi.edu.ph • +63 912 345 6789", status: "Current" },
        ]}
      />
    ),
  },

  // TEACHER
  { path: "/teacher", element: <TeacherDashboard /> },
  { path: "/teacher/courses", element: <CourseManagementPage /> },
  { path: "/teacher/grades", element: <GradesPage /> },
  { path: "/teacher/students", element: <StudentListPage /> },
  { path: "/teacher/evaluation", element: <EvaluationPage /> },

  {
    path: "/teacher/notifications",
    element: (
      <SimpleWorkQueuePage
        title="Notifications"
        description="Recent updates and alerts"
        items={[
          { title: "New LMS Features Available", meta: "IT Services • March 10, 2026", status: "Read" },
        ]}
      />
    ),
  },

  {
    path: "/teacher/profile",
    element: (
      <SimpleWorkQueuePage
        title="Faculty Profile"
        description="Teaching profile, load assignment, and department details"
        items={[
          { title: "Prof. Maria Santos", meta: "Computer Science Department • Full-time Faculty", status: "Active" },
          { title: "Current Teaching Load", meta: "CS101, CS201, CS301 • 95 students", status: "Approved" },
          { title: "Evaluation Summary", meta: "Average rating 4.5/5.0", status: "Published" },
        ]}
      />
    ),
  },

  // ADMIN
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/students", element: <StudentListPage /> },
  { path: "/admin/teachers", element: <TeacherManagementPage /> },
  { path: "/admin/courses", element: <CourseManagementPage /> },
  { path: "/admin/enrollment", element: <EnrollmentPage /> },
  { path: "/admin/grades", element: <GradesPage /> },
  { path: "/admin/financial", element: <TuitionPage /> },
  { path: "/admin/evaluations", element: <EvaluationPage /> },
  { path: "/admin/reports", element: <AnalyticsPage /> },
  { path: "/admin/analytics", element: <AnalyticsPage /> },
  {
    path: "/admin/settings",
    element: (
      <SimpleWorkQueuePage
        title="System Settings"
        description="Portal configuration, access control, and academic term setup"
        items={[
          { title: "Academic Year 2025-2026", meta: "2nd Semester • Enrollment active", status: "Active" },
          { title: "Role Permissions", meta: "Student, Teacher, Admin, Registrar, Finance", status: "Configured" },
          { title: "Notification Templates", meta: "Enrollment, grades, billing, evaluations", status: "Ready" },
        ]}
      />
    ),
  },

  // REGISTRAR
  { path: "/registrar", element: <RegistrarDashboard /> },
  { path: "/registrar/enrollment", element: <EnrollmentPage /> },
  {
    path: "/registrar/records",
    element: <SimpleWorkQueuePage title="Student Records" description="Transcript, certificates, and academic document requests" items={recordsItems} />,
  },
  { path: "/registrar/courses", element: <CourseManagementPage /> },
  { path: "/registrar/rosters", element: <StudentListPage /> },
  { path: "/registrar/reports", element: <AnalyticsPage /> },

  // FINANCE
  { path: "/finance", element: <FinanceDashboard /> },
  {
    path: "/finance/payments",
    element: <SimpleWorkQueuePage title="Payment Ledger" description="Cashier, bank transfer, and online payment review" items={financeItems} />,
  },
  { path: "/finance/balances", element: <TuitionPage /> },
  {
    path: "/finance/statements",
    element: <SimpleWorkQueuePage title="Statements" description="Student billing statements and account notices" items={financeItems} />,
  },
  {
    path: "/finance/collections",
    element: <SimpleWorkQueuePage title="Collections" description="Outstanding accounts, reminders, and cashier follow-ups" items={financeItems} />,
  },
  { path: "/finance/reports", element: <AnalyticsPage finance /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}