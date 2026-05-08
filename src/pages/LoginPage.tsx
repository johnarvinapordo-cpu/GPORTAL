import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { apiRequest, storeSession } from "../lib/api";


export default function LoginPage() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await apiRequest("/api/login", {
        method: "POST",
        body: JSON.stringify({
          userId: email,
          password,
        }),
      });

      // normalize role
      const normalizedUser = {
        ...data.user,
        role: data.user.role.toLowerCase(),
      };

      // save session
     
storeSession({
  token: data.token,
  user: data.user,
});

// IMPORTANT: update React context
setUser(data.user);

      // update auth context
      setUser(normalizedUser);

      console.log("LOGIN SUCCESS:", normalizedUser);

      // redirect by role
      switch (normalizedUser.role) {
        case "student":
          navigate("/student");
          break;

        case "teacher":
          navigate("/teacher");
          break;

        case "admin":
          navigate("/admin");
          break;

        case "finance":
          navigate("/finance");
          break;

        case "registrar":
          navigate("/registrar");
          break;

        default:
          navigate("/");
      }
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      alert(
        err.message ||
          "Login failed. Backend server not reachable."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            CMDI Grade Portal
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            CARD-MRI Development Institute Inc.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL / ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID or Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your ID or email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-gray-600">Remember me</span>
            </label>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DEMO ACCOUNTS */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-gray-700 text-center leading-6">
            <strong>Demo Accounts</strong>
            <br />
            Student: juan@cmdi.edu
            <br />
            Teacher: maria@cmdi.edu
            <br />
            Admin: admin@cmdi.edu
            <br />
            Finance: finance@cmdi.edu
            <br />
            Registrar: registrar@cmdi.edu
            <br />
            Password: <strong>demo123</strong>
          </p>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 CARD-MRI Development Institute Inc.
        </p>
      </div>
    </div>
  );
}