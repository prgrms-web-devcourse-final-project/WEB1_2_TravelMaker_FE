import { httpClient } from "@api/fetch";
import type { paths } from "@api/schema";
import type { ApiRequest, ApiResponse } from "@api/type";

type UpdateRoomResponse = ApiResponse<paths["/api/room"]["put"]>;
type UpdateRoomRequest = ApiRequest<paths["/api/room"]["put"]>;

/**
 * [PUT] 방 정보 수정
 */
export const updateRoom = async (payload: UpdateRoomRequest) => {
  const { data } = await httpClient.put<UpdateRoomResponse>(`/api/room`, payload);

  return data;
};
