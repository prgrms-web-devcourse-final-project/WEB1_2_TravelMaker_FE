import { useEffect } from "react";

import useFetch from "@common/hooks/useFetch";
import { getRoomDetail } from "../api/getRoomDetail";

export const useRoomInfo = (roomId?: string) => {
  const { state, request } = useFetch(getRoomDetail);

  useEffect(() => {
    if (roomId) request(roomId);
  }, [request, roomId]);

  return {
    roomInfo: state.data,
    isLoading: state.loading,
    error: state.error,
  };
};
