import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Lock, Mail } from "lucide-react";
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user.role;

      if (role === "student") navigate("/student");
      else if (role === "teacher") navigate("/teacher");
      else if (role === "admin") navigate("/admin");
      else if (role === "finance") navigate("/finance");
      else if (role === "registrar") navigate("/registrar");
      else navigate("/");

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl mb-1 font-semibold">CMDI Grade Portal</h1>
            <p className="text-sm text-gray-600">
              Student Academic, Enrollment & Financial Services
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Account Type (kept your logic) */}
            <div>
              <Label className="block text-sm mb-2 text-gray-700">
                Account Type
              </Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger>
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

            {/* ID */}
            <div>
              <Label className="block text-sm mb-2 text-gray-700">
                ID / Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <Input
                  className="pl-10"
                  type="text"
                  placeholder="Enter your ID or Email"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label className="block text-sm mb-2 text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <Input
                  className="pl-10"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Need help? Contact IT Support <br />
            support@cmdi.edu.ph
          </div>

        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          © 2026 CARD-MRI Development Institute Inc.
        </p>

      </div>
    </div>
  );
}