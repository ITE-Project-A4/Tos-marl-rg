import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const moviesRef = collection(db, "movies");

/**
 * Fetch a page of movies, optionally filtered by genre and/or search title.
 * Firestore can't do case-insensitive substring search natively, so the
 * title filter is applied client-side after fetching a batch.
 *
 * @returns {Promise<{ movies: Array, lastDoc: import('firebase/firestore').QueryDocumentSnapshot | null }>}
 */
export async function getMovies({ genre = "", search = "", pageSize = 12, cursor = null } = {}) {
  const clauses = [orderBy("createdAt", "desc")];
  if (genre) clauses.push(where("genres", "array-contains", genre));

  let q = query(moviesRef, ...clauses, limit(search ? pageSize * 3 : pageSize));
  if (cursor) q = query(moviesRef, ...clauses, startAfter(cursor), limit(search ? pageSize * 3 : pageSize));

  const snap = await getDocs(q);
  let movies = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (search) {
    const needle = search.trim().toLowerCase();
    movies = movies.filter((m) => m.title?.toLowerCase().includes(needle)).slice(0, pageSize);
  }

  return {
    movies,
    lastDoc: snap.docs.length ? snap.docs[snap.docs.length - 1] : null,
    hasMore: snap.docs.length === (search ? pageSize * 3 : pageSize),
  };
}

export async function getMovie(movieId) {
  const snap = await getDoc(doc(db, "movies", movieId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getFeaturedMovies(count = 5) {
  const q = query(moviesRef, orderBy("rating", "desc"), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getMoviesByIds(ids = []) {
  if (!ids.length) return [];
  const results = await Promise.all(ids.map((id) => getMovie(id)));
  return results.filter(Boolean);
}

/**
 * @param {Object} data - title, description, posterUrl, backdropUrl, trailerUrl,
 *   genres (string[]), releaseDate, duration (minutes), director, cast (string[]), rating
 */
export async function addMovie(data) {
  const ref = await addDoc(moviesRef, {
    ...data,
    rating: data.rating ?? 0,
    reviewCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateMovie(movieId, data) {
  await updateDoc(doc(db, "movies", movieId), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteMovie(movieId) {
  await deleteDoc(doc(db, "movies", movieId));
}
