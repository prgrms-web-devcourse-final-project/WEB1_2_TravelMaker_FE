import { useTypedNavigate } from "@common/hooks/useTypedNavigate";
import StartPlannerCard from "@components/card/StartPlannerCard";

const StartPlannerCardContainer = () => {
  const placeholder = "Room ID";
  const navigate = useTypedNavigate();

  return (
    <StartPlannerCard
      onClickPlanner={() => navigate("/createModalRoom")}
      onSubmit={() => navigate("/enterModalRoom")}
      placeholder={placeholder}
    />
  );
};

export default StartPlannerCardContainer;
