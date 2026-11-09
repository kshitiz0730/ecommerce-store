function parsePrice(value) {
  if (value === null || value.trim() === "") {
    return "";
  }

  const price = Number(value);
  return Number.isFinite(price) && price >= 0 ? String(price) : "";
}

export function readListingFilters(searchParams) {
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);

  return {
    category: searchParams.get("category") ?? "",
    minPrice: parsePrice(searchParams.get("min")),
    maxPrice: parsePrice(searchParams.get("max")),
    brands: [...new Set(searchParams.getAll("brand").filter(Boolean))],
    page: Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
  };
}
