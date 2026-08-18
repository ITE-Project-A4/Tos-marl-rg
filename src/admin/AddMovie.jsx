import { useNavigate } from "react-router-dom";
import MovieForm from "./MovieForm";
import { addMovie } from "../services/movieService";

export default function AddMovie() {
  const navigate = useNavigate();

  async function handleSubmit(data) {
    const id = await addMovie(data);
    navigate(`/movies/${id}`);
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl tracking-wide text-paper">Add a movie</h1>
      <MovieForm onSubmit={handleSubmit} submitLabel="Add movie" />
    </div>
  );
}
