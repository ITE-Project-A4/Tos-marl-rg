import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getFavoriteIds } from "../services/favoriteService";
import { getMoviesByIds } from "../services/movieService";
import MovieCard from "../components/MovieCard/MovieCard";
import Loading from "../components/Loading/Loading";

export default function Favorites() {
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    getFavoriteIds(currentUser.uid)
      .then(getMoviesByIds)
      .then((data) => {
        if (!cancelled) setMovies(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  if (loading) return <Loading label="Loading favorites" full />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 font-display text-4xl tracking-wide text-paper">Your favorites</h1>

      {movies.length === 0 ? (
        <p className="text-sm text-muted">
          Nothing here yet.{" "}
          <Link to="/movies" className="text-marquee hover:underline">
            Browse movies
          </Link>{" "}
          and tap the star to save one.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
