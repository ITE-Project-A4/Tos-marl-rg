export default function Input({ label, error, id, className = "", ...rest }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-md border bg-surface px-3 py-2 text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee ${
          error ? "border-velvet" : "border-line"
        } ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-velvet">{error}</span>}
    </div>
  );
}
