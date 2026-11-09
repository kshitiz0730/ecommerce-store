import { LISTING_SEARCH_PARAMS } from "../../../constants/filters";

function parsePrice(value) {
  if (value === null || value.trim() === "") {
    return "";
  }

  const normalizedValue = value.trim();
  const numericPrice = Number(normalizedValue);

  if (/^(?:\d+\.?\d*|\.\d+)$/.test(normalizedValue) && Number.isFinite(numericPrice)) {
    return normalizedValue;
  }

  return "";
}

export function readListingFilters(searchParams) {
  const requestedPage = Number.parseInt(
    searchParams.get(LISTING_SEARCH_PARAMS.page) ?? "1",
    10,
  );

  return {
    category: searchParams.get(LISTING_SEARCH_PARAMS.category) ?? "",
    minPrice: parsePrice(searchParams.get(LISTING_SEARCH_PARAMS.minimumPrice)),
    maxPrice: parsePrice(searchParams.get(LISTING_SEARCH_PARAMS.maximumPrice)),
    brands: [...new Set(searchParams.getAll(LISTING_SEARCH_PARAMS.brand).filter(Boolean))],
    query: (searchParams.get(LISTING_SEARCH_PARAMS.query) ?? "").trim(),
    page: Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
  };
}
