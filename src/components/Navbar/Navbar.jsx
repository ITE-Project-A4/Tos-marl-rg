import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { APP_NAME } from "../../utils/constants";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-2xl tracking-wider text-marquee">
          {APP_NAME}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-marquee" : "text-paper hover:text-marquee"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {currentUser ? (
            <>
              <Link to="/favorites" className="text-sm text-paper hover:text-marquee">
                Favorites
              </Link>
              <Link to="/watchlist" className="text-sm text-paper hover:text-marquee">
                Watchlist
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-sm text-paper hover:text-marquee">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="text-sm text-paper hover:text-marquee">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-velvet px-3 py-1.5 text-sm font-semibold text-paper hover:bg-velvet/90"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-paper hover:text-marquee">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-marquee px-3 py-1.5 text-sm font-semibold text-bg hover:bg-marquee/90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          className="text-2xl text-paper md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-line px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="text-paper">
              {link.label}
            </Link>
          ))}
          {currentUser ? (
            <>
              <Link to="/favorites" onClick={() => setMenuOpen(false)} className="text-paper">
                Favorites
              </Link>
              <Link to="/watchlist" onClick={() => setMenuOpen(false)} className="text-paper">
                Watchlist
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-paper">
                  Admin
                </Link>
              )}
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-paper">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-left text-velvet">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-paper">
                Log in
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-marquee">
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
