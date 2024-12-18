import { FC, useState } from "react";
import styled from "styled-components";

import Profile from "./ChatProfile";

export const CHAT_INFO_BAR_HEADER_HEIGHT = 85;

const PROFILE_CONSTANTS = {
  SIZE: 40,
  SHADOW: "small" as const,
  IS_EXPANDED: false,
};

interface ProfileProps {
  url: string;
  onClick: () => void;
  isHost?: boolean;
  showBadge?: boolean;
}

interface Props {
  url: string;
  profiles: ProfileProps[];
}

const ChatInfoBar: FC<Props> = ({ url, profiles: initialProfiles }) => {
  const [isExpanded, setIsExpanded] = useState(PROFILE_CONSTANTS.IS_EXPANDED);
  const [profiles, setProfiles] = useState(initialProfiles);

  // Host 프로필 처리
  const handleHostProfileClick = (profile: ProfileProps) => {
    profile.onClick();
  };

  // 프로필 삭제 처리
  const handleProfileRemove = (currentIndex: number) => {
    setProfiles((prev) => prev.filter((_, index) => index !== currentIndex));
  };

  // 뱃지 활성화 처리
  const handleBadgeActivation = (currentIndex: number) => {
    setProfiles((prev) => {
      return prev.map((profile, index) => ({
        ...profile,
        showBadge: !profile.isHost && index === currentIndex,
      }));
    });
  };

  // 프로필 클릭 이벤트
  const handleProfileClick = (currentIndex: number) => {
    const currentProfile = profiles[currentIndex];

    if (currentProfile.isHost) {
      handleHostProfileClick(currentProfile);

      return;
    }

    if (currentProfile.showBadge) {
      handleProfileRemove(currentIndex);

      return;
    }

    handleBadgeActivation(currentIndex);
    currentProfile.onClick();
  };

  return (
    <InfoBarContainer>
      <ProfileContainer>
        {/* 메인 프로필 영역 */}
        <MyProfileContainer>
          <Profile.Image size={PROFILE_CONSTANTS.SIZE} url={url} stroke />
        </MyProfileContainer>
        {/* 스크롤 가능한 프로필 리스트 영역 */}
        <ScrollableArea>
          <ProfileListContainer>
            {isExpanded ? (
              <>
                {profiles.map((profile, index) => (
                  <Profile.ClickableImage
                    stroke
                    key={index}
                    size={PROFILE_CONSTANTS.SIZE}
                    url={profile.url}
                    onClick={() => handleProfileClick(index)}
                    isHost={profile.isHost}
                    showBadge={profile.showBadge}
                  />
                ))}
                <Profile.ClickableLabel
                  stroke
                  text={`+${profiles.length}`}
                  size={PROFILE_CONSTANTS.SIZE}
                  shadow={PROFILE_CONSTANTS.SHADOW}
                  onClick={() => setIsExpanded(false)}
                />
              </>
            ) : (
              <Profile.ClickableLabel
                stroke
                text={`+${profiles.length}`}
                size={PROFILE_CONSTANTS.SIZE}
                shadow={PROFILE_CONSTANTS.SHADOW}
                onClick={() => setIsExpanded(true)}
              />
            )}
          </ProfileListContainer>
        </ScrollableArea>
      </ProfileContainer>
    </InfoBarContainer>
  );
};

const InfoBarContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: ${CHAT_INFO_BAR_HEADER_HEIGHT}px;
  padding: 20px;
  background-color: ${({ theme }) => `${theme.colors.background.neutral3}99`};
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.secondary.strong}`};
  border-radius: ${({ theme: { cornerRadius } }) =>
    `${cornerRadius.extraLarge} ${cornerRadius.extraLarge} 0 0`};
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 50px;
  gap: 10px;
`;

const MyProfileContainer = styled.div`
  flex-shrink: 0;
`;

const ScrollableArea = styled.div`
  display: flex;
  flex-grow: 1;
  padding-top: 5px;
  transform: translateY(-5px);
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ProfileListContainer = styled.div`
  display: flex;
  position: relative;
  padding: 5px 0 10px;
  gap: 5px;
  flex-shrink: 0;
`;

export default ChatInfoBar;
