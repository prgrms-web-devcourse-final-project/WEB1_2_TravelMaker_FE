import { FC } from "react";
import styled from "styled-components";

interface Props {
  size: number;
  url?: string;
  stroke?: boolean;
}

const ChatProfile: FC<Props> = ({ size, url, stroke }) => {
  return (
    <ProfileContainer>
      <ImageWrapper $size={size} $stroke={stroke}>
        <StyledImage src={url} alt={"chat-avatar"} />
      </ImageWrapper>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div<{ $size?: number; $stroke?: boolean }>`
  position: relative; // 자식 요소의 절대 위치 지정을 위한 기준점 설정 (방장 마크, 뱃지 등)
  width: 100%;
  max-width: ${({ $size }) => ($size ? `${$size}px` : "100%")};
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  border: ${({ $stroke, theme: { strokeWidth, colors } }) =>
    $stroke ? `${strokeWidth.regular} solid ${colors.text.title}` : "none"};
  background-color: ${({ theme }) => theme.colors.tertiary.disabled};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export default ChatProfile;
