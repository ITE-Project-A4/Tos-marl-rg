import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import Loading from "../components/Loading/Loading";
import { getYear } from "../utils/formatDate";

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadMovies() {
    setLoading(true);
    const q = query(collection(db, "movies"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setMovies(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => {
    loadMovies();
  }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    await deleteDoc(doc(db, "movies", id));
    setMovies((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wide text-paper">Movies</h1>
        <Link
          to="/admin/movies/new"
          className="rounded-md bg-marquee px-4 py-2 text-sm font-semibold text-bg hover:bg-marquee/90"
        >
          + Add movie
        </Link>
      </div>

      {loading && <Loading label="Loading movies" />}

      {!loading && movies.length === 0 && <p className="text-sm text-muted">No movies yet.</p>}

      {!loading && movies.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Genres</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} className="border-b border-line last:border-0 hover:bg-surface/50">
                  <td className="px-4 py-3 font-medium text-paper">{movie.title}</td>
                  <td className="px-4 py-3 text-muted">{getYear(movie.releaseDate)}</td>
                  <td className="px-4 py-3 text-muted">{(movie.genres || []).join(", ")}</td>
                  <td className="px-4 py-3 text-muted">{movie.rating ? movie.rating.toFixed(1) : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/movies/${movie.id}/edit`} className="mr-3 text-marquee hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(movie.id, movie.title)}
                      className="text-velvet hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
