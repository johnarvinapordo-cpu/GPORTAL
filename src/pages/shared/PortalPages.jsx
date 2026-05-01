import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bell,
  BookOpen,
  CheckCircle,
  CreditCard,
  DollarSign,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Mail,
  Phone,
  Plus,
  Search,
  Send,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/progress";
import { Textarea } from "../../components/ui/textarea";

const roleNames = {
  student: "Juan Dela Cruz",
  teacher: "Prof. Maria Santos",
  admin: "Admin User",
  registrar: "Registrar Office",
  finance: "Finance Office",
};

function usePortalUser() {
  const { pathname } = useLocation();
  const role =
    ["student", "teacher", "admin", "registrar", "finance"].find((item) =>
      pathname.includes(`/${item}`)
    ) ?? "admin";

  return { role, name: roleNames[role] };
}

function PageShell({ children }) {
  const { role, name } = usePortalUser();
  return (
    <DashboardLayout userRole={role} userName={name}>
      {children}
    </DashboardLayout>
  );
}

function Card({ children, className = "" }) {
  return (
    <section className={`rounded-lg border border-border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function CardHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function MiniStat({ title, value, tone = "" }) {
  return (
    <Card>
      <div className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className={`mt-2 text-3xl font-bold ${tone}`}>{value}</p>
      </div>
    </Card>
  );
}

function NativeSelect({ value, onChange, children, className = "" }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring ${className}`}
    >
      {children}
    </select>
  );
}

function TableWrap({ children }) {
  return <div className="overflow-x-auto rounded-md border">{children}</div>;
}

