export default function Loading({ label = "Loading", full = false }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${full ? "min-h-[60vh]" : "py-12"}`}>
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-marquee border-t-transparent" />
      <span className="font-mono text-sm uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}
