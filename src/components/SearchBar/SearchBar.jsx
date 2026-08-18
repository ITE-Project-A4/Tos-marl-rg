import { useState } from "react";

export default function SearchBar({ initialValue = "", onSearch, placeholder = "Search movies..." }) {
  const [term, setTerm] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(term.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-md border border-line bg-surface px-3 py-2 text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee"
      />
      <button
        type="submit"
        className="rounded-md bg-marquee px-4 py-2 text-sm font-semibold text-bg hover:bg-marquee/90"
      >
        Search
      </button>
    </form>
  );
}
