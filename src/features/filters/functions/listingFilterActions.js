import {
  LISTING_FILTER_PARAM_KEYS,
  LISTING_SEARCH_PARAMS,
} from "../../../constants/filters";

export function updateScalarFilterParams(searchParams, key, value) {
  const nextParams = new URLSearchParams(searchParams);
  const normalizedValue = value.trim();

  if (normalizedValue) {
    nextParams.set(key, normalizedValue);
  } else {
    nextParams.delete(key);
  }

  nextParams.delete(LISTING_SEARCH_PARAMS.page);
  return nextParams;
}

export function toggleBrandFilterParams(searchParams, brand) {
  const nextParams = new URLSearchParams(searchParams);
  const selectedBrands = new Set(nextParams.getAll(LISTING_SEARCH_PARAMS.brand));

  if (selectedBrands.has(brand)) {
    selectedBrands.delete(brand);
  } else {
    selectedBrands.add(brand);
  }

  nextParams.delete(LISTING_SEARCH_PARAMS.brand);
  selectedBrands.forEach((selectedBrand) => {
    nextParams.append(LISTING_SEARCH_PARAMS.brand, selectedBrand);
  });
  nextParams.delete(LISTING_SEARCH_PARAMS.page);

  return nextParams;
}

export function setListingPageParam(searchParams, page) {
  const nextParams = new URLSearchParams(searchParams);

  if (page <= 1) {
    nextParams.delete(LISTING_SEARCH_PARAMS.page);
  } else {
    nextParams.set(LISTING_SEARCH_PARAMS.page, String(page));
  }

  return nextParams;
}

export function clearListingFilterParams(searchParams) {
  const nextParams = new URLSearchParams(searchParams);
  LISTING_FILTER_PARAM_KEYS.forEach((key) => nextParams.delete(key));
  return nextParams;
}
