// @ts-nocheck
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getStoredUser } from "../../lib/api";

export default function EnrollmentPage() {
  const user = getStoredUser();

  const [courses, setCourses] = useState([
    { id: 1, code: "CS101", title: "Programming", units: 3, slots: 5 },
    { id: 2, code: "MATH201", title: "Calculus", units: 4, slots: 0 },
  ]);

  const [enrolled, setEnrolled] = useState<any[]>([]);

  const handleEnroll = (course: any) => {
    if (course.slots <= 0) return;

    setEnrolled([...enrolled, course]);
    setCourses(prev =>
      prev.map(c =>
        c.id === course.id ? { ...c, slots: c.slots - 1 } : c
      )
    );
  };

  return (
    <DashboardLayout userRole="student" userName={user?.name}>
      <h1 className="text-xl text-white mb-4">Enrollment</h1>

      {courses.map((c) => (
        <div key={c.id} className="text-white border-b py-2">
          {c.code} - {c.title}
          <button onClick={() => handleEnroll(c)} className="ml-3">
            Enroll
          </button>
        </div>
      ))}
    </DashboardLayout>
  );
}