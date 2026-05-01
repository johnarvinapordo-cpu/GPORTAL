import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { apiRequest, storeSession } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId || !password) return;

    setError("");
    setIsLoading(true);

    try {
      const session = await apiRequest("/api/login", {
        method: "POST",
        body: JSON.stringify({ userId, password }),
      });
      storeSession(session);
      navigate(`/${session.user.role}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
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
          <p className="mt-1 text-sm text-blue-200">
            Student Academic, Enrollment & Financial Services
          </p>
        </div>

        <div className="overflow-hidden rounded-lg bg-card text-card-foreground shadow-2xl">
          <div className="border-b border-border bg-white p-6 text-center">
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in with your school account ID
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="space-y-2">
              <label htmlFor="userId" className="block text-sm font-medium">
                Account ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your ID, e.g. STU-001"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-input" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-primary py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="rounded-md border border-border bg-muted/50 px-3 py-3 text-xs text-muted-foreground">
              <p className="mb-2 font-medium text-foreground">Demo accounts</p>
              <div className="grid grid-cols-2 gap-2">
                {["STU-001", "TCH-001", "ADM-001", "REG-001", "FIN-001"].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setUserId(id);
                      setPassword("demo123");
                      setError("");
                    }}
                    className="rounded border border-border bg-white px-2 py-1 text-left font-mono text-[11px] text-foreground hover:border-primary"
                  >
                    {id}
                  </button>
                ))}
              </div>
              <p className="mt-2">Password: demo123</p>
            </div>

            <div className="pt-2 text-center text-sm text-muted-foreground">
              <p>Need help? Contact IT Support</p>
              <p className="mt-1">support@cmdi.edu.ph</p>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-blue-100">
          © 2026 CARD-MRI Development Institute Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
