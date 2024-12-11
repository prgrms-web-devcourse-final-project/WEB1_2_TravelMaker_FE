import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

import { useTypedNavigate } from "@common/hooks/useTypedNavigate";
import { useTypedParams } from "@common/hooks/useTypedParams";
import Modal, { HandleModalMessage } from "@components/modal/Modal";
import { ROUTES } from "@routes/type";
import { enterRoom } from "../api/enterRoom";

const EnterRoomContainer = () => {
  const title = "플래너 입장하기";

  const navigate = useTypedNavigate();
  const { roomId } = useTypedParams<typeof ROUTES.ENTER_MODAL>();
  const [searchParams] = useSearchParams();

  const enterCode = searchParams.get("enterCode") ?? "";

  const handleRoomEntry = async (code: string, handleMessage: HandleModalMessage) => {
    if (!roomId) return;

    try {
      await handleMessage("default", "플래너 입장중...", enterRoom({ roomId, roomCode: code }));
      navigate(`/planner/:roomId`, { roomId }, { replace: true });
    } catch (error) {
      handleEntryError(error, handleMessage);
    }
  };

  const handleModalClose = () => {
    navigate("/");
  };

  return (
    <Modal.Entry
      title={title}
      onEntry={handleRoomEntry}
      code={enterCode}
      onModalClose={handleModalClose}
    />
  );
};

const ERROR_MESSAGES = {
  400: "입장코드가 맞지 않거나 정원을 초과하였습니다.",
  404: "방을 찾을 수 없습니다.",
  409: "이미 들어와 있는 사용자입니다.",
  default: "알 수 없는 오류가 발생했습니다.",
} as const;

const handleEntryError = async (error: unknown, handleMessage: HandleModalMessage) => {
  if (error instanceof AxiosError) {
    const status = error.response?.status as keyof typeof ERROR_MESSAGES;
    const message = ERROR_MESSAGES[status] ?? ERROR_MESSAGES.default;

    await handleMessage("danger", message);
  }
};

export default EnterRoomContainer;
