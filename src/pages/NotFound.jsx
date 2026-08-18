import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl text-marquee mb-2">404</h1>
        <p className="text-muted text-sm mb-6">This reel doesn't exist.</p>
        <Link to="/" className="text-velvet hover:underline text-sm font-semibold">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
