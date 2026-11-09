import { MAX_VISIBLE_PAGE_BUTTONS } from "../../../constants/pagination";

export default function Pagination({ currentPage, pageCount, onPageChange }) {
  if (pageCount <= 1) {
    return null;
  }

  const firstPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(MAX_VISIBLE_PAGE_BUTTONS / 2),
      pageCount - MAX_VISIBLE_PAGE_BUTTONS + 1,
    ),
  );
  const lastPage = Math.min(pageCount, firstPage + MAX_VISIBLE_PAGE_BUTTONS - 1);
  const pageNumbers = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index,
  );

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-1 sm:mt-7 sm:gap-1.5" aria-label="Product pages">
      <button
        className="min-h-9 rounded border border-transparent px-2 py-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-2.5 sm:text-base"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">← Previous</span>
      </button>
      {pageNumbers.map((pageNumber) => {
        const visibleOnSmallScreen = Math.abs(pageNumber - currentPage) <= 1;

        return (
          <button
            key={pageNumber}
            className={`min-h-9 min-w-9 rounded border px-2 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-2.5 sm:text-base ${visibleOnSmallScreen ? "inline-block" : "hidden"} sm:inline-block ${
              pageNumber === currentPage
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-100"
            }`}
            type="button"
            aria-current={pageNumber === currentPage ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className="min-h-9 rounded border border-transparent px-2 py-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-2.5 sm:text-base"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        aria-label="Go to next page"
      >
        <span className="sm:hidden">→</span>
        <span className="hidden sm:inline">Next →</span>
      </button>
    </nav>
  );
}
