import { APP_NAME } from "../utils/constants";

export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 font-display text-4xl tracking-wide text-paper">About {APP_NAME}</h1>
      <p className="leading-relaxed text-paper/90">
        {APP_NAME} is a place to keep track of every film worth remembering. Browse the catalog, rate
        what you've watched, write a short review, and build a watchlist for what's next — all in one
        place instead of scattered across sticky notes and half-remembered titles.
      </p>
      <p className="mt-4 leading-relaxed text-paper/90">
        This project was built as a full-stack learning exercise: React on the front end, Firebase
        Authentication for accounts, and Firestore for storing movies, reviews, favorites, and
        watchlists.
      </p>
    </div>
  );
}
