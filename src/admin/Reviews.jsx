import { useEffect, useState } from "react";
import { getAllReviews, deleteReview } from "../services/reviewService";
import RatingStars from "../components/RatingStars/RatingStars";
import Loading from "../components/Loading/Loading";
import { formatFullDate } from "../utils/formatDate";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReviews()
      .then(setReviews)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(reviewId) {
    if (!window.confirm("Delete this review?")) return;
    await deleteReview(reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl tracking-wide text-paper">Reviews</h1>

      {loading && <Loading label="Loading reviews" />}
      {!loading && reviews.length === 0 && <p className="text-sm text-muted">No reviews yet.</p>}

      {!loading && reviews.length > 0 && (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-paper">{review.username}</p>
                  <p className="text-xs text-muted">on movie {review.movieId}</p>
                  <RatingStars value={review.rating} size="text-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="whitespace-nowrap text-xs text-muted">{formatFullDate(review.createdAt)}</span>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-xs font-semibold text-velvet hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {review.comment && <p className="mt-2 text-sm text-paper/90">{review.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
