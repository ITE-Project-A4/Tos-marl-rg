import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAuthErrorMessage } from "../services/authService";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/";

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-[180px_1fr] bg-surface border border-line rounded-2xl overflow-hidden">
        {/* Ticket stub */}
        <div className="relative hidden sm:flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-velvet to-[#7d241d] p-6">
          <span
            className="font-display text-2xl tracking-widest text-paper"
            style={{ writingMode: "vertical-rl" }}
          >
            ADMIT ONE
          </span>
          <span
            className="pointer-events-none absolute -right-2 top-0 bottom-0 w-4"
            style={{
              backgroundImage:
                "radial-gradient(circle, #0E0F1A 5px, transparent 5.5px)",
              backgroundSize: "18px 22px",
              backgroundRepeat: "repeat-y",
            }}
          />
        </div>

        {/* Form */}
        <div className="p-8 sm:p-10">
          <h1 className="font-display text-3xl text-paper">WELCOME BACK</h1>
          <p className="text-sm text-muted mt-1 mb-6">
            Sign in to sync your watchlist and reviews.
          </p>

          {error && (
            <div className="mb-4 text-sm text-paper bg-velvet/20 border border-velvet/40 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-muted mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-surface2 border border-line rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee/60"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono text-muted">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-marquee hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-surface2 border border-line rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee/60"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-velvet hover:bg-[#a83a30] disabled:opacity-60 text-paper font-semibold text-sm rounded-lg py-3 transition-colors"
            >
              {submitting ? "Entering…" : "Enter the theater"}
            </button>
          </form>

          <p className="text-sm text-muted text-center mt-6">
            New here?{" "}
            <Link to="/register" className="text-marquee hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
