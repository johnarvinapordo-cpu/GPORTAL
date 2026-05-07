import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/student",
    Component: StudentDashboard,
  },
  {
    path: "/student/enrollment",
    Component: EnrollmentPage,
  },
  {
    path: "/student/grades",
    Component: GradesPage,
  },
  {
    path: "/student/tuition",
    Component: TuitionPage,
  },
  {
    path: "/student/evaluation",
    Component: EvaluationPage,
  },
  {
    path: "/teacher",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/courses",
    Component: CourseManagementPage,
  },
  {
    path: "/teacher/grades",
    Component: GradesPage,
  },
  {
    path: "/teacher/students",
    Component: StudentListPage,
  },
  {
    path: "/teacher/evaluation",
    Component: EvaluationPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/analytics",
    Component: AnalyticsPage,
  },
  {
    path: "/admin/students",
    Component: StudentListPage,
  },
  {
    path: "/admin/courses",
    Component: CourseManagementPage,
  },
  {
    path: "/admin/enrollment",
    Component: EnrollmentPage,
  },
  {
    path: "/admin/grades",
    Component: GradesPage,
  },
  {
    path: "/admin/financial",
    Component: TuitionPage,
  },
  {
    path: "/finance",
    Component: FinanceDashboard,
  },
  {
    path: "/finance/students",
    Component: FinanceStudentAccountsPage,
  },
  {
    path: "/finance/payments",
    Component: FinancePaymentsBillingPage,
  },
  {
    path: "/finance/reports",
    Component: FinanceReportsPage,
  },
  {
    path: "/finance/notifications",
    Component: () => <NotificationsPage userRole="finance" userName="Finance Officer" />,
  },
  {
    path: "/finance/profile",
    Component: () => <ProfilePage userRole="finance" userName="Finance Officer" />,
  },
  {
    path: "/registrar",
    Component: RegistrarDashboard,
  },
  {
    path: "/registrar/students",
    Component: RegistrarStudentRecordsPage,
  },
  {
    path: "/registrar/enrollment",
    Component: EnrollmentPage,
  },
  {
    path: "/registrar/grades",
    Component: GradesPage,
  },
  {
    path: "/registrar/courses",
    Component: CourseManagementPage,
  },
  {
    path: "/registrar/notifications",
    Component: () => <NotificationsPage userRole="registrar" userName="Registrar Officer" />,
  },
  {
    path: "/registrar/profile",
    Component: () => <ProfilePage userRole="registrar" userName="Registrar Officer" />,
  },
]);
