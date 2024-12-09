import { httpClient } from "@api/fetch";
import type { paths } from "@api/schema";
import type { ApiResponse } from "@api/type";

type DeleteRoomResponse = ApiResponse<paths["/api/room/{roomId}"]["delete"]>;

/**
 * [DELETE] 방 삭제
 */
export const deleteRoom = async (roomId: string) => {
  const { data } = await httpClient.delete<DeleteRoomResponse>(`/api/room/${roomId}`);

  return data;
};
