import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAuthErrorMessage } from "../services/authService";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register(form);
      navigate("/", { replace: true });
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
          <h1 className="font-display text-3xl text-paper">CREATE ACCOUNT</h1>
          <p className="text-sm text-muted mt-1 mb-6">
            Join to save favorites, build a watchlist, and write reviews.
          </p>

          {error && (
            <div className="mb-4 text-sm text-paper bg-velvet/20 border border-velvet/40 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-muted mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. Your Name "
                className="w-full bg-surface2 border border-line rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee/60"
              />
            </div>

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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">
                  Password
                </label>
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
              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">
                  Confirm
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-surface2 border border-line rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee/60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-velvet hover:bg-[#a83a30] disabled:opacity-60 text-paper font-semibold text-sm rounded-lg py-3 transition-colors"
            >
              {submitting ? "Creating account…" : "Get my ticket"}
            </button>
          </form>

          <p className="text-sm text-muted text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-marquee hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
