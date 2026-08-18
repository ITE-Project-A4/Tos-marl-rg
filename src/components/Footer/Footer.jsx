import { Link } from "react-router-dom";
import { APP_NAME } from "../../utils/constants";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-xl tracking-wider text-marquee">{APP_NAME}</p>
          <p className="mt-1 text-xs text-muted">Track, rate, and remember every film you watch.</p>
        </div>
        <div className="flex gap-6 text-sm text-muted">
          <Link to="/about" className="hover:text-paper">About</Link>
          <Link to="/contact" className="hover:text-paper">Contact</Link>
          <Link to="/movies" className="hover:text-paper">Browse</Link>
        </div>
        <p className="text-xs text-muted">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
