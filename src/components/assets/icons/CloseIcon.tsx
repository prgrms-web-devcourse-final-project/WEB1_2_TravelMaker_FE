import { ColorTypes } from "@common/styles/theme";
import styled from "styled-components";

interface CloseIconProps {
  size: number;
  color: ColorTypes;
}

const CloseIcon = styled.svg.attrs<CloseIconProps>(
  ({
    size,
    color: { category, state } = { category: "danger", state: "normal" } as ColorTypes,
    theme: { colors },
  }) => ({
    width: size,
    height: size,
    viewBox: "0 0 8 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: (
      <path
        d="M1 1L7 7M7 1L1 7"
        stroke={colors[category][state] ?? colors.text.title}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ),
  })
)``;

export default CloseIcon;
