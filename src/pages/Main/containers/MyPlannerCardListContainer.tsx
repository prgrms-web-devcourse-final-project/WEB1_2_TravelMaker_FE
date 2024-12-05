import { ComponentProps, useEffect } from "react";

import { useTypedNavigate } from "@common/hooks/useTypedNavigate";
import MyPlannerCardList from "@components/cardList/MyPlannerCardList";
import { getRoomList } from "../api/getRoomList";
import useFetch from "@common/hooks/useFetch";
import { formatDate } from "@common/utils/formatDate";

type MyPlannerCardListProps = ComponentProps<typeof MyPlannerCardList>["items"];

const MyPlannerCardListContainer = () => {
  const { request, state } = useFetch(getRoomList);
  const navigate = useTypedNavigate();

  const handlePlannerCardClick = (roomId?: string) => {
    if (roomId) {
      navigate(`/planner/:roomId`, { roomId });
    }
  };

  const handleEmptyCardClick = () => {
    navigate("/createModalRoom");
  };

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardList: MyPlannerCardListProps = (state.data ?? []).map((card) => {
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
