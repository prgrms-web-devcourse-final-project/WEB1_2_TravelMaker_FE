import { FC } from "react";

import Modal from "@components/modal/Modal";
import { useRoomLeave } from "../hooks/useRoomLeave";
import { useTypedParams } from "@common/hooks/useTypedParams";
import { ROUTES } from "@routes/type";
import { useTypedNavigate } from "@common/hooks/useTypedNavigate";
import { useEscapeKey } from "../hooks/useEscapeKey";

interface LeaveRoomContainerProps {
  onLeaveModal: () => void;
}

const LeaveRoomContainer: FC<LeaveRoomContainerProps> = ({ onLeaveModal }) => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();
  const { request } = useRoomLeave();
  const navigate = useTypedNavigate();

  useEscapeKey({ onClose: onLeaveModal });

  const title = "방을 나가시겠습니까?";

  return (
    <Modal.Confirm
      title={title}
      onCancel={onLeaveModal}
      onConfirm={async () => {
        if (!roomId) return;

        await request(roomId);
        onLeaveModal();
        navigate("/", undefined, { replace: true });
      }}
    />
  );
};

export default LeaveRoomContainer;
