const shimmerClass =
  "animate-shimmer rounded bg-linear-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] motion-reduce:animate-none";

function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-3 min-[22rem]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div className="rounded-md border border-neutral-200 p-3.5 max-md:p-2.5" key={index}>
          <div className={`${shimmerClass} mb-3 aspect-[1.45/1] w-full`} />
          <div className={`${shimmerClass} mb-3 h-4 w-3/4`} />
          <div className="flex items-center gap-2">
            <div className={`${shimmerClass} h-5 w-16`} />
            <div className={`${shimmerClass} h-4 w-20`} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-6 sm:mt-6 sm:gap-8 md:flex-row" aria-hidden="true">
      <div className={`${shimmerClass} aspect-[4/5] max-h-[35rem] w-full md:w-5/12`} />
      <div className="min-w-0 flex-1 space-y-6">
        <div className={`${shimmerClass} h-8 w-4/5 sm:h-10`} />
        <div className="flex gap-3">
          <div className={`${shimmerClass} h-8 w-28`} />
          <div className={`${shimmerClass} h-6 w-24`} />
        </div>
        <div className="space-y-3 pt-2">
          <div className={`${shimmerClass} h-4 w-3/5`} />
          <div className={`${shimmerClass} h-4 w-2/5`} />
        </div>
        <div className="space-y-3 pt-2">
          <div className={`${shimmerClass} h-6 w-36`} />
          <div className={`${shimmerClass} h-4 w-full`} />
          <div className={`${shimmerClass} h-4 w-full`} />
          <div className={`${shimmerClass} h-4 w-4/5`} />
        </div>
      </div>
    </div>
  );
}

export default function LoadingState({
  variant = "grid",
  message = "Loading products…",
}) {
  return (
    <div className="w-full" role="status" aria-live="polite">
      <span className="sr-only">{message}</span>
      {variant === "detail" ? <ProductDetailSkeleton /> : <ProductGridSkeleton />}
    </div>
  );
}
