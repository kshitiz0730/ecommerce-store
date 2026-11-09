import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../api/productsApi";

export default function useProduct(id) {
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = JSON.stringify([id, reloadKey]);
  const [state, setState] = useState(() => ({
    key: requestKey,
    product: null,
    loading: true,
    error: "",
  }));

  useEffect(() => {
    const controller = new AbortController();
    async function loadProduct() {
      try {
        const product = await getProductById(id, { signal: controller.signal });
        setState({ key: requestKey, product, loading: false, error: "" });
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setState({
            key: requestKey,
            product: null,
            loading: false,
            error: requestError.message || "Unable to load this product.",
          });
        }
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [id, requestKey]);

  const retry = useCallback(() => setReloadKey((current) => current + 1), []);
  const isCurrentRequest = state.key === requestKey;

  return {
    product: isCurrentRequest ? state.product : null,
    loading: !isCurrentRequest || state.loading,
    error: isCurrentRequest ? state.error : "",
    retry,
  };
}
