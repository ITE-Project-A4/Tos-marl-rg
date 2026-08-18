import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const reviewsRef = collection(db, "reviews");

export async function getReviewsForMovie(movieId) {
  const q = query(reviewsRef, where("movieId", "==", movieId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Adds a review and keeps the parent movie's rolling average rating in sync
 * via a transaction so concurrent reviews don't clobber each other.
 */
export async function addReview({ movieId, userId, username, rating, comment }) {
  const movieDocRef = doc(db, "movies", movieId);

  await runTransaction(db, async (transaction) => {
    const movieSnap = await transaction.get(movieDocRef);
    if (!movieSnap.exists()) throw new Error("Movie not found.");

    const current = movieSnap.data();
    const prevCount = current.reviewCount ?? 0;
    const prevRating = current.rating ?? 0;
    const newCount = prevCount + 1;
    const newRating = (prevRating * prevCount + rating) / newCount;

    const newReviewRef = doc(reviewsRef);
    transaction.set(newReviewRef, {
      movieId,
      userId,
      username,
      rating,
      comment,
      createdAt: serverTimestamp(),
    });

    transaction.update(movieDocRef, {
      rating: Number(newRating.toFixed(2)),
      reviewCount: newCount,
    });
  });
}

export async function updateReview(reviewId, data) {
  await updateDoc(doc(db, "reviews", reviewId), data);
}

export async function deleteReview(reviewId) {
  await deleteDoc(doc(db, "reviews", reviewId));
}

export async function getAllReviews() {
  const q = query(reviewsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
