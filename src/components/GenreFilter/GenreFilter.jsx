import { GENRES } from "../../utils/constants";

export default function GenreFilter({ selected = "", onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("")}
        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
          selected === ""
            ? "border-marquee bg-marquee text-bg"
            : "border-line text-muted hover:border-marquee hover:text-paper"
        }`}
      >
        All
      </button>
      {GENRES.map((genre) => (
        <button
          key={genre}
          onClick={() => onChange(genre)}
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
            selected === genre
              ? "border-marquee bg-marquee text-bg"
              : "border-line text-muted hover:border-marquee hover:text-paper"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
