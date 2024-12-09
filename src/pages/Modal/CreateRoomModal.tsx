import CreateRoomContainer from "./containers/CreateRoomContainer";
import BackgroundModal from "@components/modal/BackgroundModal";

const CreateRoomModal = () => {
  return (
    <BackgroundModal showBackgroundImage useZIndex={false}>
      <CreateRoomContainer />
    </BackgroundModal>
  );
};

export default CreateRoomModal;
