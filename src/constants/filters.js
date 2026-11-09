export const LISTING_SEARCH_PARAMS = Object.freeze({
  category: "category",
  minimumPrice: "min",
  maximumPrice: "max",
  brand: "brand",
  page: "page",
  query: "q",
});

export const LISTING_FILTER_KEYS = Object.freeze({
  category: LISTING_SEARCH_PARAMS.category,
  minimumPrice: LISTING_SEARCH_PARAMS.minimumPrice,
  maximumPrice: LISTING_SEARCH_PARAMS.maximumPrice,
});

export const LISTING_FILTER_PARAM_KEYS = Object.freeze([
  LISTING_SEARCH_PARAMS.category,
  LISTING_SEARCH_PARAMS.minimumPrice,
  LISTING_SEARCH_PARAMS.maximumPrice,
  LISTING_SEARCH_PARAMS.brand,
  LISTING_SEARCH_PARAMS.page,
]);
