import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Users, 
  ShieldCheck, 
  Database, 
  Activity, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const systemLoad = [
  { time: '08:00', load: 20 },
  { time: '10:00', load: 45 },
  { time: '12:00', load: 78 },
  { time: '14:00', load: 60 },
  { time: '16:00', load: 30 },
  { time: '18:00', load: 15 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">System Admin</h1>
          <p className="text-muted-foreground">Root control panel for CMDI Grade Portal.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-card">System Logs</Button>
            <Button size="sm" className="bg-destructive hover:bg-destructive/90">Emergency Lockout</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Active Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2,450</div>
            <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-green-400 font-bold">+12%</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1">Healthy Status</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">DB Records</CardTitle>
            <Database className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">128k</div>
            <p className="text-xs text-muted-foreground mt-1">Firestore Managed</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Alerts</CardTitle>
            <ShieldCheck className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">0</div>
            <p className="text-xs text-green-400 mt-1">All clear</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>System Load & Traffic</CardTitle>
            <CardDescription>Real-time monitor of server requests</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={systemLoad}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="load" stroke="var(--primary)" fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Critical Events</CardTitle>
            <CardDescription>Security and System logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'warning', text: 'Multiple failed logins - Registrar Account', time: '10m ago' },
                { type: 'info', text: 'Automated database backup success', time: '1h ago' },
                { type: 'security', text: 'New Teacher Role assigned to Prof. Miller', time: '3h ago' },
                { type: 'error', text: 'API Timeout on Finance Module', time: '4h ago' },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 items-start border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className={`mt-2 h-2 w-2 rounded-full shrink-0 ${
                    log.type === 'error' ? 'bg-red-500' : 
                    log.type === 'warning' ? 'bg-amber-500' :
                    log.type === 'security' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-tight">{log.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">User Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { role: 'Students', count: 1800, color: 'bg-primary' },
                { role: 'Teachers', count: 120, color: 'bg-blue-400' },
                { role: 'Registrar', count: 15, color: 'bg-indigo-400' },
                { role: 'Finance', count: 10, color: 'bg-amber-400' },
              ].map((r, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{r.role}</span>
                    <span className="font-bold text-foreground">{r.count}</span>
                  </div>
                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${r.color}`} 
                        style={{ width: `${(r.count / 2000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-primary/5 border border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Maintenance Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="text-sm font-medium text-foreground">Clear Session Cache</div>
                <Button size="sm" variant="outline">Run</Button>
             </div>
             <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="text-sm font-medium text-foreground">Update Grades Index</div>
                <Button size="sm" variant="outline">Run</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
