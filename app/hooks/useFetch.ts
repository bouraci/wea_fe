import toast from "react-hot-toast";
import useSWR from "swr";

export function useFetch<T>(key: string, fetcher: () => Promise<T>) {
  const { data, error, isLoading } = useSWR<T>(key, fetcher, {
    shouldRetryOnError: false,
  });

  if (error) {
    toast.error(error.message, { duration: 5000 });
  }

  return { data, error, isLoading };
}
