import { useEffect } from "react";

import { fetchUserProfile } from "@api/my/member";
import useFetch from "@common/hooks/useFetch";

export const useUserProfile = () => {
  const { state, request } = useFetch(fetchUserProfile);

  useEffect(() => {
    request(undefined);
  }, [request]);

  return {
    userProfile: state.data,
    isLoading: state.loading,
    error: state.error,
  };
};
