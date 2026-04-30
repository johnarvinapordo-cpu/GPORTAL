/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import RegistrarDashboard from './pages/registrar/RegistrarDashboard';
import FinanceDashboard from './pages/finance/FinanceDashboard';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';

export default function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard Routes with Shared Layout */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/login" replace />} />
              
              {/* Role specific dashboards */}
              <Route path="student/dashboard" element={<StudentDashboard />} />
              <Route path="teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="registrar/dashboard" element={<RegistrarDashboard />} />
              <Route path="finance/dashboard" element={<FinanceDashboard />} />
              
              {/* Fallback within dashboard */}
              <Route path="*" element={<div className="p-8 text-center text-muted-foreground">Feature coming soon or Page Not Found.</div>} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </TooltipProvider>
  );
}
