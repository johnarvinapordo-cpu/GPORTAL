import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import type { AppUser } from "../types";

interface LoginProps {
  onLogin?: (user: AppUser) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !password) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      const user = data.user;

      // ✅ CONSISTENT STORAGE (IMPORTANT FIX)
      localStorage.setItem("cmdi_user", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("cmdi_token", data.token);

      setUserId("");
      setPassword("");

      // ✅ notify App
      onLogin?.(user);

      // ✅ redirect based on role
      navigate(`/${user.role}`);

    } catch (err: any) {
      // fallback demo login
      if (password === "demo123") {
        const rolePrefix = userId.split("-")[0];

        let role: AppUser['role'] = "student";
        if (rolePrefix === "TCH") role = "teacher";
        else if (rolePrefix === "ADM") role = "admin";
        else if (rolePrefix === "REG") role = "registrar";
        else if (rolePrefix === "FIN") role = "finance";

        const demoUser: AppUser = {
          id: 0,
          user_id: userId,
          name: "Demo User",
          email: "",
          role,
        };

        localStorage.setItem("cmdi_user", JSON.stringify(demoUser));
        localStorage.setItem("user", JSON.stringify(demoUser));

        onLogin?.(demoUser);

        navigate(`/${role}`);
      } else {
        setError(err.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#162d6f] via-[#2563eb] to-[#7dd3fc] p-4">
      <div className="w-full max-w-md">

        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl">
            <GraduationCap className="h-12 w-12 text-[#1e3a8a]" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">CMDI Grade Portal</h1>
          <p className="text-blue-100">CARD-MRI Development Institute Inc.</p>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-2xl">

          <div className="p-6 border-b text-center">
            <h2 className="text-xl font-semibold">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">

            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="STU-001"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="demo123"
              className="w-full border px-3 py-2 rounded"
              required
            />

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="grid grid-cols-2 gap-2 text-sm">
              {["STU-001", "TCH-001", "ADM-001", "REG-001", "FIN-001"].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setUserId(id);
                    setPassword("demo123");
                    setError("");
                  }}
                  className="border p-1 rounded hover:bg-gray-100"
                >
                  {id}
                </button>
              ))}
            </div>

            <p className="text-xs text-center">Password: demo123</p>
          </form>
        </div>
      </div>
    </div>
  );
}