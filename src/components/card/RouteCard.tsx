import styled from "styled-components";
import { FC } from "react";
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

// 공통 스타일 정의
const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const TextEllipsis = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OuterContainer = styled.div`
  ${FlexBox};
  flex-direction: column;
  user-select: none;
  min-height: 130px;
  min-width: 460px;
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.stroke.neutral3}`};
  overflow: hidden;

  @media (max-width: 1500px) {
    min-width: 350px;
    min-height: 100px;
  }
`;

const TopContainer = styled(FlexBox)`
  justify-content: space-between;
  margin-left: 10px;
`;

const Index = styled.div`
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  color: ${({ theme }) => theme.colors.text.bodySubtle};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
`;

const CloseButton = styled.button`
  margin: 10px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.body};
  }
`;

const InnerContainer = styled(FlexBox)`
  flex-direction: column;
  margin-left: 18px;
`;

const TitleSection = styled(TextEllipsis)`
  width: 350px;
  margin-top: -10px;
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-weight: 500;
`;

const LocationSection = styled(TextEllipsis)`
  width: 330px;
  margin-top: 5px;
  font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-weight: 500;
`;

const BottomContainer = styled(FlexBox)`
  justify-content: flex-end;
  margin: -10px;

  @media (max-width: 1500px) {
    margin: -35px -8px 0 0;
  }
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
