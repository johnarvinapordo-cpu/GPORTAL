import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CreditCard, DollarSign, Wallet, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell
} from 'recharts';

const paymentStats = [
  { month: 'Jan', amount: 450000 },
  { month: 'Feb', amount: 320000 },
  { month: 'Mar', amount: 210000 },
  { month: 'Apr', amount: 680000 },
  { month: 'May', amount: 590000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const FinanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Financial System</h1>
          <p className="text-muted-foreground">Tracking collections, billing, and financial reports.</p>
        </div>
        <Button size="sm">Generate Financial Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-card font-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₱2.45M</div>
            <p className="text-xs text-green-400 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.4% this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Outstanding Balances</CardTitle>
            <Wallet className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₱840k</div>
            <p className="text-xs text-amber-400 flex items-center mt-1 font-medium">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -2.1% this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Paid Students</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,894</div>
            <p className="text-xs text-muted-foreground mt-1">75% Collection rate</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Financial Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Excellent</div>
            <p className="text-xs text-muted-foreground mt-1">System assessment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Collection Trends</CardTitle>
            <CardDescription>Monthly tuition and fee collections</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₱${val/1000}k`} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                    formatter={(val) => [`₱${(val as number).toLocaleString()}`, 'Amount']}
                    contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                 />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {paymentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Processed transactions today</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[
                 { name: 'John Doe', amount: '₱1,500', method: 'GCash', status: 'Success' },
                 { name: 'Alice Smith', amount: '₱5,200', method: 'Over-the-counter', status: 'Success' },
                 { name: 'Bob Wilson', amount: '₱2,100', method: 'Credit Card', status: 'Success' },
                 { name: 'Sarah Miller', amount: '₱12,000', method: 'Bank Transfer', status: 'Processing' },
               ].map((pay, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">{pay.name}</p>
                            <p className="text-[10px] text-muted-foreground">{pay.method}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-foreground">{pay.amount}</p>
                        <Badge variant={pay.status === 'Processing' ? 'outline' : 'secondary'} className="text-[9px] h-4">
                            {pay.status}
                        </Badge>
                    </div>
                 </div>
               ))}
               <Button variant="ghost" className="w-full text-xs text-muted-foreground" size="sm">View Ledger</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceDashboard;
