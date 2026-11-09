export default function Pagination({ currentPage, pageCount, onPageChange }) {
  if (pageCount <= 1) {
    return null;
  }

  const maxVisibleButtons = 5;
  const firstPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(maxVisibleButtons / 2), pageCount - maxVisibleButtons + 1),
  );
  const lastPage = Math.min(pageCount, firstPage + maxVisibleButtons - 1);
  const pageNumbers = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index,
  );

  return (
    <nav className="mt-7 flex flex-wrap items-center justify-center gap-1.5" aria-label="Product pages">
      <button
        className="min-h-9 rounded border border-transparent px-2.5 py-1.5 font-semibold text-neutral-800 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`min-h-9 min-w-9 rounded border px-2.5 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
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
      ))}
      <button
        className="min-h-9 rounded border border-transparent px-2.5 py-1.5 font-semibold text-neutral-800 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        Next →
      </button>
    </nav>
  );
}
