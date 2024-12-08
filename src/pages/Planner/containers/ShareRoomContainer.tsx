import { FC } from "react";

import { useTypedParams } from "@common/hooks/useTypedParams";
import Modal from "@components/modal/Modal";
import { ROUTES } from "@routes/type";
import { useRoomInfo } from "../hooks/useRoomInfo";
import { useEscapeKey } from "../hooks/useEscapeKey";

interface ShareRoomContainerProps {
  onLeaveModal: () => void;
}

const ShareRoomContainer: FC<ShareRoomContainerProps> = ({ onLeaveModal }) => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();
  const { roomInfo, isLoading } = useRoomInfo(roomId);

  useEscapeKey({ onClose: onLeaveModal });

  const title = isLoading ? "로딩중..." : "플래너 공유하기";
  const currentRoomId = roomInfo?.roomId ?? "-";
  const url = roomInfo?.roomId ? `${import.meta.env.VITE_APP_URL}/planner/${currentRoomId}` : "-";
  const code = roomInfo?.roomCode ?? "-";

  return (
    <Modal.Share
      title={title}
      url={url}
      roomId={currentRoomId}
      code={code}
      onModalClose={onLeaveModal}
    />
  );
};

export default ShareRoomContainer;
