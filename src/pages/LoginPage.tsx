import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple demo login - redirect based on user type
    if (userType === "student") {
      navigate("/student");
    } else if (userType === "teacher") {
      navigate("/teacher");
    } else if (userType === "admin") {
      navigate("/admin");
    } else if (userType === "finance") {
      navigate("/finance");
    } else if (userType === "registrar") {
      navigate("/registrar");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <GraduationCap className="w-12 h-12 text-[#1e3a8a]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CMDI Grade Portal</h1>
          <p className="text-blue-100">CARD-MRI Development Institute Inc.</p>
          <p className="text-blue-200 text-sm mt-1">Student Academic, Enrollment & Financial Services</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger id="userType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher / Employee</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="finance">Finance Office</SelectItem>
                    <SelectItem value="registrar">Registrar Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userId">
                  {userType === "student" ? "Student ID" : "Employee ID"}
                </Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder={userType === "student" ? "Enter your Student ID" : "Enter your Employee ID"}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="bg-input-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input-background"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Need help? Contact IT Support</p>
              <p className="mt-1">support@cmdi.edu.ph</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-blue-100 mt-6">
          © 2026 CARD-MRI Development Institute Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
