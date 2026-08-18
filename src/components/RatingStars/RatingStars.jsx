import { useState } from "react";

/**
 * Displays a 5-star rating out of a 0-10 scale value.
 * Pass `onChange` to make it an interactive input (used on the review form).
 */
export default function RatingStars({ value = 0, onChange, size = "text-lg" }) {
  const [hover, setHover] = useState(null);
  const interactive = typeof onChange === "function";
  const starValue = hover ?? value / 2;

  return (
    <div className={`flex gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={interactive ? () => onChange(star * 2) : undefined}
          onMouseEnter={interactive ? () => setHover(star) : undefined}
          onMouseLeave={interactive ? () => setHover(null) : undefined}
          className={`${interactive ? "cursor-pointer" : ""} ${
            star <= Math.round(starValue) ? "text-marquee" : "text-line"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
