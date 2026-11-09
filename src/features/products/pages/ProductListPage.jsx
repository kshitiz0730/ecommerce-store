import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS_PER_PAGE } from "../../../constants/products";
import { LISTING_FILTER_KEYS } from "../../../constants/filters";
import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import ProductFilters from "../../filters/components/ProductFilters";
import {
  clearListingFilterParams,
  setListingPageParam,
  toggleBrandFilterParams,
  updateScalarFilterParams,
} from "../../filters/functions/listingFilterActions";
import { readListingFilters } from "../../filters/utils/listingSearchParams";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/ProductGrid";
import useCategories from "../hooks/useCategories";
import useProducts from "../hooks/useProducts";
import { filterProducts, getUniqueBrands } from "../utils/filterProducts";
import normalizeCategory from "../utils/normalizeCategory";

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => readListingFilters(searchParams), [searchParams]);
  const hasPriceOrBrandFilter =
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.brands.length > 0;
  const needsClientFiltering = hasPriceOrBrandFilter || Boolean(filters.category && filters.query);
  const category = filters.category || undefined;

  const {
    products: serverProducts,
    total: serverTotal,
    loading: serverLoading,
    error: serverError,
    retry: retryServerProducts,
  } = useProducts(category, {
    query: category || needsClientFiltering ? "" : filters.query,
    page: needsClientFiltering ? 1 : filters.page,
    limit: PRODUCTS_PER_PAGE,
    enabled: !needsClientFiltering,
  });
  const {
    products: catalogProducts,
    loading: catalogLoading,
    error: catalogError,
    retry: retryCatalog,
  } = useProducts(category, { fetchAll: true });
  const {
    categories: categoriesResponse,
    loading: categoriesLoading,
    error: categoriesError,
    retry: retryCategories,
  } = useCategories();

  const categories = useMemo(
    () => categoriesResponse.map(normalizeCategory).filter(Boolean),
    [categoriesResponse],
  );
  const brands = useMemo(() => getUniqueBrands(catalogProducts), [catalogProducts]);
  const filteredProducts = useMemo(
    () => filterProducts(catalogProducts, filters),
    [catalogProducts, filters],
  );
  const pageCount = Math.ceil(
    (needsClientFiltering ? filteredProducts.length : serverTotal) / PRODUCTS_PER_PAGE,
  );
  const currentPage = Math.min(filters.page, Math.max(pageCount, 1));
  const visibleProducts = useMemo(() => {
    if (!needsClientFiltering) {
      return serverProducts;
    }

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [currentPage, filteredProducts, needsClientFiltering, serverProducts]);
  const productsLoading = needsClientFiltering ? catalogLoading : serverLoading;
  const productsError = needsClientFiltering ? catalogError : serverError;
  const resultCount = needsClientFiltering ? filteredProducts.length : serverTotal;
  const pageOutOfRange = filters.page > Math.max(pageCount, 1);

  useEffect(() => {
    if (productsLoading || !pageOutOfRange) {
      return;
    }

    setSearchParams(setListingPageParam(searchParams, currentPage), { replace: true });
  }, [
    currentPage,
    pageOutOfRange,
    productsLoading,
    searchParams,
    setSearchParams,
  ]);

  function updateScalarFilter(key, value) {
    setSearchParams(updateScalarFilterParams(searchParams, key, value), { replace: true });
  }

  function handleBrandChange(brand) {
    setSearchParams(toggleBrandFilterParams(searchParams, brand), { replace: true });
  }

  function handlePageChange(nextPage) {
    setSearchParams(setListingPageParam(searchParams, nextPage));
  }

  function clearFilters() {
    setSearchParams(clearListingFilterParams(searchParams), { replace: true });
  }

  return (
    <section className="flex flex-col gap-8 lg:flex-row" aria-label="Product catalog">
      <ProductFilters
        categories={categories}
        category={filters.category}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        brands={brands}
        selectedBrands={filters.brands}
        categoriesLoading={categoriesLoading}
        categoriesError={categoriesError}
        onRetryCategories={retryCategories}
        brandsLoading={catalogLoading}
        brandsError={catalogError}
        onRetryBrands={retryCatalog}
        onCategoryChange={(value) => updateScalarFilter(LISTING_FILTER_KEYS.category, value)}
        onMinPriceChange={(value) => updateScalarFilter(LISTING_FILTER_KEYS.minimumPrice, value)}
        onMaxPriceChange={(value) => updateScalarFilter(LISTING_FILTER_KEYS.maximumPrice, value)}
        onBrandChange={handleBrandChange}
        onClear={clearFilters}
      />

      <div className="min-w-0 lg:flex-1">
        {productsLoading || pageOutOfRange ? (
          <LoadingState />
        ) : productsError ? (
          <ErrorState message={productsError} onRetry={needsClientFiltering ? retryCatalog : retryServerProducts} />
        ) : resultCount === 0 ? (
          <EmptyState message="No products match the selected filters." />
        ) : (
          <>
            <h1 className="sr-only">Products</h1>
            <ProductGrid products={visibleProducts} />
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
}
