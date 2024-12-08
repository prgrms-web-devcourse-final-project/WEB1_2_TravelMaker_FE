import { FC } from "react";

import Modal from "@components/modal/Modal";
import { useTypedParams } from "@common/hooks/useTypedParams";
import { ROUTES } from "@routes/type";
import { useTypedNavigate } from "@common/hooks/useTypedNavigate";
import { useRoomDelete } from "../hooks/useRoomDelete";
import { useEscapeKey } from "../hooks/useEscapeKey";

interface DeleteRoomContainerProps {
  onLeaveModal: () => void;
}

const DeleteRoomContainer: FC<DeleteRoomContainerProps> = ({ onLeaveModal }) => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();
  const { request } = useRoomDelete();
  const navigate = useTypedNavigate();

  useEscapeKey({ onClose: onLeaveModal });

  const title = "방을 삭제하시겠습니까?";

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

export default DeleteRoomContainer;
