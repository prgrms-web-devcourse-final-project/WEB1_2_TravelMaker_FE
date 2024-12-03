import styled from "styled-components";
import { FC } from "react";

import { calcResponsive } from "@common/styles/theme";
import CloseIcon from "@components/assets/icons/CloseIcon";

interface RouteCardProps {
  schedule_id: number; // 스케줄 ID
  marker_id?: number; // 카드의 순서
  title?: string; // 제목 (기본값: "제목 없음")
  address: string; // 주소
  contents?: string; // 내용 (옵션)
}

// RouteCard 컴포넌트 정의
const RouteCard: FC<RouteCardProps> = ({ marker_id, title = "제목 없음", address }) => {
  return (
    <OuterContainer>
      {/* 상단: 인덱스와 닫기 버튼 */}
      <TopContainer>
        <Index>{marker_id}</Index>
        <CloseButton>
          <CloseIcon />
        </CloseButton>
      </TopContainer>

      {/* 중단: 제목과 위치 */}
      <InnerContainer>
        <TitleSection>{title}</TitleSection>
        <LocationSection>{address}</LocationSection>
      </InnerContainer>

      {/* 하단: 상세보기 버튼 */}
      <BottomContainer>
        <DetailButton>상세보기</DetailButton>
      </BottomContainer>
    </OuterContainer>
  );
};

export default RouteCard;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  /* min-width: calcResponsiveWidth(460); */
  min-width: ${calcResponsive({ value: 460 })};
  min-height: 130px;
  height: 130px;
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.stroke.neutral3}`};
  overflow: hidden;
`;

const TopContainer = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Index = styled.div`
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  color: ${({ theme }) => theme.colors.text.bodySubtle};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
`;

const CloseButton = styled.button`
  margin-right: 10px;
  margin-top: 10px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.body};
  }
`;

const InnerContainer = styled.div`
  margin-left: 18px;
  display: flex;
  flex-direction: column;
`;

const TitleSection = styled.div`
  width: 350px;
  margin-top: -10px;
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-weight: 500;

  /* 말줄임표 설정 */
  white-space: nowrap; /* 한 줄로 제한 */
  overflow: hidden; /* 넘친 내용 숨김 */
  text-overflow: ellipsis; /* 말줄임표 표시 */
`;

const LocationSection = styled.div`
  width: 330px;
  margin-top: 5px;
  font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-weight: 500;

  /* 말줄임표 설정 */
  white-space: nowrap; /* 한 줄로 제한 */
  overflow: hidden; /* 넘친 내용 숨김 */
  text-overflow: ellipsis; /* 말줄임표 표시 */
`;

const BottomContainer = styled.div`
  margin: -10px;
  display: flex;
  justify-content: flex-end;
`;

const DetailButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.text.title};
  color: ${({ theme }) => theme.colors.background.neutral0};
  font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
  border: none;
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.body};
  }
`;
