import styled from "styled-components";
import { FC } from "react";
import { calcResponsive } from "@common/styles/theme";

interface InfoCardProps {
  label: string;
}

const InfoCard: FC<InfoCardProps> = ({ label }) => {
  return (
    <OuterContainer>
      <InnerContainer>
        <span>{label}</span> {/* 텍스트는 버튼 중앙에 위치 */}
      </InnerContainer>
    </OuterContainer>
  );
};

export default InfoCard;

const OuterContainer = styled.div`
  display: flex;
  cursor: pointer;
  user-select: none;
  /* width: 460px; */
  /* height: 130px; */
  width: ${calcResponsive({ value: 460, dimension: "width" })};
  min-width: 320px;
  min-height: ${calcResponsive({ value: 130, dimension: "height" })};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.stroke.neutral3}`};
  overflow: hidden;
`;

const InnerContainer = styled.div`
  /* width: ${calcResponsive({ value: 320, dimension: "width" })}; */
  /* height: ${calcResponsive({ value: 80, dimension: "height" })}; */
  flex: 1;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  flex-direction: column;
  /* margin-top: ${calcResponsive({ value: 22, dimension: "height" })}; */

  span {
    font-size: ${({ theme }) =>
      calcResponsive({
        value: theme.typography.heading.h2.fontSize,
        dimension: "height",
      })};
    color: ${({ theme }) => theme.colors.text.body}; /* 텍스트 색상 */
    font-family: ${({ theme }) => theme.typography.fontFamily.main};
    white-space: pre-wrap;
    text-align: center; /* 텍스트 중앙 정렬 */
  }
`;
