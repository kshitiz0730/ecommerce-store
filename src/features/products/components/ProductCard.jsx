import { Link } from "react-router-dom";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function ProductCard({ product }) {
  return (
    <article className="min-w-0 rounded-md border border-neutral-200 bg-white transition duration-150 hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        className="block h-full rounded-md p-3.5 text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 max-md:p-2.5"
        to={`/product/${product.id}`}
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
          <span className="text-lg font-bold">
            {currencyFormatter.format(product.price)}
          </span>
          <span
            className="inline-flex items-center gap-1 whitespace-nowrap"
            aria-label={`Rated ${product.rating} out of 5`}
          >
            <span className="text-sm tracking-[-0.0625rem] text-amber-600" aria-hidden="true">
              ★★★★★
            </span>
            <span className="text-xs">({product.rating.toFixed(1)})</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
