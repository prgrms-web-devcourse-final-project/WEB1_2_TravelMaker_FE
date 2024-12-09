import BackgroundModal from "@components/modal/BackgroundModal";
import EnterRoomContainer from "./containers/EnterRoomContainer";

const EnterRoomModal = () => {
  return (
    <BackgroundModal showBackgroundImage>
      <EnterRoomContainer />
    </BackgroundModal>
  );
};

export default EnterRoomModal;
