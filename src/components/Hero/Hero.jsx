import { Link } from "react-router-dom";

export default function Hero({ featured }) {
  const backdrop = featured?.backdropUrl || featured?.posterUrl;

  return (
    <section className="relative overflow-hidden border-b border-line">
      {backdrop && (
        <div className="absolute inset-0">
          <img src={backdrop} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
        </div>
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-24 sm:px-6 md:py-32">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-marquee">
          Now showing in your vault
        </span>
        <h1 className="max-w-2xl font-display text-5xl leading-tight tracking-wide text-paper sm:text-6xl">
          {featured ? featured.title : "Every film you've loved, in one place"}
        </h1>
        <p className="max-w-xl text-muted">
          {featured?.description ||
            "Browse the catalog, rate what you've seen, and build a watchlist for what's next."}
        </p>
        <div className="mt-2 flex gap-3">
          {featured ? (
            <Link
              to={`/movies/${featured.id}`}
              className="rounded-md bg-marquee px-5 py-2.5 text-sm font-semibold text-bg hover:bg-marquee/90"
            >
              View details
            </Link>
          ) : (
            <Link
              to="/movies"
              className="rounded-md bg-marquee px-5 py-2.5 text-sm font-semibold text-bg hover:bg-marquee/90"
            >
              Browse movies
            </Link>
          )}
          <Link
            to="/register"
            className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-paper hover:border-marquee"
          >
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
}
