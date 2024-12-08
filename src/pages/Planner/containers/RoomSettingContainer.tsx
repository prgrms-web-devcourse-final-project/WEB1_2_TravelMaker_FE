import { useTypedParams } from "@common/hooks/useTypedParams";
import Modal from "@components/modal/Modal";
import { ROUTES } from "@routes/type";
import { FC } from "react";
import { useRoomInfo } from "../hooks/useRoomInfo";
import { useRoomUpdate } from "../hooks/useRoomUpdate";
import { useEscapeKey } from "../hooks/useEscapeKey";

interface RoomSettingContainerProps {
  onLeaveModal: () => void;
}

const RoomSettingContainer: FC<RoomSettingContainerProps> = ({ onLeaveModal }) => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();
  const { roomInfo, isLoading } = useRoomInfo(roomId);
  const { request } = useRoomUpdate();

  useEscapeKey({ onClose: onLeaveModal });

  const title = isLoading ? "로딩중..." : "방 설정";
  const roomTitle = roomInfo?.title ?? "-";
  const destination = roomInfo?.country ?? "-";
  const schedule = {
    startDate: roomInfo?.startDate ? new Date(Date.parse(roomInfo?.startDate)) : new Date(),
    endDate: roomInfo?.endDate ? new Date(Date.parse(roomInfo?.endDate)) : new Date(),
  };

  return (
    <Modal.Config
      onModalClose={onLeaveModal}
      onConfirm={async (plannerFormData) => {
        if (!roomId) return;

        await request({
          roomId,
          title: plannerFormData.roomTitle,
          startDate: plannerFormData.schedule.startDate.toISOString(),
          endDate: plannerFormData.schedule.endDate.toISOString(),
          country: plannerFormData.destination,
        });
        onLeaveModal();
      }}
      buttonLabel="변경하기"
      plannerFormData={{
        destination,
        roomTitle,
        schedule,
      }}
      title={title}
    />
  );
};

export default RoomSettingContainer;
