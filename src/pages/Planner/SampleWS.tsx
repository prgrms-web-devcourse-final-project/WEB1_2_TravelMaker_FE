import { useTypedParams } from "@common/hooks/useTypedParams";
import { WebSocketClient } from "@common/services/WebSocketClient";
import Button from "@components/button/Button";
import { ROUTES } from "@routes/type";
import { useEffect, useState } from "react";

interface ChatMessage {
  action: string;
  data: {
    sender: string;
    message: string;
    timestamp: string;
  };
}

const SampleWS = () => {
  const { roomId } = useTypedParams<typeof ROUTES.ENTER_MODAL>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const wsClient = WebSocketClient.getInstance();

    wsClient.connect(roomId);

    // 채팅 메시지 구독
    wsClient.subscribe(`/topic/room/${roomId}`, {
      onMessage: (data) => {
        const message = data as ChatMessage;

        // 메시지 종류에 따른 처리
        switch (message.action) {
          case "WELCOME_MESSAGE":
          case "BROADCAST_MESSAGE":
            setMessages((prev) => [...prev, message]);
            break;
          // 다른 액션 처리
        }
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error("에러 발생:", error);
        setIsConnected(false);
      },
    });

    setIsConnected(true);

    return () => {
      wsClient.disconnect();
      setIsConnected(false);
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!isConnected) return;

    const wsClient = WebSocketClient.getInstance();

    wsClient.send(`/app/room/${roomId}`, {
      action: "ENTER_ROOM",
    });
  };

  return (
    <div>
      <Button onClick={sendMessage} label="채팅 입장" disabled={!isConnected} />

      {/* 채팅 메시지 표시 */}
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span>{msg.data.sender}: </span>
            <span>{msg.data.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleWS;
