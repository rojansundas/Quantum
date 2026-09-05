import { useEffect, useRef, useState } from "react";
import { AxiosResponse } from "axios";

interface UseApiDataResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches `fetcher()` on mount and returns its `.data`.
 * Falls back to `fallback` (the existing hardcoded constant) whenever the
 * request is loading or fails, so a broken/offline API never blanks a
 * section of the site — it just quietly serves the old static content.
 */
export function useApiData<T>(
  fetcher: () => Promise<AxiosResponse<T>>,
  fallback: T,
  deps: unknown[] = [],
): UseApiDataResult<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((res) => {
        if (cancelled) return;
        setData(res.data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.message || "Failed to load data");
        setData(fallbackRef.current);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
