import useFetch from "@common/hooks/useFetch";
import { leaveRoom } from "../api/leaveRoom";

export const useRoomLeave = () => {
  const { state, request } = useFetch(leaveRoom);

  return {
    request,
    result: state.data,
    isLoading: state.loading,
    error: state.error,
  };
};
