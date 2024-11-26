import styled from "styled-components";
import { FC } from "react";
import { calcVwFromPx } from "@common/styles/theme";
import CloseIcon from "@components/assets/icons/CloseIcon";

interface RouteCardProps {
  index: number;
  title?: string;
  location: string;
  onClickClose?: () => void; // 닫기 버튼 클릭 핸들러
  onClickDetail?: () => void; // 상세 버튼 클릭 핸들러
}

const RouteCard: FC<RouteCardProps> = ({
  index,
  title = "제목 없음",
  location,
  onClickClose,
  onClickDetail,
}) => {
  return (
    <OuterContainer>
      <TopContainer>
        <Index>{index}</Index>
        <CloseButton onClick={onClickClose}>
          <CloseIcon />
        </CloseButton>
      </TopContainer>
      <InnerContainer>
        <TitleSection>{title}</TitleSection>
        <LocationSection>{location}</LocationSection>
      </InnerContainer>
      <BottomContainer>
        <DetailButton onClick={onClickDetail}>상세보기</DetailButton>
      </BottomContainer>
    </OuterContainer>
  );
};

export default RouteCard;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  width: ${calcVwFromPx(460)};
  min-width: 460px;
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
