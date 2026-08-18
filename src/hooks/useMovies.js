import { useEffect, useState, useCallback } from "react";
import { getMovies } from "../services/movieService";
import { MOVIES_PER_PAGE } from "../utils/constants";

/**
 * Loads a page of movies for the given genre/search filters.
 * Keeps a small stack of cursors so "Prev" can step backward without
 * re-querying from the start each time.
 */
export function useMovies({ genre = "", search = "" } = {}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [cursorStack, setCursorStack] = useState([null]);

  const [lastDoc, setLastDoc] = useState(null);

  const load = useCallback(
    async (cursor, pageNum) => {
      setLoading(true);
      setError(null);
      try {
        const result = await getMovies({ genre, search, pageSize: MOVIES_PER_PAGE, cursor });
        setMovies(result.movies);
        setHasMore(result.hasMore);
        setLastDoc(result.lastDoc);
        setPage(pageNum);
      } catch (err) {
        setError(err.message || "Failed to load movies.");
      } finally {
        setLoading(false);
      }
    },
    [genre, search]
  );

  useEffect(() => {
    setCursorStack([null]);
    load(null, 1);
  }, [load]);

  function nextPage() {
    if (!hasMore || !lastDoc) return;
    setCursorStack((prev) => [...prev, lastDoc]);
    load(lastDoc, page + 1);
  }

  function prevPage() {
    if (page <= 1) return;
    const newStack = cursorStack.slice(0, -1);
    setCursorStack(newStack);
    load(newStack[newStack.length - 1], page - 1);
  }

  return { movies, loading, error, page, hasMore, nextPage, prevPage, reload: () => load(null, 1) };
}
