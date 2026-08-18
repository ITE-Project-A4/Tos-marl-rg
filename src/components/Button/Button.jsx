const VARIANTS = {
  primary: "bg-marquee text-bg hover:bg-marquee/90",
  secondary: "bg-surface2 text-paper border border-line hover:bg-surface2/80",
  danger: "bg-velvet text-paper hover:bg-velvet/90",
  ghost: "bg-transparent text-paper hover:bg-surface2/60",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
