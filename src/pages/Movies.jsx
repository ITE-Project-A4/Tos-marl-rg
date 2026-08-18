import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import GenreFilter from "../components/GenreFilter/GenreFilter";
import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";
import Loading from "../components/Loading/Loading";
import { useMovies } from "../hooks/useMovies";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const { movies, loading, error, page, hasMore, nextPage, prevPage } = useMovies({ genre, search });

  function handleGenreChange(newGenre) {
    setGenre(newGenre);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      newGenre ? next.set("genre", newGenre) : next.delete("genre");
      return next;
    });
  }

  function handleSearch(term) {
    setSearch(term);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      term ? next.set("q", term) : next.delete("q");
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 font-display text-4xl tracking-wide text-paper">Movies</h1>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar initialValue={search} onSearch={handleSearch} />
        <GenreFilter selected={genre} onChange={handleGenreChange} />
      </div>

      {loading && <Loading label="Loading movies" />}
      {error && <p className="text-sm text-velvet">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-sm text-muted">No movies match those filters.</p>
      )}

      {!loading && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination page={page} hasMore={hasMore} onPrev={prevPage} onNext={nextPage} />
        </>
      )}
    </div>
  );
}
