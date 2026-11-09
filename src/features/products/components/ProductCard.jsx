import { Link, useLocation } from "react-router-dom";
import RatingStars from "./RatingStars";
import formatCurrency from "../utils/formatCurrency";

export default function ProductCard({ product }) {
  const location = useLocation();

  return (
    <article className="min-w-0 rounded-md border border-neutral-200 bg-white transition duration-150 hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        className="block h-full rounded-md p-3.5 text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 max-md:p-2.5"
        to={{ pathname: `/product/${product.id}`, search: location.search }}
      >
        <div className="mb-3 grid aspect-[1.45/1] place-items-center overflow-hidden bg-white">
          <img
            className="size-full object-contain"
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
          />
        </div>
        <h2 className="mb-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-base leading-[1.35] font-semibold">
          {product.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
          <span
            className="inline-flex items-center gap-1 whitespace-nowrap"
            role="img"
            aria-label={`Rated ${Number(product.rating).toFixed(1)} out of 5`}
          >
            <RatingStars rating={product.rating} className="text-sm" />
            <span className="text-xs" aria-hidden="true">
              ({Number(product.rating).toFixed(1)})
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
