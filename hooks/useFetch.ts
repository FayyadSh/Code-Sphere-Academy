import { useState, useEffect, useTransition } from 'react';

function useFetch<T>(
  fetchFunction: () => Promise<{ data: T }>,
  dependencies: any[] = []
) {

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  const reload = () => {
    startTransition(async () => {
      try {
        const result = await fetchFunction();
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }

  useEffect(() => {
    reload();
  }, dependencies);

  return { data, loading: isPending || loading, error, reload, setLoading };
}

export default useFetch;