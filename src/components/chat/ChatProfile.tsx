import { Shadows } from "@common/styles/theme";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  size: number;
  url?: string;
  stroke?: boolean;
  shadow?: ShadowTypes;
}

const ChatProfile: FC<Props> = ({ size, url, stroke, shadow = "none" }) => {
  return (
    <ProfileContainer>
      <ImageContainer $size={size} $stroke={stroke} $shadow={shadow}>
        <StyledImage src={url} alt={"chat-avatar"} />
      </ImageContainer>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
`;

type ShadowTypes = keyof (Shadows & { none: "string" });

const ImageContainer = styled.div<{ $size?: number; $stroke?: boolean; $shadow: ShadowTypes }>`
  position: relative;
  max-width: ${({ $size }) => ($size ? `${$size}px` : "100%")};
  width: ${({ $size }) => ($size ? `${$size}px` : "100%")}; // width 추가
  height: ${({ $size }) => ($size ? `${$size}px` : "100%")}; // height 추가
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  border: ${({ $stroke, theme: { strokeWidth, colors } }) =>
    $stroke ? `${strokeWidth.regular} solid ${colors.text.title}` : "none"};
  background-color: ${({ theme }) => theme.colors.tertiary.disabled};
  box-shadow: ${({ theme, $shadow }) => ($shadow === "none" ? null : theme.shadows[$shadow])};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

export default ChatProfile;
