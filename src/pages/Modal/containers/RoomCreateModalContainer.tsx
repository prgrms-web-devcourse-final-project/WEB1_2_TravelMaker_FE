import { useTypedNavigate } from "@common/hooks/useTypedNavigate";
import { formatDate } from "@common/utils/formatDate";
import Modal from "@components/modal/Modal";
import { ComponentProps } from "react";
import { createRoom } from "../api/createRoom";

type ConfirmHandler = ComponentProps<typeof Modal.Config>["onConfirm"];
type ConfirmData = Parameters<NonNullable<ConfirmHandler>>[0];

const RoomCreateModalContainer = () => {
  const title = "플래너 시작하기";

  const navigate = useTypedNavigate();

  const handleModalClose = () => {
    navigate("/");
  };

  const handlePlannerCreate = async (data: ConfirmData) => {
    const response = await createRoom({
      title: data.roomTitle,
      country: data.destination,
      startDate: formatDate(data.schedule.startDate),
      endDate: formatDate(data.schedule.endDate),
    });

    if (response.roomId) {
      navigate(`/planner/:roomId`, { roomId: response.roomId }, { replace: true });
    }
  };

  return (
    <Modal.Config title={title} onConfirm={handlePlannerCreate} onModalClose={handleModalClose} />
  );
};

export default RoomCreateModalContainer;
