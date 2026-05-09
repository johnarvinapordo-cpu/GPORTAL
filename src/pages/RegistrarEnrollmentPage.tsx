import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
} from "lucide-react";

type EnrollmentStatus = "pending" | "approved" | "rejected";

interface Enrollment {
  id: string;
  studentName: string;
  course: string;
  yearLevel: string;
  status: EnrollmentStatus;
  date: string;
}

export default function RegistrarEnrollmentPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const enrollments: Enrollment[] = [
    {
      id: "ENR-001",
      studentName: "Juan Dela Cruz",
      course: "BSIT",
      yearLevel: "1st Year",
      status: "pending",
      date: "2026-05-01",
    },
    {
      id: "ENR-002",
      studentName: "Maria Santos",
      course: "BSBA",
      yearLevel: "2nd Year",
      status: "approved",
      date: "2026-05-02",
    },
    {
      id: "ENR-003",
      studentName: "Mark Reyes",
      course: "BSIT",
      yearLevel: "3rd Year",
      status: "rejected",
      date: "2026-05-03",
    },
  ];

  const filtered = enrollments.filter((e) => {
    const matchesSearch =
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || e.status === filter;

    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status: EnrollmentStatus) => {
    if (status === "approved") {
      return (
        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs w-fit">
          <CheckCircle className="w-4 h-4" />
          Approved
        </span>
      );
    }

    if (status === "rejected") {
      return (
        <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs w-fit">
          <XCircle className="w-4 h-4" />
          Rejected
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs w-fit">
        <Clock className="w-4 h-4" />
        Pending
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Enrollment Management
        </h1>

        <p className="text-sm text-gray-500">
          Registrar enrollment processing dashboard
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        {/* SEARCH */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-1/2">
          <Search className="w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search student or course..."
            className="w-full outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTER */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />

          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Year</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((e) => (
              <tr
                key={e.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{e.id}</td>
                <td className="p-4">{e.studentName}</td>
                <td className="p-4">{e.course}</td>
                <td className="p-4">{e.yearLevel}</td>
                <td className="p-4">{statusBadge(e.status)}</td>
                <td className="p-4 text-gray-500">{e.date}</td>

                <td className="p-4 text-right">
                  <button className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}