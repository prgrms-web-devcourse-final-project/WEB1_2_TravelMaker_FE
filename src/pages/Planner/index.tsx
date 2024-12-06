import MapComponent from "./components/MapComponent";
import ScheduleManager from "@components/section/ScheduleManager";
import SampleWS from "./SampleWS";

const Planner = () => {
  return (
    <div>
      <SampleWS />
      <ScheduleManager />
      <MapComponent />
    </div>
  );
};

export default Planner;
