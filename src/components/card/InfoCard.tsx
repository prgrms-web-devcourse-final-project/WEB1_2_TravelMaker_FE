import styled from "styled-components";
import { FC } from "react";
import { calcVwFromPx } from "@common/styles/theme";

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
  width: ${calcVwFromPx(460)};
  min-width: 460px;
  min-height: 130px;
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.stroke.neutral3}`};
  overflow: hidden;
`;

const InnerContainer = styled.div`
  width: 370px;
  height: 80px;
  flex: 1;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  flex-direction: column;
  margin-top: 22px;

  span {
    font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
    color: ${({ theme }) => theme.colors.text.body}; /* 텍스트 색상 */
    font-family: ${({ theme }) => theme.typography.fontFamily.main};
    white-space: pre-wrap;
    text-align: center; /* 텍스트 중앙 정렬 */
  }
`;