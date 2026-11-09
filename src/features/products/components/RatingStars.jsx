export default function RatingStars({ rating, className = "" }) {
  const value = Number(rating);
  const normalizedRating = Number.isFinite(value)
    ? Math.max(0, Math.min(5, value))
    : 0;
  const fillPercentage = (normalizedRating / 5) * 100;

  return (
    <span
      className={`relative inline-block whitespace-nowrap leading-none ${className}`}
      aria-hidden="true"
    >
      <span className="text-neutral-300">★★★★★</span>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-amber-600"
        style={{ width: `${fillPercentage}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}
