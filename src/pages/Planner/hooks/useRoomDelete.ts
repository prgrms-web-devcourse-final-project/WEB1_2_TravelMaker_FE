import useFetch from "@common/hooks/useFetch";
import { deleteRoom } from "../api/deleteRoom";

export const useRoomDelete = () => {
  const { state, request } = useFetch(deleteRoom);

  return {
    request,
    result: state.data,
    isLoading: state.loading,
    error: state.error,
  };
};
