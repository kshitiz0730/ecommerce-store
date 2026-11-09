import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../api/productsApi";

export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setLoading(true);
      setError("");

      try {
        const result = await getProductById(id, { signal: controller.signal });
        setProduct(result);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Unable to load this product.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [id, reloadKey]);

  const retry = useCallback(() => setReloadKey((current) => current + 1), []);

  return { product, loading, error, retry };
}
