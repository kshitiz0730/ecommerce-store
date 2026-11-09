import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import RatingStars from "../components/RatingStars";
import formatCurrency from "../utils/formatCurrency";
import useProduct from "../hooks/useProduct";

function formatCategory(category = "") {
  return category
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState("");
  const { product, loading, error, retry } = useProduct(id);
  const galleryImages = product?.images?.length
    ? product.images
    : product?.thumbnail
      ? [product.thumbnail]
      : [];
  const activeImage = galleryImages.includes(selectedImage)
    ? selectedImage
    : galleryImages[0];

  return (
    <section className="mx-auto w-full max-w-5xl" aria-labelledby="product-heading">
      <Link
        className="inline-flex min-h-10 items-center font-semibold text-neutral-800 no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        to={{ pathname: "/", search: location.search }}
      >
        ← Back
      </Link>

      {loading ? (
        <LoadingState variant="detail" message="Loading product details…" />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : product ? (
        <div className="mt-4 flex flex-col gap-6 sm:mt-6 sm:gap-8 md:flex-row md:items-start">
          <div className="w-full md:sticky md:top-24 md:w-5/12 md:shrink-0">
            <div className="grid aspect-[4/5] max-h-[35rem] place-items-center overflow-hidden rounded-md bg-neutral-50 p-4 sm:p-6 md:p-8">
              {activeImage ? (
                <img
                  className="size-full object-contain"
                  src={activeImage}
                  alt={product.title}
                />
              ) : (
                <p className="text-sm text-neutral-500">No product images available.</p>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div
                className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5"
                role="group"
                aria-label="Product image thumbnails"
              >
                {galleryImages.map((image, index) => (
                  <button
                    className={`grid aspect-square min-w-0 place-items-center overflow-hidden rounded border bg-white p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      activeImage === image
                        ? "border-blue-700 ring-2 ring-blue-100"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                    type="button"
                    key={image}
                    aria-label={`Show product image ${index + 1}`}
                    aria-pressed={activeImage === image}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img className="size-full object-contain" src={image} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 id="product-heading" className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
              {product.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-2xl font-bold sm:text-3xl">
                {formatCurrency(product.price)}
              </span>
              <span
                className="inline-flex items-center gap-1"
                role="img"
                aria-label={`Rated ${Number(product.rating).toFixed(1)} out of 5`}
              >
                <RatingStars rating={product.rating} className="text-base" />
                <span className="text-sm text-neutral-600" aria-hidden="true">
                  ({Number(product.rating).toFixed(1)})
                </span>
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-2 text-sm sm:text-base">
              <dt className="font-semibold">Brand</dt>
              <dd className="m-0 break-words text-neutral-700">{product.brand || "Not specified"}</dd>
              <dt className="font-semibold">Category</dt>
              <dd className="m-0 break-words text-neutral-700">{formatCategory(product.category)}</dd>
            </dl>

            <div className="mt-7">
              <h2 className="text-xl font-bold">Description</h2>
              <p className="mt-2 break-words leading-7 text-neutral-700">{product.description}</p>
            </div>

            <section className="mt-8" aria-labelledby="reviews-heading">
              <h2 id="reviews-heading" className="text-xl font-bold">Reviews</h2>
              {product.reviews?.length ? (
                <ul className="mt-3 space-y-4">
                  {product.reviews.map((review, index) => (
                    <li className="border-b border-neutral-200 pb-4 last:border-0" key={`${review.reviewerEmail || review.reviewerName}-${index}`}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-semibold">{review.reviewerName || "Customer"}</span>
                        <span
                          className="inline-flex items-center gap-1"
                          role="img"
                          aria-label={`Rated ${Number(review.rating).toFixed(1)} out of 5`}
                        >
                          <RatingStars rating={review.rating} className="text-sm" />
                          <span className="text-xs text-neutral-600" aria-hidden="true">
                            ({Number(review.rating).toFixed(1)})
                          </span>
                        </span>
                      </div>
                      <p className="mt-1 break-words leading-6 text-neutral-700">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-neutral-600">No reviews yet.</p>
              )}
            </section>
          </div>
        </div>
      ) : null}
    </section>
  );
}
