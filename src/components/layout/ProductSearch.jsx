import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LISTING_SEARCH_PARAMS } from "../../constants/filters";

export default function ProductSearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentQuery = new URLSearchParams(location.search).get(LISTING_SEARCH_PARAMS.query) ?? "";
  const [draft, setDraft] = useState({ locationKey: location.key, value: currentQuery });
  const searchText = draft.locationKey === location.key ? draft.value : currentQuery;

  function handleSubmit(event) {
    event.preventDefault();

    const nextParams = new URLSearchParams(location.search);
    const normalizedQuery = searchText.trim();

    if (normalizedQuery) {
      nextParams.set(LISTING_SEARCH_PARAMS.query, normalizedQuery);
    } else {
      nextParams.delete(LISTING_SEARCH_PARAMS.query);
    }

    nextParams.delete(LISTING_SEARCH_PARAMS.page);
    const queryString = nextParams.toString();

    navigate({
      pathname: "/",
      search: queryString ? `?${queryString}` : "",
    });
  }

  return (
    <form
      className="relative order-3 w-full md:order-2 md:mx-auto md:max-w-[32.5rem] md:min-w-0 md:flex-1"
      role="search"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="product-search">
        Search products
      </label>
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 fill-none stroke-neutral-500 stroke-2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path strokeLinecap="round" d="m16 16 4 4" />
      </svg>
      <input
        id="product-search"
        className="min-h-10 w-full rounded-md border border-neutral-300 bg-white py-2 pl-10 pr-3.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-base"
        type="search"
        placeholder="Search products..."
        value={searchText}
        onChange={(event) => setDraft({ locationKey: location.key, value: event.target.value })}
      />
    </form>
  );
}
