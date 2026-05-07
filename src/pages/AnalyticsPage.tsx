import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Users, BookOpen, GraduationCap, DollarSign } from "lucide-react";
import { useState } from "react";

export default function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState("2025-2026");

  // Enrollment trends over months
  const enrollmentTrends = [
    { month: "Aug", current: 1200, previous: 1100 },
    { month: "Sep", current: 1250, previous: 1150 },
    { month: "Oct", current: 1280, previous: 1180 },
    { month: "Nov", current: 1260, previous: 1200 },
    { month: "Dec", current: 1300, previous: 1220 },
    { month: "Jan", current: 1350, previous: 1250 },
    { month: "Feb", current: 1380, previous: 1280 },
    { month: "Mar", current: 1400, previous: 1300 },
  ];

  // Student performance by program
  const performanceByProgram = [
    { program: "Computer Science", average: 1.85, students: 450 },
    { program: "Business Admin", average: 2.15, students: 380 },
    { program: "Engineering", average: 1.95, students: 320 },
    { program: "Education", average: 2.05, students: 250 },
  ];

  // Grade distribution
  const gradeDistribution = [
    { grade: "1.0-1.5 (Excellent)", count: 280, percentage: 20, color: "#10b981" },
    { grade: "1.6-2.0 (Very Good)", count: 450, percentage: 32, color: "#3b82f6" },
    { grade: "2.1-2.5 (Good)", count: 380, percentage: 27, color: "#f59e0b" },
    { grade: "2.6-3.0 (Fair)", count: 220, percentage: 16, color: "#f97316" },
    { grade: "3.1-5.0 (Poor)", count: 70, percentage: 5, color: "#ef4444" },
  ];

  // Revenue trends
  const revenueTrends = [
    { month: "Aug", tuition: 4200000, misc: 350000 },
    { month: "Sep", tuition: 4500000, misc: 380000 },
    { month: "Oct", tuition: 3800000, misc: 320000 },
    { month: "Nov", tuition: 3200000, misc: 280000 },
    { month: "Dec", tuition: 4000000, misc: 340000 },
    { month: "Jan", tuition: 4800000, misc: 400000 },
    { month: "Feb", tuition: 5200000, misc: 420000 },
    { month: "Mar", tuition: 5500000, misc: 450000 },
  ];

  // Retention rates
  const retentionData = [
    { year: "2021-2022", rate: 88 },
    { year: "2022-2023", rate: 90 },
    { year: "2023-2024", rate: 91 },
    { year: "2024-2025", rate: 92 },
    { year: "2025-2026", rate: 93 },
  ];

  const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Advanced Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights and data visualization</p>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-2026">AY 2025-2026</SelectItem>
              <SelectItem value="2024-2025">AY 2024-2025</SelectItem>
              <SelectItem value="2023-2024">AY 2023-2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollment</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1,400</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+7.7% YoY growth</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">93%</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+1% from last year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2.05</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>Improved by 0.08</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue YTD</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">₱42.5M</div>
              <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                <TrendingDown className="w-3 h-3" />
                <span>9.3% pending</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment Trends Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trends (Year-over-Year)</CardTitle>
              <CardDescription>Comparing current vs previous academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} name="2025-2026" />
                  <Line type="monotone" dataKey="previous" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="2024-2025" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Grade Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Student performance across all programs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {gradeDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-muted-foreground">{item.grade}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance by Program */}
          <Card>
            <CardHeader>
              <CardTitle>Average GPA by Program</CardTitle>
              <CardDescription>Academic performance comparison across programs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceByProgram}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="program" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 3]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="#3b82f6" name="Average GPA" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Collection Trends</CardTitle>
              <CardDescription>Tuition and miscellaneous fees collected</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₱${(value as number).toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="tuition" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Tuition Fees" />
                  <Area type="monotone" dataKey="misc" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Misc Fees" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Retention Rate Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Student Retention Rate (5-Year Trend)</CardTitle>
            <CardDescription>Percentage of students continuing their studies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="rate" fill="#10b981" name="Retention Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Top Performing Program</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">Computer Science</p>
              <p className="text-sm text-muted-foreground">Average GPA: 1.85</p>
              <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 border-green-200">
                Excellent
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Collection Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">90.7%</p>
              <p className="text-sm text-muted-foreground">₱38.5M collected of ₱42.5M</p>
              <Badge variant="secondary" className="mt-2">
                On Track
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Graduation Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">92%</p>
              <p className="text-sm text-muted-foreground">4-year completion rate</p>
              <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 border-green-200">
                Above Target
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
