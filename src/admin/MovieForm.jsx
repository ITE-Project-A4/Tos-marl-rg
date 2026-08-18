import { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { GENRES } from "../utils/constants";

const emptyMovie = {
  title: "",
  description: "",
  posterUrl: "",
  backdropUrl: "",
  trailerUrl: "",
  releaseDate: "",
  duration: "",
  director: "",
  cast: "",
  genres: [],
};

/** Shared create/edit form for movies. `initialValue` triggers edit mode. */
export default function MovieForm({ initialValue, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState(() =>
    initialValue
      ? {
          ...emptyMovie,
          ...initialValue,
          cast: Array.isArray(initialValue.cast) ? initialValue.cast.join(", ") : initialValue.cast || "",
        }
      : emptyMovie
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleGenre(genre) {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit({
        ...form,
        duration: form.duration ? Number(form.duration) : null,
        cast: form.cast
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      });
    } catch (err) {
      setError(err.message || "Couldn't save this movie.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
      <Input id="title" name="title" label="Title" value={form.title} onChange={handleChange} required />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="rounded-md border border-line bg-surface px-3 py-2 text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input id="posterUrl" name="posterUrl" label="Poster URL" value={form.posterUrl} onChange={handleChange} />
        <Input
          id="backdropUrl"
          name="backdropUrl"
          label="Backdrop URL"
          value={form.backdropUrl}
          onChange={handleChange}
        />
      </div>

      <Input
        id="trailerUrl"
        name="trailerUrl"
        label="Trailer URL (YouTube)"
        value={form.trailerUrl}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          id="releaseDate"
          name="releaseDate"
          type="date"
          label="Release date"
          value={form.releaseDate}
          onChange={handleChange}
        />
        <Input
          id="duration"
          name="duration"
          type="number"
          label="Duration (min)"
          value={form.duration}
          onChange={handleChange}
        />
        <Input id="director" name="director" label="Director" value={form.director} onChange={handleChange} />
      </div>

      <Input id="cast" name="cast" label="Cast (comma-separated)" value={form.cast} onChange={handleChange} />

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Genres</label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => toggleGenre(genre)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                form.genres.includes(genre)
                  ? "border-marquee bg-marquee text-bg"
                  : "border-line text-muted hover:border-marquee hover:text-paper"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-velvet">{error}</p>}

      <Button type="submit" loading={saving} className="self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
