import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../services/firebase";
import Loading from "../components/Loading/Loading";

export default function Dashboard() {
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      getCountFromServer(collection(db, "movies")),
      getCountFromServer(collection(db, "users")),
      getCountFromServer(collection(db, "reviews")),
    ])
      .then(([movies, users, reviews]) => {
        if (cancelled) return;
        setCounts({
          movies: movies.data().count,
          users: users.data().count,
          reviews: reviews.data().count,
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Couldn't load dashboard stats.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    { label: "Movies", value: counts?.movies, to: "/admin/movies" },
    { label: "Users", value: counts?.users, to: "/admin/users" },
    { label: "Reviews", value: counts?.reviews, to: "/admin/reviews" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl tracking-wide text-paper">Dashboard</h1>

      {error && <p className="mb-4 text-sm text-velvet">{error}</p>}
      {!counts && !error && <Loading label="Loading stats" />}

      {counts && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.to}
              className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-marquee"
            >
              <p className="font-mono text-3xl font-semibold text-marquee">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/admin/movies/new"
          className="inline-block rounded-md bg-marquee px-4 py-2 text-sm font-semibold text-bg hover:bg-marquee/90"
        >
          + Add a movie
        </Link>
      </div>
    </div>
  );
}
