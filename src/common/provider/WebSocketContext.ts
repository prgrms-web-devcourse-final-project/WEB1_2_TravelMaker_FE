import { createContext } from "react";

import { UseWebSocketReturn } from "@common/hooks/useWebSocket";

export const WebSocketContext = createContext<UseWebSocketReturn | null>(null);
