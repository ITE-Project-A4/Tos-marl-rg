import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import MovieCard from "../components/MovieCard/MovieCard";
import Loading from "../components/Loading/Loading";
import { getFeaturedMovies } from "../services/movieService";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getFeaturedMovies(9)
      .then((movies) => {
        if (!cancelled) setFeatured(movies);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Couldn't load movies.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <Hero featured={featured[0]} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-wide text-paper">Top rated</h2>
          <Link to="/movies" className="text-sm font-semibold text-marquee hover:underline">
            View all →
          </Link>
        </div>

        {loading && <Loading label="Loading movies" />}
        {error && <p className="text-sm text-velvet">{error}</p>}

        {!loading && !error && featured.length === 0 && (
          <p className="text-sm text-muted">
            No movies yet — once movies are added from the admin dashboard, they'll show up here.
          </p>
        )}

        {!loading && featured.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {featured.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
