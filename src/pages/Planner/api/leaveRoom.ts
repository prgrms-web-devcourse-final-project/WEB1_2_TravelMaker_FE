import { httpClient } from "@api/fetch";
import type { paths } from "@api/schema";
import type { ApiResponse } from "@api/type";

type LeaveRoomResponse = ApiResponse<paths["/api/room/leave/{roomId}"]["delete"]>;

/**
 * [DELETE] 방 나가기
 */
export const leaveRoom = async (roomId: string) => {
  const { data } = await httpClient.delete<LeaveRoomResponse>(`/api/room/leave/${roomId}`);

  return data;
};
