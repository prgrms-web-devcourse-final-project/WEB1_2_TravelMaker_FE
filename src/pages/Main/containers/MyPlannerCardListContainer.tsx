import { ComponentProps } from "react";

import { useTypedNavigate } from "@common/hooks/useTypedNavigate";
import MyPlannerCardList from "@components/cardList/MyPlannerCardList";
import { formatDate } from "@common/utils/formatDate";
import { useRoomList } from "../hooks/useRoomList";

type MyPlannerCardListProps = ComponentProps<typeof MyPlannerCardList>["items"];

const MyPlannerCardListContainer = () => {
  const { roomList } = useRoomList();
  const navigate = useTypedNavigate();

  const handlePlannerCardClick = (roomId?: string) => {
    if (roomId) {
      navigate(`/planner/:roomId`, { roomId });
    }
  };

  const handleEmptyCardClick = () => {
    navigate("/createModalRoom");
  };

  const cardList: MyPlannerCardListProps = (roomList ?? []).map((card) => {
    return {
      country: card.country,
      title: card.title,
      startDate: card.startDate ?? formatDate(new Date()),
      endDate: card.endDate ?? formatDate(new Date()),
      onClick: () => handlePlannerCardClick(card.roomId),
    };
  });

  return <MyPlannerCardList items={cardList} onEmptyCardClick={handleEmptyCardClick} />;
};

export default MyPlannerCardListContainer;
