import { httpClient } from "@api/fetch";
import type { paths } from "@api/schema";
import type { ApiRequest, ApiResponse } from "@api/type";

const path = "/api/room/join";

type EnterRoomRequest = ApiRequest<paths[typeof path]["post"]>;
type EnterRoomResponse = ApiResponse<paths[typeof path]["post"]>;
export type EnterErrorResponse = paths[typeof path]["post"]["responses"];

/**
 * [POST] 방 입장
 */
export const enterRoom = async (payload: EnterRoomRequest) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No access token found");
  }
  const { data } = await httpClient.post<EnterRoomResponse>(path, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
