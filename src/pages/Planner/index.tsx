import MapComponent from "./components/MapComponent";
// import { WebSocketClient } from "@common/services/WebSocketClient";
// import React, { useEffect } from "react";

const Planner = () => {
  // useEffect(() => {
  //   // 페이지 진입 시 자동으로 WebSocket 연결
  //   const webSocketClient = WebSocketClient.getInstance();

  //   webSocketClient.connect("roomId"); // roomId는 해당 방의 ID로 바꿔야 합니다.

  //   // 연결 종료 시 WebSocket 끊기
  //   return () => {
  //     webSocketClient.disconnect();
  //   };
  // }, []);

  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default Planner;
