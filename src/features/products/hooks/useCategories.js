import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../api/productsApi";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      setLoading(true);
      setError("");

      try {
        const result = await getCategories({ signal: controller.signal });
        setCategories(result);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || "Unable to load categories.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCategories();
    return () => controller.abort();
  }, [reloadKey]);

  const retry = useCallback(() => setReloadKey((current) => current + 1), []);

  return { categories, loading, error, retry };
}
