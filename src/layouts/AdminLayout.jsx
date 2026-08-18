import { NavLink, Outlet, Link } from "react-router-dom";

const adminLinks = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/movies", label: "Movies" },
  { to: "/admin/movies/new", label: "Add movie" },
  { to: "/admin/genres", label: "Genres" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-bg text-paper">
      <aside className="hidden w-56 shrink-0 border-r border-line px-4 py-6 sm:block">
        <Link to="/" className="mb-8 block font-display text-xl tracking-wider text-marquee">
          CineVault
        </Link>
        <nav className="flex flex-col gap-1">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-surface2 text-marquee" : "text-muted hover:bg-surface2/60 hover:text-paper"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/" className="mt-8 block text-xs text-muted hover:text-paper">
          ← Back to site
        </Link>
      </aside>
      <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
