import { createBrowserRouter } from "react-router-dom";
import StudentDashboard from "./pages/student/StudentDashboard";

export const router = createBrowserRouter([
  {
    path: "/student",
    element: <StudentDashboard />,
  },
]);
