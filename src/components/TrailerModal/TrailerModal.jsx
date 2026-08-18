import { useEffect } from "react";

/** Converts a plain YouTube watch/share URL into an embeddable URL. */
function toEmbedUrl(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed${u.pathname}`;
    const videoId = u.searchParams.get("v");
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return url;
  } catch {
    return url;
  }
}

export default function TrailerModal({ trailerUrl, onClose }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="aspect-video w-full max-w-3xl overflow-hidden rounded-lg border border-line bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={toEmbedUrl(trailerUrl)}
          title="Trailer"
          className="h-full w-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <button
        onClick={onClose}
        className="absolute right-6 top-6 text-2xl text-paper hover:text-marquee"
        aria-label="Close trailer"
      >
        ✕
      </button>
    </div>
  );
}
