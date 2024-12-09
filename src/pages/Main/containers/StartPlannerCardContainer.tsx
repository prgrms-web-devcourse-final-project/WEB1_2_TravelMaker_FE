import { useTypedNavigate } from "@common/hooks/useTypedNavigate";
import StartPlannerCard from "@components/card/StartPlannerCard";

const StartPlannerCardContainer = () => {
  const placeholder = "Room ID";

  const navigate = useTypedNavigate();

  const handleCreatePlannerClick = async () => {
    navigate("/createModalRoom");
  };

  const handleRoomCodeSubmit = (code: string) => {
    navigate("/enterModalRoom/:roomId", { roomId: code });
  };

  return (
    <StartPlannerCard
      onClickPlanner={handleCreatePlannerClick}
      onSubmit={handleRoomCodeSubmit}
      placeholder={placeholder}
    />
  );
};

export default StartPlannerCardContainer;
