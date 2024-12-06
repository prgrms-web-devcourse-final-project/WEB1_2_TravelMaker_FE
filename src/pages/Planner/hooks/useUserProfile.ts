import { useEffect } from "react";

import { fetchUserProfile } from "@api/my/member";
import useFetch from "@common/hooks/useFetch";

export const useUserProfile = () => {
  const { state, request } = useFetch(fetchUserProfile);

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    userProfile: state.data,
    isLoading: state.loading,
    error: state.error,
  };
};
