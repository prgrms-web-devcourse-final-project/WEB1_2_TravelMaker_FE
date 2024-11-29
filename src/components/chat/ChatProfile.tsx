import { ElementType, FC } from "react";
import styled, { css } from "styled-components";

import { ColorTypes, CustomTheme } from "@common/styles/theme";
import extractNumber from "@common/utils/extractNumber";
import calculateProportionalSize from "@common/utils/calculateProportionalSize";
import CloseIcon from "@components/assets/icons/CloseIcon";
import commonCircleStyle from "@common/styles/circleStyle";
import HostIcon from "@components/assets/icons/HostIcon";

type ShadowTypes = keyof (CustomTheme["shadows"] & { none: "string" });

interface BaseContentStyleProps {
  $size: number;
  $stroke?: boolean;
  $shadow?: ShadowTypes;
}

interface BadgeStyleProps extends Pick<BaseContentStyleProps, "$size"> {
  $color: ColorTypes;
  $showBadge?: boolean;
  $isInteractive?: boolean;
}

interface HostStyleProps {
  $isHost?: boolean;
  $position: {
    x: number;
    y: number;
  };
}

interface ProfileBaseProps {
  size: number;
  stroke?: boolean;
  shadow?: ShadowTypes;
}

interface ProfileImageProps extends ProfileBaseProps {
  url?: string;
  badgeColor?: ColorTypes;
  Icon?: ElementType<{ size: number; color: ColorTypes }>;
  showBadge?: boolean;
  isHost?: boolean;
}

interface ProfileLabelProps extends ProfileBaseProps {
  text: string;
}

interface ClickableProps {
  onClick: () => void;
  isInteractive?: boolean;
}

interface ProfileClickableProps extends ProfileImageProps, ClickableProps {}

interface ProfileClickableLabelProps extends ProfileLabelProps, ClickableProps {}

type ProfileComponent = {
  Image: FC<ProfileImageProps>;
  Label: FC<ProfileLabelProps>;
  ClickableImage: FC<ProfileClickableProps>;
  ClickableLabel: FC<ProfileClickableLabelProps>;
};

const DEFAULTS = {
  PROFILE_SIZE: 40,
  BADGE_SIZE: 14,
  ICON_SIZE: 6,
  HOST_POSITION: {
    x: 2,
    y: 7,
  },
} as const;

const Profile: ProfileComponent = {
  Image: ({ url, Icon = CloseIcon, ...styleProps }) => {
    const { size, stroke, shadow, badgeColor, showBadge, isHost } = styleProps;
    const { badgeDimension, badgeIconDimension, x, y } = getDimensions(size);

    return (
      <Base.ProfileContainer $size={size} $stroke={stroke} $shadow={shadow}>
        <Base.Host $position={{ x, y }} $isHost={isHost}>
          <HostIcon size={badgeDimension} />
        </Base.Host>
        <Base.Image src={url} />
        <Base.Badge $size={badgeDimension} $color={badgeColor as ColorTypes} $showBadge={showBadge}>
          <Icon size={badgeIconDimension} color={badgeColor as ColorTypes} />
        </Base.Badge>
      </Base.ProfileContainer>
    );
  },
  Label: ({ text, ...styleProps }) => {
    const { size, stroke, shadow } = styleProps;

    return (
      <Base.TextContainer $size={size} $stroke={stroke} $shadow={shadow}>
        <Base.Text>{text}</Base.Text>
      </Base.TextContainer>
    );
  },
  ClickableImage: ({ onClick, isInteractive, ...otherProps }) => {
    return (
      <Base.ClickableContainer onClick={onClick} $isInteractive={isInteractive}>
        <Profile.Image {...otherProps} />
      </Base.ClickableContainer>
    );
  },
  ClickableLabel: ({ onClick, isInteractive, ...otherProps }) => {
    return (
      <Base.ClickableContainer onClick={onClick} $isInteractive={isInteractive}>
        <Profile.Label {...otherProps} />
      </Base.ClickableContainer>
    );
  },
};

const baseContentStyle = css<BaseContentStyleProps>`
  ${commonCircleStyle}
  position: relative;
  user-select: none;
  border: ${({ $stroke, theme: { strokeWidth, colors } }) =>
    $stroke ? `${strokeWidth.regular} solid ${colors.text.title}` : "none"};
  box-shadow: ${({ theme, $shadow = "none" }) => $shadow !== "none" && theme.shadows[$shadow]};
`;

const Base = {
  ProfileContainer: styled.div.attrs<BaseContentStyleProps>(
    ({ $stroke = false, $shadow = "none" }) => ({
      $stroke,
      $shadow,
    })
  )<BaseContentStyleProps>`
    ${baseContentStyle}
    background-color: ${({ theme }) => theme.colors.tertiary.disabled};
  `,
  TextContainer: styled.div.attrs<BaseContentStyleProps>(
    ({ $stroke = false, $shadow = "small" }) => ({ $stroke, $shadow })
  )<BaseContentStyleProps>`
    ${baseContentStyle}
    background-color: ${({ theme }) => theme.colors.background.neutral0};
  `,
  ClickableContainer: styled.div.attrs<Pick<BadgeStyleProps, "$isInteractive">>(
    ({ $isInteractive = true }) => ({
      $isInteractive,
    })
  )`
    flex: 1;
    cursor: pointer;
    transition: ${({ $isInteractive }) => ($isInteractive ? "transform 0.2s ease" : "none")};
    &:hover {
      transform: ${({ $isInteractive }) => ($isInteractive ? "translateY(-5px)" : "none")};
    }
  `,
  Text: styled.p`
    min-width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.text.title};
    font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
  `,
  Image: styled.img.attrs(() => ({ alt: "image-profile" }))`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    border-radius: 50%;
  `,
  Badge: styled.div.attrs<BadgeStyleProps>(
    ({
      $color = { category: "danger", state: "normal" } as ColorTypes,
      $size,
      $showBadge = false,
    }) => ({
      $color,
      $size,
      $showBadge,
    })
  )<BadgeStyleProps>`
    ${commonCircleStyle}
    visibility:  ${({ $showBadge }) => ($showBadge ? "visible" : "hidden")};
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(1px, 1px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background.neutral0};
    border: ${({ theme: { strokeWidth, colors }, $size, $color: { category, state } }) => {
      const width = extractNumber(strokeWidth.regular);
      const calculatedWidth = Math.round(($size / DEFAULTS.BADGE_SIZE) * width);
      const borderColor = colors[category][state] ?? colors.text.title;

      return `${Math.max(width, calculatedWidth)}px solid ${borderColor}`;
    }};
  `,
  Host: styled.div.attrs<HostStyleProps>(({ $isHost = false }) => ({
    $isHost,
  }))`
    visibility: ${({ $isHost }) => ($isHost ? "visible" : "hidden")};
    position: absolute;
    top: 0;
    left: 0;
    transform: ${({ $position: { x, y } }) => `translate(${x}px, -${y}px)`};
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const getDimensions = (size: number) => {
  const getProportionalSize = (size: number, target: number) => {
    return calculateProportionalSize(size, target, DEFAULTS.PROFILE_SIZE);
  };

  return {
    badgeDimension: getProportionalSize(size, DEFAULTS.BADGE_SIZE),
    badgeIconDimension: getProportionalSize(size, DEFAULTS.ICON_SIZE),
    x: getProportionalSize(size, DEFAULTS.HOST_POSITION.x),
    y: getProportionalSize(size, DEFAULTS.HOST_POSITION.y),
  };
};

export default Profile;
