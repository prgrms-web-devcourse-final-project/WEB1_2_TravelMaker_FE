import { useContext } from "react";

import { WebSocketContext } from "@common/provider/WebSocketContext";

export const useWebSocketClient = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocketClient must be used within WebSocketProvider");
  }

  return context;
};
