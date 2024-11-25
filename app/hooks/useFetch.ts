import { useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export function useFetch<T>(key: string, fetcher: () => Promise<T>) {
  const { data, error, isLoading } = useSWR<T>(key, fetcher, {
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message, { duration: 5000 });
    }
  }, [error]);

  return { data, error, isLoading };
}
