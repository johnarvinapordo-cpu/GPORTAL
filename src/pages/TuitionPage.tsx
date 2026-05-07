import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Progress } from "../components/ui/progress";
import { DollarSign, Download, CreditCard, Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function TuitionPage() {
  const location = useLocation();
  const userRole = location.pathname.includes("/student") ? "student" : 
                   location.pathname.includes("/teacher") ? "teacher" : "admin";
  const userName = userRole === "student" ? "Juan Dela Cruz" : 
                   userRole === "teacher" ? "Prof. Maria Santos" : "Admin User";

  const paymentHistory = [
    { id: "PAY-2026-001", date: "January 15, 2026", amount: 10000, method: "Bank Transfer", status: "Completed", receipt: "REC-001.pdf" },
    { id: "PAY-2026-002", date: "February 10, 2026", amount: 5000, method: "Cash", status: "Completed", receipt: "REC-002.pdf" },
    { id: "PAY-2026-003", date: "March 5, 2026", amount: 10000, method: "Credit Card", status: "Completed", receipt: "REC-003.pdf" },
  ];

  const tuitionBreakdown = [
    { item: "Tuition Fee", amount: 18000 },
    { item: "Laboratory Fee", amount: 3000 },
    { item: "Library Fee", amount: 1500 },
    { item: "Internet Fee", amount: 1000 },
    { item: "Miscellaneous Fee", amount: 1500 },
    { item: "Total", amount: 25000, isTotal: true },
  ];

  const totalTuition = 25000;
  const totalPaid = 25000;
  const balance = totalTuition - totalPaid;
  const percentPaid = (totalPaid / totalTuition) * 100;

  const handleDownloadReceipt = (receiptId: string) => {
    toast.success(`Downloading ${receiptId}...`);
  };

  const handleMakePayment = () => {
    toast.info("Redirecting to payment gateway...");
  };

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tuition & Financial Services</h1>
          <p className="text-muted-foreground">Manage your tuition payments and view financial records</p>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tuition</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱{totalTuition.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">2nd Semester 2025-2026</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₱{totalPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">3 payments made</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance === 0 ? 'text-green-600' : 'text-accent'}`}>
                ₱{balance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {balance === 0 ? "Fully paid" : "Payment pending"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Progress value={percentPaid} className="mb-2" />
              <p className="text-sm font-medium">{percentPaid.toFixed(0)}% Paid</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tuition Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Tuition Fee Breakdown</CardTitle>
              <CardDescription>2nd Semester, AY 2025-2026</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tuitionBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between ${
                      item.isTotal ? "pt-3 border-t-2 border-primary" : ""
                    }`}
                  >
                    <span className={item.isTotal ? "font-bold text-lg" : "text-muted-foreground"}>
                      {item.item}
                    </span>
                    <span className={item.isTotal ? "font-bold text-lg text-primary" : "font-medium"}>
                      ₱{item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {balance > 0 && (
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90" onClick={handleMakePayment}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Make Payment
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Options</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Online Banking</h4>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pay via online banking transfer. Instant processing.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                  <h4 className="font-semibold mb-2">Credit/Debit Card</h4>
                  <p className="text-sm text-muted-foreground">
                    Visa, Mastercard, or other major cards accepted.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                  <h4 className="font-semibold mb-2">Over-the-Counter</h4>
                  <p className="text-sm text-muted-foreground">
                    Pay at authorized payment centers or school cashier.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                  <h4 className="font-semibold mb-2">Installment Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    Spread your payments over multiple months.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View all your previous payments</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No payment history available.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-semibold">₱{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadReceipt(payment.receipt)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Financial Assistance */}
        <Card className="bg-secondary/5 border-secondary">
          <CardHeader>
            <CardTitle>Financial Assistance</CardTitle>
            <CardDescription>Need help with tuition payments?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              CMDI offers various scholarship programs and financial assistance options for qualified students.
              Contact the Financial Aid Office for more information.
            </p>
            <div className="flex gap-3">
              <Button variant="outline">View Scholarships</Button>
              <Button variant="outline">Contact Financial Aid</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
