import { useMemo, useState } from "react";
import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/ProductGrid";
import useProducts from "../hooks/useProducts";

const PRODUCTS_PER_PAGE = 8;

export default function ProductListPage() {
  const { products, loading, error, retry } = useProducts();
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const visibleProducts = useMemo(() => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [page, products]);

  return (
    <section aria-labelledby="products-heading">
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <h1 id="products-heading" className="sr-only">Products</h1>
          <ProductGrid products={visibleProducts} />
          <Pagination
            currentPage={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}
