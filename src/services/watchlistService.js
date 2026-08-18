import { doc, setDoc, deleteDoc, getDocs, getDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/** Watchlist lives at users/{userId}/watchlist/{movieId}, mirroring favorites. */
const watchlistRef = (userId) => collection(db, "users", userId, "watchlist");

export async function getWatchlistIds(userId) {
  const snap = await getDocs(watchlistRef(userId));
  return snap.docs.map((d) => d.id);
}

export async function isOnWatchlist(userId, movieId) {
  const snap = await getDoc(doc(watchlistRef(userId), movieId));
  return snap.exists();
}

export async function addToWatchlist(userId, movieId) {
  await setDoc(doc(watchlistRef(userId), movieId), { movieId, addedAt: serverTimestamp() });
}

export async function removeFromWatchlist(userId, movieId) {
  await deleteDoc(doc(watchlistRef(userId), movieId));
}

export async function toggleWatchlist(userId, movieId) {
  const currentlyOn = await isOnWatchlist(userId, movieId);
  if (currentlyOn) {
    await removeFromWatchlist(userId, movieId);
    return false;
  }
  await addToWatchlist(userId, movieId);
  return true;
}
