// ScheduleApi.ts

// type ScheduleItem = {
//   scheduleItemId: number;
//   markerId: number;
//   name: string;
//   address: string;
//   content: string;
//   itemOrder?: number;
//   createdAt: string;
//   updatedAt: string;
// };

// WebSocket 송신 함수 (WebSocket 객체를 매개변수로 전달받아 송신)
const sendMessage = (socket: WebSocket, path: string, message: object) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ ...message, path }));
  } else {
    // console.error("WebSocket is not open");
  }
};

// **일정 목록 읽기**
export const listSchedules = (socket: WebSocket, roomId: string) => {
  sendMessage(socket, `/app/room/${roomId}/schedule`, {
    action: "LIST_SCHEDULES",
  });
};

// **일정 아이템 목록 읽기**
export const listScheduleItems = (socket: WebSocket, roomId: string, scheduleId: number) => {
  sendMessage(socket, `/app/room/${roomId}/schedule`, {
    action: "LIST_SCHEDULEITEMS",
    data: { scheduleId },
  });
};

// **일정 아이템 수정**
export const updateScheduleItem = (
  socket: WebSocket,
  roomId: string,
  scheduleItemId: number,
  name: string,
  content: string,
  previousItemId: number | null,
  nextItemId: number | null
) => {
  sendMessage(socket, `/app/room/${roomId}/schedule`, {
    action: "UPDATE_SCHEDULEITEM",
    data: { scheduleItemId, name, content, previousItemId, nextItemId },
  });
};

// **일정 아이템 삭제**
export const deleteScheduleItem = (socket: WebSocket, roomId: string, scheduleItemId: number) => {
  sendMessage(socket, `/app/room/${roomId}/schedule`, {
    action: "DELETE_SCHEDULEITEM",
    data: { scheduleItemId },
  });
};

// **마커 수정 (자동 일정 등록)**
export const updateMarkerWithConfirm = (socket: WebSocket, roomId: string, markerId: number) => {
  sendMessage(socket, `/app/room/${roomId}/map`, {
    action: "MARKER_UPDATE",
    confirm: true,
    data: { markerId },
  });
};
