import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../api/productsApi";

export default function useCategories() {
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = String(reloadKey);
  const [state, setState] = useState(() => ({
    key: requestKey,
    categories: [],
    loading: true,
    error: "",
  }));

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const categories = await getCategories({ signal: controller.signal });
        setState({ key: requestKey, categories, loading: false, error: "" });
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setState({
            key: requestKey,
            categories: [],
            loading: false,
            error: requestError.message || "Unable to load categories.",
          });
        }
      }
    }

    loadCategories();
    return () => controller.abort();
  }, [reloadKey, requestKey]);

  const retry = useCallback(() => setReloadKey((current) => current + 1), []);
  const isCurrentRequest = state.key === requestKey;

  return {
    categories: isCurrentRequest ? state.categories : [],
    loading: !isCurrentRequest || state.loading,
    error: isCurrentRequest ? state.error : "",
    retry,
  };
}
