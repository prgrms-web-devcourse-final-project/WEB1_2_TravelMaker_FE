import { ROUTES } from "@routes/type";
import { useRoomInfo } from "../hooks/useRoomInfo";
import { useTypedParams } from "@common/hooks/useTypedParams";
import { useUserProfile } from "../hooks/useUserProfile";
import PlannerSetting from "../components/PlannerSetting";

const PlannerSettingContainer = () => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();
  const { userProfile } = useUserProfile();
  const { roomInfo } = useRoomInfo(roomId);

  const isHost = userProfile?.email === roomInfo?.hostEmail;

  return <PlannerSetting isHost={isHost} />;
};

export default PlannerSettingContainer;
