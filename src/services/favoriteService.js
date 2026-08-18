import { doc, setDoc, deleteDoc, getDocs, getDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/** Favorites live at users/{userId}/favorites/{movieId} so rules stay simple: a user can only touch their own subcollection. */
const favoritesRef = (userId) => collection(db, "users", userId, "favorites");

export async function getFavoriteIds(userId) {
  const snap = await getDocs(favoritesRef(userId));
  return snap.docs.map((d) => d.id);
}

export async function isFavorite(userId, movieId) {
  const snap = await getDoc(doc(favoritesRef(userId), movieId));
  return snap.exists();
}

export async function addFavorite(userId, movieId) {
  await setDoc(doc(favoritesRef(userId), movieId), { movieId, addedAt: serverTimestamp() });
}

export async function removeFavorite(userId, movieId) {
  await deleteDoc(doc(favoritesRef(userId), movieId));
}

export async function toggleFavorite(userId, movieId) {
  const currentlyFavorite = await isFavorite(userId, movieId);
  if (currentlyFavorite) {
    await removeFavorite(userId, movieId);
    return false;
  }
  await addFavorite(userId, movieId);
  return true;
}
