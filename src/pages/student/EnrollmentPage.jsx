import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";

export default function EnrollmentPage() {

  const initialCourses = [
    { id: 1, code: "CS101", title: "Programming", units: 3, slots: 5 },
    { id: 2, code: "MATH201", title: "Calculus", units: 4, slots: 0 },
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [enrolled, setEnrolled] = useState([]);

  const handleEnroll = (course) => {
    if (course.slots <= 0) return;

    setEnrolled([...enrolled, course]);

    setCourses((prev) =>
      prev.map((c) =>
        c.id === course.id ? { ...c, slots: c.slots - 1 } : c
      )
    );
  };

  return (
    <DashboardLayout userRole="student" userName="Juan Dela Cruz">

      <PageHeader
        title="Enrollment"
        subtitle="Enroll in available courses"
      />

      <div className="bg-slate-900 border border-blue-900/30 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Title</th>
              <th className="p-3">Units</th>
              <th className="p-3">Slots</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => {
              const isEnrolled = enrolled.find(e => e.id === c.id);

              return (
                <tr key={c.id} className="border-b border-blue-900/30">
                  <td className="p-3 text-white">{c.code}</td>
                  <td className="p-3 text-white">{c.title}</td>
                  <td className="p-3 text-white">{c.units}</td>
                  <td className="p-3 text-blue-300">{c.slots}</td>

                  <td className="p-3">
                    <button
                      onClick={() => handleEnroll(c)}
                      disabled={c.slots <= 0 || isEnrolled}
                      className={`px-3 py-1 rounded text-white ${
                        isEnrolled
                          ? "bg-gray-500"
                          : c.slots > 0
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-red-500"
                      }`}
                    >
                      {isEnrolled ? "Enrolled" : "Enroll"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </DashboardLayout>
  );
}
