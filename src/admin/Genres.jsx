import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { GENRES } from "../utils/constants";
import Loading from "../components/Loading/Loading";

/**
 * Genres are a fixed list (see utils/constants.js) rather than a separate
 * Firestore collection, since a movie catalog's genre taxonomy rarely
 * changes. This page just shows how many movies fall under each one.
 */
export default function Genres() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      GENRES.map(async (genre) => {
        const q = query(collection(db, "movies"), where("genres", "array-contains", genre));
        const snap = await getDocs(q);
        return [genre, snap.size];
      })
    ).then((entries) => {
      if (!cancelled) setCounts(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1 className="mb-2 font-display text-3xl tracking-wide text-paper">Genres</h1>
      <p className="mb-6 text-sm text-muted">
        Genres are managed in code (<code className="font-mono text-marquee">src/utils/constants.js</code>) —
        edit that list to add or remove one.
      </p>

      {!counts && <Loading label="Counting movies" />}

      {counts && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {GENRES.map((genre) => (
            <div key={genre} className="rounded-lg border border-line bg-surface p-4">
              <p className="font-semibold text-paper">{genre}</p>
              <p className="font-mono text-sm text-muted">{counts[genre]} movies</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
