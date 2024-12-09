import { useEffect } from "react";

import useFetch from "@common/hooks/useFetch";
import { getRoomList } from "../api/getRoomList";

export const useRoomList = () => {
  const { state, request } = useFetch(getRoomList);

  useEffect(() => {
    request(undefined);
  }, [request]);

  return {
    roomList: state.data,
    isLoading: state.loading,
    error: state.error,
  };
};
