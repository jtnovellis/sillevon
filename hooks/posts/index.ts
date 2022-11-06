import { useState, useEffect } from 'react';
import { featchPosts } from '../../lib/loadPosts';

export function usePosts(page = 1) {
  const [result, setResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    const controller = new AbortController();
    const { signal } = controller;
    featchPosts(page, { signal })
      .then((data) => {
        setResult((prev) => [...prev, data.docs]);
        setHasNextPage(Boolean(data.docs.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });
    return () => controller.abort();
  }, [page]);

  return { result, isLoading, isError, error, hasNextPage };
}