function DataTable({ headers, children }) {
  return (
    <table className="w-full min-w-[900px] caption-bottom text-sm">
      <thead className="[&_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50">
          {headers.map((header) => (
            <th key={header} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
    </table>
  );
}

function Td({ children, className = "" }) {
  return <td className={`p-4 align-middle ${className}`}>{children}</td>;
}

export function EnrollmentPage() {
  const { role } = usePortalUser();
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState("all");
  const courses = [
    ["CS101", "Introduction to Programming", 3, "MWF 9:00-10:00 AM", "Prof. Maria Santos", 5, "CS"],
    ["CS201", "Data Structures and Algorithms", 3, "TTh 10:00-11:30 AM", "Prof. Jose Garcia", 8, "CS"],
    ["CS301", "Software Engineering", 3, "MWF 2:00-3:00 PM", "Prof. Ana Reyes", 2, "CS"],
    ["MATH201", "Calculus I", 3, "TTh 1:00-2:30 PM", "Prof. Roberto Cruz", 10, "MATH"],
    ["ENG102", "English Composition", 3, "MWF 1:00-2:00 PM", "Prof. Carmen Silva", 0, "ENG"],
    ["BUS101", "Principles of Management", 3, "MWF 11:00-12:00 PM", "Prof. Miguel Santos", 15, "BUS"],
    ["PE101", "Physical Education", 2, "TTh 3:00-4:30 PM", "Coach Roberto Cruz", 20, "PE"],
  ];
  const filtered = courses.filter(([code, title, , , instructor, , itemProgram]) => {
    const text = `${code} ${title} ${instructor}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (program === "all" || program === itemProgram);
  });

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Course Enrollment</h1>
          <p className="text-muted-foreground">Browse and enroll in available courses</p>
        </div>
        <Card>
          <CardHeader title="Search and Filter Courses" description="Find the perfect courses for your academic journey" />
          <div className="flex flex-col gap-4 p-6 pt-0 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search by course code, title, or instructor..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <NativeSelect value={program} onChange={setProgram} className="w-full md:w-64">
              <option value="all">All Programs</option>
              <option value="CS">Computer Science</option>
              <option value="MATH">Mathematics</option>
              <option value="ENG">English</option>
              <option value="BUS">Business</option>
              <option value="PE">Physical Education</option>
            </NativeSelect>
          </div>
        </Card>
        <Card>
          <CardHeader title={role === "registrar" ? "Enrollment Requests" : "Available Courses"} description={`${filtered.length} course(s) available for enrollment`} />
          <div className="p-6 pt-0">
            <TableWrap>
              <DataTable headers={["Course Code", "Course Title", "Units", "Schedule", "Instructor", "Slots Available", "Action"]}>
                {filtered.map(([code, title, units, schedule, instructor, slots]) => (
                  <tr key={code} className="border-b">
                    <Td className="font-medium">{code}</Td>
                    <Td>{title}</Td>
                    <Td>{units}</Td>
                    <Td>{schedule}</Td>
                    <Td>{instructor}</Td>
                    <Td>
                      <Badge variant={slots === 0 ? "destructive" : slots < 5 ? "outline" : "secondary"}>{slots === 0 ? "Full" : `${slots} left`}</Badge>
                    </Td>
                    <Td><Button size="sm" disabled={slots === 0}>{role === "student" ? "Enroll" : "Review"}</Button></Td>
                  </tr>
                ))}
              </DataTable>
            </TableWrap>
          </div>
        </Card>
        <div className="grid gap-6 md:grid-cols-3">
          <MiniStat title="Total Units Selected" value="0" />
          <MiniStat title="Courses Enrolled" value="0" />
          <Card><div className="p-6"><p className="text-sm font-medium text-muted-foreground">Enrollment Status</p><Badge className="mt-3" variant="outline">Not Finalized</Badge></div></Card>
        </div>
      </div>
    </PageShell>
  );
}

export function GradesPage() {
  const { role } = usePortalUser();
  const [course, setCourse] = useState("CS101");
  const studentGrades = [
    ["CS101", "Introduction to Programming", "1.75", "1.50", "1.62", "Passed"],
    ["MATH201", "Calculus I", "2.00", "2.25", "2.12", "Passed"],
    ["ENG102", "English Composition", "1.50", "1.75", "1.62", "Passed"],
    ["PE101", "Physical Education", "1.25", "1.25", "1.25", "Passed"],
  ];
  const courseStudents = [
    ["2021-0001", "Juan Dela Cruz", "1.75", "1.50", "1.62"],
    ["2021-0002", "Maria Garcia", "1.50", "1.25", "1.38"],
    ["2021-0003", "Jose Santos", "2.00", "2.25", "2.12"],
    ["2021-0004", "Ana Reyes", "1.25", "1.50", "1.38"],
    ["2021-0005", "Pedro Cruz", "2.50", "2.00", "2.25"],
  ];
  const gpa = (items) => (items.reduce((sum, item) => sum + Number(item[4]), 0) / items.length).toFixed(2);

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{role === "student" ? "My Grades" : "Grade Management"}</h1>
          <p className="text-muted-foreground">{role === "student" ? "View your academic performance and grades" : "Enter and manage student grades"}</p>
        </div>
        {role === "student" ? (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <MiniStat title="Current Semester GPA" value={gpa(studentGrades)} tone="text-primary" />
              <MiniStat title="Enrolled Courses" value={studentGrades.length} />
              <MiniStat title="Total Units" value="11" />
            </div>
            <Card>
              <CardHeader title="Grade Summary" description="2nd Semester, AY 2025-2026" action={<Button variant="outline"><Download className="mr-2 h-4 w-4" />Download Report</Button>} />
              <div className="p-6 pt-0">
                <TableWrap><DataTable headers={["Course Code", "Course Title", "Midterm", "Final", "GPA", "Remarks"]}>
                  {studentGrades.map((grade) => <tr key={grade[0]} className="border-b">{grade.map((item, index) => <Td key={index} className={index === 4 ? "font-semibold text-primary" : ""}>{index === 5 ? <Badge variant="secondary">{item}</Badge> : item}</Td>)}</tr>)}
                </DataTable></TableWrap>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader title="Select Course" description="Choose a course to enter or edit grades" />
              <div className="p-6 pt-0">
                <NativeSelect value={course} onChange={setCourse} className="w-full">
                  <option value="CS101">CS101 - Introduction to Programming - Section A</option>
                  <option value="CS201">CS201 - Data Structures - Section B</option>
                  <option value="CS301">CS301 - Software Engineering - Section A</option>
                </NativeSelect>
              </div>
            </Card>
            <Card>
              <CardHeader title={`Student Grades - ${course}`} description={`${courseStudents.length} students enrolled`} action={<div className="flex gap-2"><Button variant="outline">Save Draft</Button><Button>Submit Grades</Button></div>} />
              <div className="p-6 pt-0">
                <TableWrap><DataTable headers={["Student ID", "Student Name", "Midterm Grade", "Final Grade", "GPA"]}>
                  {courseStudents.map((student) => <tr key={student[0]} className="border-b"><Td className="font-medium">{student[0]}</Td><Td>{student[1]}</Td><Td><Input className="w-24 text-center" defaultValue={student[2]} /></Td><Td><Input className="w-24 text-center" defaultValue={student[3]} /></Td><Td className="font-semibold text-primary">{student[4]}</Td></tr>)}
                </DataTable></TableWrap>
              </div>
            </Card>
            <div className="grid gap-6 md:grid-cols-4"><MiniStat title="Class Average" value="1.86" /><MiniStat title="Passing Rate" value="100%" tone="text-green-600" /><MiniStat title="Dean's Listers" value="3" /><Card><div className="p-6"><p className="text-sm text-muted-foreground">Status</p><Badge className="mt-3" variant="outline">Draft</Badge></div></Card></div>
          </>
        )}
      </div>
    </PageShell>
  );
}

export function TuitionPage() {
  const rows = [
    ["PAY-2026-001", "January 15, 2026", "PHP 10,000", "Bank Transfer", "Completed"],
    ["PAY-2026-002", "February 10, 2026", "PHP 5,000", "Cash", "Completed"],
    ["PAY-2026-003", "March 5, 2026", "PHP 10,000", "Credit Card", "Completed"],
  ];
  const fees = [["Tuition Fee", 18000], ["Laboratory Fee", 3000], ["Library Fee", 1500], ["Internet Fee", 1000], ["Miscellaneous Fee", 1500]];
  return (
    <PageShell>
      <div className="space-y-6">
        <div><h1 className="text-3xl font-bold">Tuition & Financial Services</h1><p className="text-muted-foreground">Manage your tuition payments and view financial records</p></div>
        <div className="grid gap-6 md:grid-cols-4">
          <MiniStat title="Total Tuition" value="PHP 25,000" />
          <MiniStat title="Amount Paid" value="PHP 25,000" tone="text-green-600" />
          <MiniStat title="Remaining Balance" value="PHP 0" tone="text-green-600" />
          <Card><div className="p-6"><p className="text-sm font-medium">Payment Status</p><Progress value={100} className="mt-4" /><p className="mt-2 text-sm font-medium">100% Paid</p></div></Card>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card><CardHeader title="Tuition Fee Breakdown" description="2nd Semester, AY 2025-2026" /><div className="space-y-3 p-6 pt-0">{fees.map(([name, amount]) => <div key={name} className="flex justify-between"><span className="text-muted-foreground">{name}</span><span className="font-medium">PHP {amount.toLocaleString()}</span></div>)}<div className="flex justify-between border-t-2 border-primary pt-3 text-lg font-bold"><span>Total</span><span className="text-primary">PHP 25,000</span></div></div></Card>
          <Card><CardHeader title="Payment Options" description="Choose your preferred payment method" /><div className="space-y-3 p-6 pt-0">{["Online Banking", "Credit/Debit Card", "Over-the-Counter", "Installment Plan"].map((item, index) => <div key={item} className="rounded-lg border p-4"><div className="flex justify-between"><h3 className="font-semibold">{item}</h3>{index === 0 && <Badge variant="secondary">Recommended</Badge>}</div><p className="mt-2 text-sm text-muted-foreground">Secure payment processing through CMDI financial services.</p></div>)}</div></Card>
        </div>
        <Card><CardHeader title="Payment History" description="View all your previous payments" action={<Button variant="outline"><Download className="mr-2 h-4 w-4" />Export All</Button>} /><div className="p-6 pt-0"><TableWrap><DataTable headers={["Payment ID", "Date", "Amount", "Payment Method", "Status", "Receipt"]}>{rows.map((row) => <tr key={row[0]} className="border-b">{row.map((item, index) => <Td key={item}>{index === 4 ? <Badge className="bg-green-100 text-green-700" variant="secondary">{item}</Badge> : item}</Td>)}<Td><Button size="sm" variant="ghost"><Download className="mr-1 h-4 w-4" />Download</Button></Td></tr>)}</DataTable></TableWrap></div></Card>
      </div>
    </PageShell>
  );
}

export function EvaluationPage() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [ratings, setRatings] = useState({});
  const questions = ["Teaching effectiveness", "Course organization", "Communication", "Subject knowledge", "Availability", "Overall rating"];
  const courses = [["CS101", "Introduction to Programming", "Prof. Maria Santos", "Pending"], ["MATH201", "Calculus I", "Prof. Jose Garcia", "Pending"], ["ENG102", "English Composition", "Prof. Ana Reyes", "Completed"], ["PE101", "Physical Education", "Coach Roberto Cruz", "Pending"]];
  return (
    <PageShell>
      <div className="space-y-6">
        <div><h1 className="text-3xl font-bold">Teacher Evaluation</h1><p className="text-muted-foreground">Your feedback helps improve the quality of education at CMDI</p></div>
        <Card><CardHeader title="Select Course to Evaluate" description="Choose from your enrolled courses this semester" /><div className="grid gap-4 p-6 pt-0 md:grid-cols-2">{courses.map(([code, title, instructor, status]) => <button key={code} type="button" disabled={status === "Completed"} onClick={() => setSelectedCourse(code)} className={`rounded-lg border-2 p-4 text-left transition ${selectedCourse === code ? "border-primary bg-primary/5" : status === "Completed" ? "border-green-200 bg-green-50 opacity-60" : "border-border hover:border-primary/50"}`}><div className="flex justify-between gap-4"><div><h3 className="font-semibold">{code}</h3><p className="text-sm text-muted-foreground">{title}</p></div><Badge variant={status === "Completed" ? "secondary" : "outline"}>{status}</Badge></div><p className="mt-2 text-sm font-medium">{instructor}</p></button>)}</div></Card>
        {selectedCourse ? (
          <>
            <Card><CardHeader title="Evaluation Form" description={`Rate your experience with ${courses.find((item) => item[0] === selectedCourse)?.[2]}`} /><div className="space-y-6 p-6 pt-0">{questions.map((question) => <div key={question} className="space-y-3"><div className="flex justify-between gap-4"><label className="font-medium">{question}</label><div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`h-5 w-5 ${star <= Number(ratings[question] ?? 0) ? "fill-accent text-accent" : "text-gray-300"}`} />)}</div></div><div className="grid gap-2 sm:grid-cols-5">{["Poor", "Fair", "Good", "Very Good", "Excellent"].map((label, index) => <button key={label} type="button" onClick={() => setRatings({ ...ratings, [question]: index + 1 })} className={`rounded-md border px-3 py-2 text-sm ${Number(ratings[question]) === index + 1 ? "border-primary bg-primary/10" : "hover:bg-muted"}`}>{label}</button>)}</div></div>)}</div></Card>
            <Card><CardHeader title="Additional Comments (Optional)" description="Share any additional feedback or suggestions" /><div className="p-6 pt-0"><Textarea rows={6} placeholder="Your comments and suggestions help us improve the quality of education..." /></div></Card>
            <div className="flex justify-end"><Button size="lg"><Send className="mr-2 h-4 w-4" />Submit Evaluation</Button></div>
          </>
        ) : <Card className="border-dashed"><div className="p-12 text-center text-muted-foreground">Please select a course from above to begin evaluation</div></Card>}
      </div>
    </PageShell>
  );
}

export function CourseManagementPage() {
  const { role } = usePortalUser();
  const [query, setQuery] = useState("");
  const courses = [
    ["CS101", "Introduction to Programming", "Computer Science", 3, "A", "MWF 9:00-10:00 AM", "Lab 101", "Prof. Maria Santos", 35, 40],
    ["CS201", "Data Structures and Algorithms", "Computer Science", 3, "B", "TTh 10:00-11:30 AM", "Lab 102", "Prof. Jose Garcia", 28, 35],
    ["CS301", "Software Engineering", "Computer Science", 3, "A", "MWF 2:00-3:00 PM", "Lab 103", "Prof. Maria Santos", 32, 35],
    ["MATH201", "Calculus I", "Mathematics", 3, "A", "TTh 1:00-2:30 PM", "Room 201", "Prof. Roberto Cruz", 42, 45],
    ["BUS101", "Principles of Management", "Business", 3, "A", "MWF 11:00-12:00 PM", "Room 401", "Prof. Miguel Santos", 35, 50],
  ];
  const filtered = courses.filter((course) => course.join(" ").toLowerCase().includes(query.toLowerCase()));
  return (
    <PageShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold">Course Management</h1><p className="text-muted-foreground">Manage courses, schedules, and enrollments</p></div>{role === "admin" && <Button><Plus className="mr-2 h-4 w-4" />Add New Course</Button>}</div>
        <div className="grid gap-6 md:grid-cols-4"><MiniStat title="Total Courses" value={courses.length} /><MiniStat title="Total Enrolled" value={courses.reduce((a, c) => a + c[8], 0)} tone="text-primary" /><MiniStat title="Total Capacity" value={courses.reduce((a, c) => a + c[9], 0)} /><MiniStat title="Utilization Rate" value="87.2%" tone="text-green-600" /></div>
        <Card><CardHeader title="Search and Filter Courses" description="Find courses by code, title, or instructor" /><div className="relative p-6 pt-0"><Search className="absolute left-9 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-10" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by course code, title, or instructor..." /></div></Card>
        <Card><CardHeader title="Course List" description={`${filtered.length} course(s) found`} /><div className="p-6 pt-0"><TableWrap><DataTable headers={["Course Code", "Course Title", "Department", "Units", "Section", "Schedule", "Room", "Instructor", "Enrollment", "Status"]}>{filtered.map((course) => <tr key={`${course[0]}-${course[4]}`} className="border-b">{course.slice(0, 8).map((item, index) => <Td key={index}>{item}</Td>)}<Td><Users className="mr-1 inline h-4 w-4 text-muted-foreground" />{course[8]}/{course[9]}</Td><Td><Badge variant="secondary">{course[8] >= course[9] ? "Full" : course[8] / course[9] > 0.8 ? "Almost Full" : "Available"}</Badge></Td></tr>)}</DataTable></TableWrap></div></Card>
      </div>
    </PageShell>
  );
}

export function StudentListPage() {
  const [query, setQuery] = useState("");
  const students = [
    ["2021-0001", "Juan Dela Cruz", "Computer Science", "4th Year", "1.75", "Active", "juan.delacruz@cmdi.edu.ph", "+63 912 345 6789"],
    ["2021-0002", "Maria Garcia", "Computer Science", "4th Year", "1.50", "Active", "maria.garcia@cmdi.edu.ph", "+63 912 345 6790"],
    ["2022-0015", "Jose Santos", "Business Admin", "3rd Year", "2.00", "Active", "jose.santos@cmdi.edu.ph", "+63 912 345 6791"],
    ["2023-0034", "Miguel Santos", "Computer Science", "2nd Year", "2.10", "LOA", "miguel.santos@cmdi.edu.ph", "+63 912 345 6797"],
  ];
  const filtered = students.filter((student) => student.join(" ").toLowerCase().includes(query.toLowerCase()));
  return (
    <PageShell>
      <div className="space-y-6">
        <div><h1 className="text-3xl font-bold">Student Management</h1><p className="text-muted-foreground">View and manage student records</p></div>
        <div className="grid gap-6 md:grid-cols-4"><MiniStat title="Total Students" value={students.length} /><MiniStat title="Active Students" value={students.filter((s) => s[5] === "Active").length} tone="text-green-600" /><MiniStat title="Average GPA" value="1.84" /><MiniStat title="On Leave" value="1" tone="text-accent" /></div>
        <Card><CardHeader title="Search and Filter Students" description="Find students by name, ID, or email" action={<Button variant="outline"><Download className="mr-2 h-4 w-4" />Export</Button>} /><div className="relative p-6 pt-0"><Search className="absolute left-9 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-10" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, student ID, or email..." /></div></Card>
        <Card><CardHeader title="Student List" description={`${filtered.length} student(s) found`} /><div className="p-6 pt-0"><TableWrap><DataTable headers={["Student ID", "Name", "Program", "Year Level", "GPA", "Contact", "Status", "Actions"]}>{filtered.map((student) => <tr key={student[0]} className="border-b"><Td className="font-medium">{student[0]}</Td><Td className="font-medium">{student[1]}</Td><Td>{student[2]}</Td><Td>{student[3]}</Td><Td className="font-semibold text-primary">{student[4]}</Td><Td><div className="text-xs text-muted-foreground"><Mail className="mr-1 inline h-3 w-3" />{student[6]}<br /><Phone className="mr-1 inline h-3 w-3" />{student[7]}</div></Td><Td><Badge variant="secondary">{student[5]}</Badge></Td><Td><Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button></Td></tr>)}</DataTable></TableWrap></div></Card>
      </div>
    </PageShell>
  );
}

export function AnalyticsPage({ finance = false }) {
  const [year, setYear] = useState("2025-2026");
  const enrollment = [{ month: "Aug", current: 1200, previous: 1100 }, { month: "Sep", current: 1250, previous: 1150 }, { month: "Oct", current: 1280, previous: 1180 }, { month: "Nov", current: 1260, previous: 1200 }, { month: "Mar", current: 1400, previous: 1300 }];
  const grades = [{ grade: "Excellent", count: 280, color: "#10b981" }, { grade: "Very Good", count: 450, color: "#3b82f6" }, { grade: "Good", count: 380, color: "#f59e0b" }, { grade: "Fair", count: 220, color: "#f97316" }, { grade: "Poor", count: 70, color: "#ef4444" }];
  const revenue = [{ month: "Aug", tuition: 4200000, misc: 350000 }, { month: "Sep", tuition: 4500000, misc: 380000 }, { month: "Jan", tuition: 4800000, misc: 400000 }, { month: "Mar", tuition: 5500000, misc: 450000 }];
  return (
    <PageShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold">{finance ? "Financial Reports" : "Advanced Analytics"}</h1><p className="text-muted-foreground">Comprehensive insights and data visualization</p></div><NativeSelect value={year} onChange={setYear} className="w-48"><option>2025-2026</option><option>2024-2025</option><option>2023-2024</option></NativeSelect></div>
        <div className="grid gap-6 md:grid-cols-4"><MiniStat title="Total Enrollment" value="1,400" tone="text-primary" /><MiniStat title="Retention Rate" value="93%" /><MiniStat title="Average GPA" value="2.05" /><MiniStat title="Revenue YTD" value="PHP 42.5M" tone="text-accent" /></div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Chart title="Enrollment Trends" description="Comparing current vs previous academic year"><LineChart data={enrollment}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line dataKey="current" stroke="#3b82f6" strokeWidth={2} /><Line dataKey="previous" stroke="#94a3b8" strokeDasharray="5 5" /></LineChart></Chart>
          <Chart title="Grade Distribution" description="Student performance across all programs"><PieChart><Pie data={grades} dataKey="count" cx="50%" cy="50%" outerRadius={100} label>{grades.map((item) => <Cell key={item.grade} fill={item.color} />)}</Pie><Tooltip /></PieChart></Chart>
          <Chart title="Revenue Collection Trends" description="Tuition and miscellaneous fees collected"><AreaChart data={revenue}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area dataKey="tuition" stackId="1" stroke="#3b82f6" fill="#3b82f6" /><Area dataKey="misc" stackId="1" stroke="#f59e0b" fill="#f59e0b" /></AreaChart></Chart>
          <Chart title="Average GPA by Program" description="Academic performance comparison across programs"><BarChart data={[{ program: "CS", average: 1.85 }, { program: "Business", average: 2.15 }, { program: "Engineering", average: 1.95 }, { program: "Education", average: 2.05 }]}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="program" /><YAxis /><Tooltip /><Bar dataKey="average" fill="#3b82f6" /></BarChart></Chart>
        </div>
      </div>
    </PageShell>
  );
}

function Chart({ title, description, children }) {
  return (
    <Card>
      <CardHeader title={title} description={description} />
      <div className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={300}>{children}</ResponsiveContainer>
      </div>
    </Card>
  );
}

export function TeacherManagementPage() {
  const teachers = [["T-001", "Prof. Maria Santos", "Computer Science", "3 classes", "95 students"], ["T-002", "Prof. Jose Garcia", "Mathematics", "2 classes", "70 students"], ["T-003", "Prof. Ana Reyes", "English", "4 classes", "128 students"]];
  return (
    <PageShell>
      <div className="space-y-6">
        <div><h1 className="text-3xl font-bold">Teacher Management</h1><p className="text-muted-foreground">Faculty records, class loads, and teaching assignments</p></div>
        <div className="grid gap-6 md:grid-cols-4"><MiniStat title="Total Teachers" value="85" /><MiniStat title="Active Loads" value="120" tone="text-primary" /><MiniStat title="Average Rating" value="4.5" /><MiniStat title="New Hires" value="5" tone="text-green-600" /></div>
        <Card><CardHeader title="Faculty Directory" description="Current faculty assignments" action={<Button><Plus className="mr-2 h-4 w-4" />Add Teacher</Button>} /><div className="p-6 pt-0"><TableWrap><DataTable headers={["Faculty ID", "Name", "Department", "Classes", "Students", "Status"]}>{teachers.map((teacher) => <tr key={teacher[0]} className="border-b">{teacher.map((item) => <Td key={item}>{item}</Td>)}<Td><Badge variant="secondary">Active</Badge></Td></tr>)}</DataTable></TableWrap></div></Card>
      </div>
    </PageShell>
  );
}

export function SimpleWorkQueuePage({ title, description, items, stats }) {
  const preparedStats = useMemo(() => stats ?? [["Open Items", items.length], ["Due Today", 8], ["Completed", 42], ["Escalated", 3]], [items, stats]);
  return (
    <PageShell>
      <div className="space-y-6">
        <div><h1 className="text-3xl font-bold">{title}</h1><p className="text-muted-foreground">{description}</p></div>
        <div className="grid gap-6 md:grid-cols-4">{preparedStats.map(([label, value], index) => <MiniStat key={label} title={label} value={value} tone={index === 1 ? "text-accent" : index === 2 ? "text-green-600" : ""} />)}</div>
        <Card><CardHeader title={title} description="Operational queue and recent activity" /><div className="space-y-4 p-6 pt-0">{items.map((item, index) => <div key={item.title} className="flex items-start justify-between rounded-lg bg-muted/50 p-4"><div className="flex gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div><div><h3 className="font-semibold">{item.title}</h3><p className="text-sm text-muted-foreground">{item.meta}</p></div></div><Badge variant={index === 1 ? "outline" : "secondary"}>{item.status}</Badge></div>)}</div></Card>
      </div>
    </PageShell>
  );
}

export const recordsItems = [
  { title: "Transcript of Records - Juan Dela Cruz", meta: "Records Window 1 • Requested May 2, 2026", status: "Processing" },
  { title: "Certificate of Enrollment - Maria Garcia", meta: "Enrollment Desk • Missing validation", status: "Hold" },
  { title: "Good Moral Certificate - Jose Santos", meta: "Registrar Clerk • Ready for release", status: "Ready" },
];

export const financeItems = [
  { title: "Bank Transfer Review - Maria Villanueva", meta: "PHP 12,000 • Uploaded receipt", status: "For Review" },
  { title: "Unpaid Account Notice - Kevin Ramos", meta: "PHP 4,750 balance • Second reminder", status: "Pending" },
  { title: "Receipt Batch Posting", meta: "84 cashier payments • May 2, 2026", status: "Posted" },
];
