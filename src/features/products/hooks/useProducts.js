import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";

export default function useProducts(
  category,
  { page = 1, limit, query = "", fetchAll = false, enabled = true } = {},
) {
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = JSON.stringify([
    category ?? "",
    query,
    page,
    limit,
    fetchAll,
    enabled,
    reloadKey,
  ]);
  const [state, setState] = useState(() => ({
    key: requestKey,
    products: [],
    total: 0,
    loading: enabled,
    error: "",
  }));

  useEffect(() => {
    const controller = new AbortController();

    if (!enabled) {
      return () => controller.abort();
    }

    async function loadProducts() {
      try {
        const result = await getProducts({
          category,
          query,
          limit: fetchAll ? 0 : limit,
          skip: fetchAll ? 0 : (Math.max(1, page) - 1) * limit,
          signal: controller.signal,
        });
        setState({
          key: requestKey,
          products: result.products,
          total: result.total,
          loading: false,
          error: "",
        });
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setState({
            key: requestKey,
            products: [],
            total: 0,
            loading: false,
            error: requestError.message || "Unable to load products. Please try again.",
          });
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [category, enabled, fetchAll, limit, page, query, requestKey]);

  const retry = useCallback(() => setReloadKey((current) => current + 1), []);
  const isCurrentRequest = state.key === requestKey;

  return {
    products: isCurrentRequest ? state.products : [],
    total: isCurrentRequest ? state.total : 0,
    loading: enabled && (!isCurrentRequest || state.loading),
    error: isCurrentRequest ? state.error : "",
    retry,
  };
}
