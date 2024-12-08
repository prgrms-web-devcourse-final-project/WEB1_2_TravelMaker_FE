import CreateRoomContainer from "./containers/CreateRoomContainer";
import BackgroundModal from "@components/modal/BackgroundModal";

const CreateRoomModal = () => {
  return (
    <BackgroundModal showBackgroundImage>
      <CreateRoomContainer />
    </BackgroundModal>
  );
};

export default CreateRoomModal;
