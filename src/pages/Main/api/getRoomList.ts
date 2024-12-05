import { httpClient } from "@api/fetch";
import type { paths } from "@api/schema";
import type { ApiResponse } from "@api/type";

const path = `/api/room/list`;

type RoomListResponse = ApiResponse<paths[typeof path]["get"]>;

/**
 * [GET] 방 리스트 조회
 */
export const getRoomList = async () => {
  const { data } = await httpClient.get<RoomListResponse>(path);

  return data;
};
