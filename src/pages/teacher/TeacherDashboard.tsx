import React from 'react';
import type { AppUser } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';

interface TeacherDashboardProps {
  user: Extract<AppUser, { role: 'teacher' }>
}

const classes = [
  { id: 'CS101', name: 'Intro to Programming', students: 42, lastGraded: '2 days ago', status: 'In Progress' },
  { id: 'CS202', name: 'Database Systems', students: 35, lastGraded: '5 days ago', status: 'Grading' },
  { id: 'MATH301', name: 'Discrete Math', students: 28, lastGraded: 'Today', status: 'Completed' },
];

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Teacher Console</h1>
          <p className="text-muted-foreground">Welcome, Professor {user.name}. Manage your classes and grades.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-card">Schedule Meeting</Button>
            <Button size="sm">New Grade Entry</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">Semester 1, 2026</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">Across all departments</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Gradings</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-amber-400 mt-1 font-medium">Due by Friday</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Class Overview</CardTitle>
          <CardDescription>Lists of sections you are currently handling</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class ID</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Last Graded</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-mono font-bold text-primary">{cls.id}</TableCell>
                  <TableCell className="text-foreground">{cls.name}</TableCell>
                  <TableCell className="text-muted-foreground">{cls.students}</TableCell>
                  <TableCell className="text-muted-foreground">{cls.lastGraded}</TableCell>
                  <TableCell>
                    <Badge variant={cls.status === 'Completed' ? 'secondary' : 'outline'}>
                      {cls.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Manage</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Student Concerns</CardTitle>
              <CardDescription>Recent messages or appeals from your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Doe', msg: "Appeal for CS101 Quiz #2", time: "1h ago" },
                  { name: 'Alice Smith', msg: "Clarification on Thesis Proposal", time: "3h ago" },
                  { name: 'Bob Wilson', msg: "Sick leave for tomorrow's class", time: "5h ago" },
                ].map((msg, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="bg-primary/20 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-foreground">{msg.name}</p>
                            <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{msg.msg}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs text-muted-foreground" size="sm">View All Messages</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
              <CardDescription>Lectures and activities for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "CS101 Laboratory", room: "Rm 402", time: "09:00 - 12:00", day: "Mon" },
                  { title: "Department Meeting", room: "Faculty Lounge", time: "14:00 - 15:30", day: "Mon" },
                  { title: "CS202 Lecture", room: "Rm 305", time: "10:30 - 12:00", day: "Tue" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary/20 rounded-lg text-primary">
                        <span className="text-xs font-bold uppercase">{item.day}</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.room} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
