import useFetch from "@common/hooks/useFetch";
import { updateRoom } from "../api/updateRoom";

export const useRoomUpdate = () => {
  const { state, request } = useFetch(updateRoom);

  return {
    request,
    roomInfo: state.data,
    isLoading: state.loading,
    error: state.error,
  };
};
