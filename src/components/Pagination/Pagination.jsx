import Button from "../Button/Button";

/** Simple prev/next pagination — pairs with movieService's cursor-based paging. */
export default function Pagination({ page, hasMore, onPrev, onNext }) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <Button variant="secondary" onClick={onPrev} disabled={page <= 1}>
        ← Prev
      </Button>
      <span className="font-mono text-sm text-muted">Page {page}</span>
      <Button variant="secondary" onClick={onNext} disabled={!hasMore}>
        Next →
      </Button>
    </div>
  );
}
