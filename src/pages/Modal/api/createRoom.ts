import { httpClient } from "@api/fetch";
import type { paths } from "@api/schema";
import type { ApiRequest, ApiResponse } from "@api/type";

const path = "/api/room";

type CreateRoomRequest = ApiRequest<paths[typeof path]["post"]>;
type CreateRoomResponse = ApiResponse<paths[typeof path]["post"]>;

/**
 * [POST] 방 생성
 */
// export const createRoom = async (payload: CreateRoomRequest) => {
//   const { data } = await httpClient.post<CreateRoomResponse>(path, payload);

//   return data;
// };

export const createRoom = async (payload: CreateRoomRequest) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No access token found");
  }

  const { data } = await httpClient.post<CreateRoomResponse>(path, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
