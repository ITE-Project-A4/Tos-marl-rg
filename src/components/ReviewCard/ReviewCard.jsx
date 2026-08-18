import RatingStars from "../RatingStars/RatingStars";
import { formatFullDate } from "../../utils/formatDate";

export default function ReviewCard({ review, canDelete = false, onDelete }) {
  const { username, rating, comment, createdAt } = review;

  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-paper">{username || "Anonymous"}</p>
          <RatingStars value={rating} size="text-sm" />
        </div>
        <div className="flex items-center gap-3">
          <span className="whitespace-nowrap text-xs text-muted">{formatFullDate(createdAt)}</span>
          {canDelete && (
            <button
              onClick={onDelete}
              className="text-xs font-semibold text-velvet hover:underline"
              aria-label="Delete review"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {comment && <p className="mt-2 text-sm leading-relaxed text-paper/90">{comment}</p>}
    </div>
  );
}
