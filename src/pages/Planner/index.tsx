import { useTypedParams } from "@common/hooks/useTypedParams";
import MapComponent from "./components/MapComponent";
import { ROUTES } from "@routes/type";
import { WebSocketProvider } from "@common/provider/WebSocketProvider";

const Planner = () => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();

  if (!roomId) {
    throw new Error("Invalid room ID");
  }

  return (
    <WebSocketProvider roomId={roomId}>
      <MapComponent />
    </WebSocketProvider>
  );
};

export default Planner;
