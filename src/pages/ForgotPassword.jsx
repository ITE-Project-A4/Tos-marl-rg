// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { getAuthErrorMessage } from "../../services/authService";

// export default function ForgotPassword() {
//   const { resetPassword } = useAuth();

//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [sent, setSent] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);

//     try {
//       await resetPassword(email);
//       setSent(true);
//     } catch (err) {
//       setError(getAuthErrorMessage(err));
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-16">
//       <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-[180px_1fr] bg-surface border border-line rounded-2xl overflow-hidden">
//         {/* Ticket stub */}
//         <div className="relative hidden sm:flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-velvet to-[#7d241d] p-6">
//           <span
//             className="font-display text-2xl tracking-widest text-paper"
//             style={{ writingMode: "vertical-rl" }}
//           >
//             RAIN CHECK
//           </span>
//           <span
//             className="pointer-events-none absolute -right-2 top-0 bottom-0 w-4"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle, #0E0F1A 5px, transparent 5.5px)",
//               backgroundSize: "18px 22px",
//               backgroundRepeat: "repeat-y",
//             }}
//           />
//         </div>

//         {/* Form */}
//         <div className="p-8 sm:p-10">
//           <h1 className="font-display text-3xl text-paper">RESET PASSWORD</h1>
//           <p className="text-sm text-muted mt-1 mb-6">
//             Enter your email and we'll send you a link to get back in.
//           </p>

//           {sent ? (
//             <div className="text-sm text-paper bg-marquee/10 border border-marquee/40 rounded-lg px-4 py-3">
//               Check <span className="text-marquee">{email}</span> for a
//               password reset link.
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <div className="text-sm text-paper bg-velvet/20 border border-velvet/40 rounded-lg px-3 py-2">
//                   {error}
//                 </div>
//               )}

//               <div>
//                 <label className="block text-xs font-mono text-muted mb-1.5">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="you@example.com"
//                   className="w-full bg-surface2 border border-line rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee/60"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-velvet hover:bg-[#a83a30] disabled:opacity-60 text-paper font-semibold text-sm rounded-lg py-3 transition-colors"
//               >
//                 {submitting ? "Sending…" : "Send reset link"}
//               </button>
//             </form>
//           )}

//           <p className="text-sm text-muted text-center mt-6">
//             <Link to="/login" className="text-marquee hover:underline">
//               Back to sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

//==========================================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAuthErrorMessage } from "../services/authService";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-[180px_1fr] bg-surface border border-line rounded-2xl overflow-hidden">
        <div className="relative hidden sm:flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-velvet to-[#7d241d] p-6">
          <span
            className="font-display text-2xl tracking-widest text-paper"
            style={{ writingMode: "vertical-rl" }}
          >
            RAIN CHECK
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

        <div className="p-8 sm:p-10">
          <h1 className="font-display text-3xl text-paper">RESET PASSWORD</h1>
          <p className="text-sm text-muted mt-1 mb-6">
            Enter your email and we'll send you a link to get back in.
          </p>

          {sent ? (
            <div className="text-sm text-paper bg-marquee/10 border border-marquee/40 rounded-lg px-4 py-3">
              Check <span className="text-marquee">{email}</span> for a
              password reset link.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-paper bg-velvet/20 border border-velvet/40 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-surface2 border border-line rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee/60"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-velvet hover:bg-[#a83a30] disabled:opacity-60 text-paper font-semibold text-sm rounded-lg py-3 transition-colors"
              >
                {submitting ? "Sending…" : "Send reset link"}
              </button>
            </form>
          )}

          <p className="text-sm text-muted text-center mt-6">
            <Link to="/login" className="text-marquee hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
