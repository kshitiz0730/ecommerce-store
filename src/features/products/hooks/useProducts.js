import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";

export default function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const result = await getProducts({ category, signal: controller.signal });
        setProducts(result);
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
  }, [category, reloadKey]);

  const retry = useCallback(() => setReloadKey((current) => current + 1), []);

  return { products, loading, error, retry };
}
