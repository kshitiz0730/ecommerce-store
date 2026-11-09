import { PRODUCT_RATING_MAX } from "../../../constants/products";

export default function RatingStars({ rating, className = "" }) {
  const value = Number(rating);
  const normalizedRating = Number.isFinite(value)
    ? Math.max(0, Math.min(PRODUCT_RATING_MAX, value))
    : 0;
  const fillPercentage = (normalizedRating / PRODUCT_RATING_MAX) * 100;
  const stars = "★".repeat(PRODUCT_RATING_MAX);

  return (
    <span
      className={`relative inline-block whitespace-nowrap leading-none ${className}`}
      aria-hidden="true"
    >
      <span className="text-neutral-300">{stars}</span>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-amber-600"
        style={{ width: `${fillPercentage}%` }}
      >
        {stars}
      </span>
    </span>
  );
}
