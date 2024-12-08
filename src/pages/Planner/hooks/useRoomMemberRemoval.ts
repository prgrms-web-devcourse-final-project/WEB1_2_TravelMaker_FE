import useFetch from "@common/hooks/useFetch";
import { removeUserFromRoom } from "../api/removeUserFromRoom";

export const useRoomMemberRemoval = () => {
  const { state, request } = useFetch(removeUserFromRoom);

  return {
    request,
    result: state.data,
    isLoading: state.loading,
    error: state.error,
  };
};
