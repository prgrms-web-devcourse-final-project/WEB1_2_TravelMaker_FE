import { FC, useCallback, useState } from "react";

import SettingButton from "@components/button/SettingButton";
import BackgroundModal from "@components/modal/BackgroundModal";
import LeaveRoomContainer from "../containers/LeaveRoomContainer";
import RoomSettingContainer from "../containers/RoomSettingContainer";
import ShareRoomContainer from "../containers/ShareRoomContainer";
import DeleteRoomContainer from "../containers/DeleteRoomContainer";

interface PlannerSettingProps {
  isHost: boolean;
}

const PlannerSetting: FC<PlannerSettingProps> = ({ isHost }) => {
  const [modalState, setModalState] = useState({
    share: false,
    delete: false,
    setting: false,
    leave: false,
  });

  const handleModal = useCallback((modalType: keyof typeof modalState) => {
    setModalState((prev) => ({
      ...prev,
      [modalType]: !prev[modalType],
    }));
  }, []);

  return (
    <>
      <SettingButton
        isHost={isHost}
        onShare={() => handleModal("share")}
        onDeleteRoom={() => handleModal("delete")}
        onSettingRoom={() => handleModal("setting")}
        onLeaveRoom={() => handleModal("leave")}
      />

      {/* 방 공유 */}
      {modalState.share && (
        <BackgroundModal>
          <ShareRoomContainer onLeaveModal={() => handleModal("share")} />
        </BackgroundModal>
      )}

      {/* 방 삭제 */}
      {modalState.delete && (
        <BackgroundModal>
          <DeleteRoomContainer onLeaveModal={() => handleModal("delete")} />
        </BackgroundModal>
      )}

      {/* 방 설정 */}
      {modalState.setting && (
        <BackgroundModal>
          <RoomSettingContainer onLeaveModal={() => handleModal("setting")} />
        </BackgroundModal>
      )}

      {/* 방 나가기 */}
      {modalState.leave && (
        <BackgroundModal>
          <LeaveRoomContainer onLeaveModal={() => handleModal("leave")} />
        </BackgroundModal>
      )}
    </>
  );
};

export default PlannerSetting;
