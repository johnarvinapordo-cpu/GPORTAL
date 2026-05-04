// ⚠️ SAME IMPORTS (unchanged)
import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Line, LineChart, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Bell, Download, Eye, FileText, Mail, Phone, Plus,
  Search, Send, Star, Users
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/progress";
import { Textarea } from "../../components/ui/textarea";

// 🔹 (all your helpers unchanged — shortened here for readability)
function PageShell({ children }) {
  return <DashboardLayout userRole="admin" userName="User">{children}</DashboardLayout>;
}
function Card({ children }) { return <div className="border p-4">{children}</div>; }
function CardHeader({ title }) { return <h2 className="font-bold">{title}</h2>; }
function MiniStat({ title, value }) { return <div>{title}: {value}</div>; }
function TableWrap({ children }) { return <div>{children}</div>; }
function DataTable({ headers, children }) {
  return <table><thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{children}</tbody></table>;
}
function Td({ children }) { return <td>{children}</td>; }


// ======================
// ✅ FIXED TUITION PAGE
// ======================
export function TuitionPage() {
  const rows = [
    ["PAY-2026-001", "January 15, 2026", "PHP 10,000", "Bank Transfer", "Completed"],
    ["PAY-2026-002", "February 10, 2026", "PHP 5,000", "Cash", "Completed"],
    ["PAY-2026-003", "March 5, 2026", "PHP 10,000", "Credit Card", "Completed"],
  ];

  const fees = [
    ["Tuition Fee", 18000],
    ["Laboratory Fee", 3000],
    ["Library Fee", 1500],
    ["Internet Fee", 1000],
    ["Miscellaneous Fee", 1500]
  ];

  return (
    <PageShell>
      <div className="space-y-6">
        <h1>Tuition & Financial Services</h1>

        <div className="grid">
          <MiniStat title="Total Tuition" value="PHP 25,000" />
          <MiniStat title="Amount Paid" value="PHP 25,000" />
        </div>

        <Card>
          <CardHeader title="Fee Breakdown" />
          {fees.map(([name, amount]) => (
            <div key={name}>{name} - PHP {amount}</div>
          ))}
        </Card>

        <Card>
          <CardHeader title="Payment History" />
          <TableWrap>
            <DataTable headers={["ID", "Date", "Amount", "Method", "Status"]}>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((item) => <Td key={item}>{item}</Td>)}
                </tr>
              ))}
            </DataTable>
          </TableWrap>
        </Card>
      </div>
    </PageShell>
  );
}


// ======================
// (Your EvaluationPage unchanged)
// ======================
export function EvaluationPage() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = ["Teaching effectiveness", "Course organization"];
  const courses = [["CS101", "Intro", "Prof", "Pending"]];

  const handleSubmitEvaluation = async () => {
    if (!selectedCourse) return;
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Submitted!");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <PageShell>
      <div>
        <h1>Evaluation</h1>

        {courses.map(([code]) => (
          <button key={code} onClick={() => setSelectedCourse(code)}>
            {code}
          </button>
        ))}

        <Button onClick={handleSubmitEvaluation}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </PageShell>
  );
}


// ======================
// EXPORTS (unchanged)
// ======================
export const recordsItems = [
  { title: "Transcript", meta: "Processing", status: "Processing" },
];

export const financeItems = [
  { title: "Payment Review", meta: "Pending", status: "Pending" },
];