import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, UserCheck, Calendar, FileText, ClipboardList, PenTool } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RegistrarDashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Registrar Office</h1>
          <p className="text-muted-foreground">Managing enrollments, scheduling, and academic records.</p>
        </div>
        <Button size="sm">Create New Section</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Pending Enrollments</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">156</div>
            <p className="text-xs text-blue-400 font-medium mt-1">Requires immediate review</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Active Sections</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">84</div>
            <p className="text-xs text-muted-foreground mt-1">Semester 1, 2026</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Transcript Requests</CardTitle>
            <FileText className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1">Processing queue</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Recent Enrollment Requests</CardTitle>
          <CardDescription>Academic year 2025-2026 Semester 1</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Date Requested</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'John Doe', course: 'BSCS - 3', units: 21, date: 'May 1, 2026', status: 'Pending' },
                { name: 'Sarah Parker', course: 'BSIS - 2', units: 18, date: 'May 1, 2026', status: 'Pending' },
                { name: 'Michael Chen', course: 'BSA - 4', units: 15, date: 'Apr 30, 2026', status: 'In Review' },
              ].map((req, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-foreground">{req.name}</TableCell>
                  <TableCell className="text-muted-foreground">{req.course}</TableCell>
                  <TableCell className="text-muted-foreground">{req.units}</TableCell>
                  <TableCell className="text-muted-foreground">{req.date}</TableCell>
                  <TableCell>
                    <Badge variant={req.status === 'In Review' ? 'secondary' : 'outline'}>{req.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Review</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrarDashboard;
