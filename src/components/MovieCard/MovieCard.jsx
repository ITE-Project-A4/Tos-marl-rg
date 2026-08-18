import { Link } from "react-router-dom";
import { getYear } from "../../utils/formatDate";

export default function MovieCard({ movie }) {
  const { id, title, posterUrl, genres = [], releaseDate, rating } = movie;

  return (
    <Link
      to={`/movies/${id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-transform hover:-translate-y-1 hover:border-marquee"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface2">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-3xl text-muted">
            {title?.[0] ?? "?"}
          </div>
        )}
        {rating > 0 && (
          <span className="absolute right-2 top-2 rounded bg-bg/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-marquee">
            ★ {rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 font-display text-lg tracking-wide text-paper">{title}</h3>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{getYear(releaseDate)}</span>
          <span className="line-clamp-1">{genres[0] ?? ""}</span>
        </div>
      </div>
    </Link>
  );
}
