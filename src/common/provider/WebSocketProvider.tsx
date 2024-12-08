import { FC, PropsWithChildren } from "react";

import { useWebSocket } from "@common/hooks/useWebSocket";
import { WebSocketContext } from "./WebSocketContext";

export const WebSocketProvider: FC<PropsWithChildren<{ roomId: string }>> = ({
  children,
  roomId,
}) => {
  const webSocket = useWebSocket(roomId);

  return <WebSocketContext.Provider value={webSocket}>{children}</WebSocketContext.Provider>;
};
