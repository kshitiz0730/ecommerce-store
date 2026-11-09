import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import ProductFilters from "../../filters/components/ProductFilters";
import { readListingFilters } from "../../filters/utils/listingSearchParams";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/ProductGrid";
import useCategories from "../hooks/useCategories";
import useProducts from "../hooks/useProducts";
import { filterProducts, getUniqueBrands } from "../utils/filterProducts";

const PRODUCTS_PER_PAGE = 8;

function formatCategoryName(category) {
  return category
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeCategory(category) {
  if (typeof category === "string") {
    return { slug: category, name: formatCategoryName(category) };
  }

  const slug = category.slug ?? category.name;
  return {
    slug,
    name: category.name ?? formatCategoryName(slug),
  };
}

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => readListingFilters(searchParams), [searchParams]);
  const needsClientFiltering =
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.brands.length > 0;
  const category = filters.category || undefined;

  const {
    products: serverProducts,
    total: serverTotal,
    loading: serverLoading,
    error: serverError,
    retry: retryServerProducts,
  } = useProducts(category, {
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
    () => categoriesResponse.map(normalizeCategory),
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

  function updateScalarFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);
    const normalizedValue = value.trim();

    if (normalizedValue) {
      nextParams.set(key, normalizedValue);
    } else {
      nextParams.delete(key);
    }

    nextParams.delete("page");
    setSearchParams(nextParams, { replace: true });
  }

  function handleBrandChange(brand) {
    const nextParams = new URLSearchParams(searchParams);
    const nextBrands = new Set(nextParams.getAll("brand"));

    if (nextBrands.has(brand)) {
      nextBrands.delete(brand);
    } else {
      nextBrands.add(brand);
    }

    nextParams.delete("brand");
    nextBrands.forEach((selectedBrand) => nextParams.append("brand", selectedBrand));
    nextParams.delete("page");
    setSearchParams(nextParams, { replace: true });
  }

  function handlePageChange(nextPage) {
    const nextParams = new URLSearchParams(searchParams);

    if (nextPage <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }

    setSearchParams(nextParams);
  }

  function clearFilters() {
    const nextParams = new URLSearchParams(searchParams);
    ["category", "min", "max", "brand", "page"].forEach((key) => nextParams.delete(key));
    setSearchParams(nextParams, { replace: true });
  }

  const productsLoading =
    needsClientFiltering ? catalogLoading : serverLoading;
  const productsError =
    needsClientFiltering ? catalogError : serverError;
  const retryProducts =
    needsClientFiltering ? retryCatalog : retryServerProducts;
  const resultCount =
    needsClientFiltering ? filteredProducts.length : serverTotal;

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
        onCategoryChange={(value) => updateScalarFilter("category", value)}
        onMinPriceChange={(value) => updateScalarFilter("min", value)}
        onMaxPriceChange={(value) => updateScalarFilter("max", value)}
        onBrandChange={handleBrandChange}
        onClear={clearFilters}
      />

      <div className="min-w-0 lg:flex-1">
        {productsLoading ? (
          <LoadingState />
        ) : productsError ? (
          <ErrorState message={productsError} onRetry={retryProducts} />
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
