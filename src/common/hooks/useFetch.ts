import { AxiosError } from "axios";
import { useCallback, useState } from "react";

import { delayExecution } from "@common/utils/delayExecution";

type ServerError = AxiosError<{
  error: {
    statusCode: number;
    message: string;
  };
}>;

interface FetchState<D> {
  data: D | null;
  loading: boolean;
  error: ServerError | null;
}

type FetchFunction<P, D> = P extends void ? () => Promise<D> : (payload: P) => Promise<D>;

interface UseFetchReturn<P, D> {
  state: FetchState<D>;
  request: P extends void ? () => Promise<void> : (payload: P) => Promise<void>;
}

const useFetch = <P, D>(
  fetch: FetchFunction<P, D>,
  options?: { delay: number }
): UseFetchReturn<P, D> => {
  const [state, setState] = useState<FetchState<D>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(async (payload?: P) => {
    try {
      setState(() => ({ data: null, error: null, loading: true }));

      if (options?.delay) {
        await delayExecution(options.delay).start();
      }

      const data = await (payload === undefined
        ? (fetch as () => Promise<D>)()
        : (fetch as (payload: P) => Promise<D>)(payload));

      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as ServerError,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state, request } as UseFetchReturn<P, D>;
};

export default useFetch;
