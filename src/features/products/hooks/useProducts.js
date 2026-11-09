import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";

export default function useProducts(
  category,
  { page = 1, limit = 8, fetchAll = false, enabled = true } = {},
) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    if (!enabled) {
      setLoading(false);
      setError("");
      return () => controller.abort();
    }

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const result = await getProducts({
          category,
          limit: fetchAll ? 0 : limit,
          skip: fetchAll ? 0 : (page - 1) * limit,
          signal: controller.signal,
        });
        setProducts(result.products);
        setTotal(result.total);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Unable to load products. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [category, enabled, fetchAll, limit, page, reloadKey]);

  const retry = useCallback(() => setReloadKey((current) => current + 1), []);

  return { products, total, loading, error, retry };
}
