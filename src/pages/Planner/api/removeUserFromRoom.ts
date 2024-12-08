import { AxiosResponse } from "axios";

import { httpClient } from "@api/fetch";
import type { paths } from "@api/schema";
import type { ApiResponse, ApiRequest } from "@api/type";

type removeUserFromRoomResponse = ApiResponse<paths["/api/room/forcedExit"]["delete"]>;
type removeUserFromRoomRequest = ApiRequest<paths["/api/room/forcedExit"]["delete"]>;

/**
 * [DELETE] 방 추방
 */
export const removeUserFromRoom = async (payload: removeUserFromRoomRequest) => {
  const { data } = await httpClient.delete<
    removeUserFromRoomResponse,
    AxiosResponse<removeUserFromRoomResponse>,
    removeUserFromRoomRequest
  >("/api/room/forcedExit", {
    data: payload,
  });

  return data;
};
