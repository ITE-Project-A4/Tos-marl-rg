import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MovieForm from "./MovieForm";
import Button from "../components/Button/Button";
import Loading from "../components/Loading/Loading";
import { getMovie, updateMovie, deleteMovie } from "../services/movieService";

export default function EditMovie() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMovie(movieId)
      .then((data) => {
        if (!cancelled) setMovie(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  async function handleSubmit(data) {
    await updateMovie(movieId, data);
    navigate(`/movies/${movieId}`);
  }

  async function handleDelete() {
    if (!window.confirm("Delete this movie? This can't be undone.")) return;
    setDeleting(true);
    try {
      await deleteMovie(movieId);
      navigate("/admin/movies");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <Loading label="Loading movie" />;

  if (!movie) {
    return (
      <div>
        <p className="text-sm text-velvet">Movie not found.</p>
        <Link to="/admin/movies" className="text-marquee hover:underline">
          ← Back to movies
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wide text-paper">Edit movie</h1>
        <Button variant="danger" onClick={handleDelete} loading={deleting}>
          Delete
        </Button>
      </div>
      <MovieForm initialValue={movie} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  );
}
