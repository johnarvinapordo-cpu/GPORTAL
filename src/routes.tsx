import { createBrowserRouter, Navigate, redirect, useLoaderData } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import RegistrarDashboard from './pages/registrar/Dashboard';
import FinanceDashboard from './pages/finance/Dashboard';
import type { AppUser } from './types';

type User = AppUser;

function getUserFromStorage(): User | null {
  const storedUser = localStorage.getItem('cmdi_user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  }
  return null;
}

function getDashboardComponent(role: User['role'], user: User) {
  const dashboardUser = user as any;

  switch (role) {
    case 'student':
      return <StudentDashboard user={dashboardUser} />;
    case 'teacher':
      return <TeacherDashboard user={dashboardUser} />;
    case 'admin':
      return <AdminDashboard user={dashboardUser} />;
    case 'registrar':
      return <RegistrarDashboard user={dashboardUser} />;
    case 'finance':
      return <FinanceDashboard user={dashboardUser} />;
    default:
      return <Navigate to="/login" replace />;
  }
}

function DashboardRoute() {
  const user = useLoaderData() as User;
  return getDashboardComponent(user.role, user);
}

function LoginRoute() {
  const handleLogin = (user: User) => {
    localStorage.setItem('cmdi_user', JSON.stringify(user));
    window.location.href = `/${user.role}`;
  };

  return <Login onLogin={handleLogin} />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginRoute />,
  },
  {
    path: '/dashboard',
    loader: () => {
      const user = getUserFromStorage();
      if (!user) {
        return redirect('/login');
      }
      return redirect(`/${user.role}`);
    },
  },
  {
    path: '/student',
    loader: () => {
      const user = getUserFromStorage();
      if (!user || user.role !== 'student') {
        return redirect('/login');
      }
      return user;
    },
    element: <DashboardRoute />,
  },
  {
    path: '/teacher',
    loader: () => {
      const user = getUserFromStorage();
      if (!user || user.role !== 'teacher') {
        return redirect('/login');
      }
      return user;
    },
    element: <DashboardRoute />,
  },
  {
    path: '/admin',
    loader: () => {
      const user = getUserFromStorage();
      if (!user || user.role !== 'admin') {
        return redirect('/login');
      }
      return user;
    },
    element: <DashboardRoute />,
  },
  {
    path: '/registrar',
    loader: () => {
      const user = getUserFromStorage();
      if (!user || user.role !== 'registrar') {
        return redirect('/login');
      }
      return user;
    },
    element: <DashboardRoute />,
  },
  {
    path: '/finance',
    loader: () => {
      const user = getUserFromStorage();
      if (!user || user.role !== 'finance') {
        return redirect('/login');
      }
      return user;
    },
    element: <DashboardRoute />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
