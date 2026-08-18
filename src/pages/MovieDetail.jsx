import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMovie } from "../services/movieService";
import { getReviewsForMovie, addReview, deleteReview } from "../services/reviewService";
import { isFavorite, toggleFavorite } from "../services/favoriteService";
import { isOnWatchlist, toggleWatchlist } from "../services/watchlistService";
import Loading from "../components/Loading/Loading";
import Button from "../components/Button/Button";
import RatingStars from "../components/RatingStars/RatingStars";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import TrailerModal from "../components/TrailerModal/TrailerModal";
import { getYear } from "../utils/formatDate";

export default function MovieDetail() {
  const { movieId } = useParams();
  const { currentUser } = useAuth();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [favorite, setFavorite] = useState(false);
  const [onWatchlist, setOnWatchlist] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const [reviewRating, setReviewRating] = useState(8);
  const [reviewComment, setReviewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([getMovie(movieId), getReviewsForMovie(movieId)])
      .then(([movieData, reviewData]) => {
        if (cancelled) return;
        if (!movieData) {
          setError("Movie not found.");
          return;
        }
        setMovie(movieData);
        setReviews(reviewData);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load this movie.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  useEffect(() => {
    if (!currentUser) {
      setFavorite(false);
      setOnWatchlist(false);
      return;
    }
    let cancelled = false;
    Promise.all([isFavorite(currentUser.uid, movieId), isOnWatchlist(currentUser.uid, movieId)]).then(
      ([fav, watch]) => {
        if (!cancelled) {
          setFavorite(fav);
          setOnWatchlist(watch);
        }
      }
    );
    return () => {
      cancelled = true;
    };
  }, [currentUser, movieId]);

  async function handleToggleFavorite() {
    if (!currentUser) return;
    const next = await toggleFavorite(currentUser.uid, movieId);
    setFavorite(next);
  }

  async function handleToggleWatchlist() {
    if (!currentUser) return;
    const next = await toggleWatchlist(currentUser.uid, movieId);
    setOnWatchlist(next);
  }

  async function handleSubmitReview(e) {
    e.preventDefault();
    if (!currentUser) return;
    setSubmitting(true);
    setReviewError(null);
    try {
      await addReview({
        movieId,
        userId: currentUser.uid,
        username: currentUser.displayName || "Anonymous",
        rating: reviewRating,
        comment: reviewComment.trim(),
      });
      const [updatedMovie, updatedReviews] = await Promise.all([
        getMovie(movieId),
        getReviewsForMovie(movieId),
      ]);
      setMovie(updatedMovie);
      setReviews(updatedReviews);
      setReviewComment("");
      setReviewRating(8);
    } catch (err) {
      setReviewError(err.message || "Couldn't submit your review.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteReview(reviewId) {
    await deleteReview(reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  }

  if (loading) return <Loading label="Loading movie" full />;

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="mb-4 text-velvet">{error}</p>
        <Link to="/movies" className="text-marquee hover:underline">
          ← Back to movies
        </Link>
      </div>
    );
  }

  const { title, description, posterUrl, backdropUrl, trailerUrl, genres = [], releaseDate, duration, director, cast = [], rating } = movie;

  return (
    <div>
      <div className="relative border-b border-line">
        {backdropUrl && (
          <div className="absolute inset-0">
            <img src={backdropUrl} alt="" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/90 to-bg/60" />
          </div>
        )}

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row">
          <div className="mx-auto w-48 shrink-0 overflow-hidden rounded-lg border border-line bg-surface sm:w-56 md:mx-0">
            {posterUrl ? (
              <img src={posterUrl} alt={title} className="w-full object-cover" />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center font-display text-4xl text-muted">
                {title?.[0] ?? "?"}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="font-display text-4xl tracking-wide text-paper sm:text-5xl">{title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>{getYear(releaseDate)}</span>
              {duration && <span>{duration} min</span>}
              {director && <span>Dir. {director}</span>}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <RatingStars value={rating || 0} />
              <span className="font-mono text-sm text-muted">
                {rating ? rating.toFixed(1) : "—"} / 10 · {movie.reviewCount || 0} reviews
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {genres.map((g) => (
                <span key={g} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {g}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-2xl leading-relaxed text-paper/90">{description}</p>
            {cast.length > 0 && (
              <p className="mt-3 text-sm text-muted">
                <span className="font-semibold text-paper">Cast: </span>
                {cast.join(", ")}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {trailerUrl && (
                <Button onClick={() => setShowTrailer(true)}>▶ Watch trailer</Button>
              )}
              {currentUser ? (
                <>
                  <Button variant="secondary" onClick={handleToggleFavorite}>
                    {favorite ? "★ Favorited" : "☆ Add to favorites"}
                  </Button>
                  <Button variant="secondary" onClick={handleToggleWatchlist}>
                    {onWatchlist ? "✓ On watchlist" : "+ Add to watchlist"}
                  </Button>
                </>
              ) : (
                <Link to="/login" className="self-center text-sm text-muted hover:text-paper">
                  Log in to save this movie
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="mb-4 font-display text-2xl tracking-wide text-paper">Reviews</h2>

        {currentUser ? (
          <form onSubmit={handleSubmitReview} className="mb-8 rounded-lg border border-line bg-surface p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
              Your rating
            </label>
            <RatingStars value={reviewRating} onChange={setReviewRating} size="text-2xl" />
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="What did you think?"
              rows={3}
              className="mt-3 w-full rounded-md border border-line bg-bg px-3 py-2 text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee"
            />
            {reviewError && <p className="mt-2 text-sm text-velvet">{reviewError}</p>}
            <Button type="submit" loading={submitting} className="mt-3">
              Submit review
            </Button>
          </form>
        ) : (
          <p className="mb-8 text-sm text-muted">
            <Link to="/login" className="text-marquee hover:underline">
              Log in
            </Link>{" "}
            to leave a review.
          </p>
        )}

        {reviews.length === 0 ? (
          <p className="text-sm text-muted">No reviews yet — be the first to share your thoughts.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                canDelete={currentUser?.uid === review.userId}
                onDelete={() => handleDeleteReview(review.id)}
              />
            ))}
          </div>
        )}
      </section>

      {showTrailer && <TrailerModal trailerUrl={trailerUrl} onClose={() => setShowTrailer(false)} />}
    </div>
  );
}
