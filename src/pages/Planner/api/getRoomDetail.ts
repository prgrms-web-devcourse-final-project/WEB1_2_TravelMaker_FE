import { httpClient } from "@api/fetch";
import type { paths } from "@api/schema";
import type { ApiResponse } from "@api/type";

type RoomDetailResponse = ApiResponse<paths["/api/room/{roomId}"]["get"]>;

/**
 * [GET] 단일 방 정보 조회
 */
export const getRoomDetail = async (roomId: string) => {
  const { data } = await httpClient.get<RoomDetailResponse>(`/api/room/${roomId}`);

  return data;
};
