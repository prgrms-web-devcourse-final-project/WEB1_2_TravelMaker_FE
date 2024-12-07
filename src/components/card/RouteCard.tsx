import styled from "styled-components";
import { FC, useState } from "react";
import CloseIcon from "@components/assets/icons/CloseIcon";
import closebutton from "@components/assets/icons/closebutton.svg";

// API 응답에 맞춘 RouteCardProps 타입 정의
interface RouteCardProps {
  scheduleItemId: number; // 스케줄 아이템 ID
  markerId: number; // 카드의 순서
  name?: string; // 제목
  address: string; // 주소
  content?: string; // 내용 (옵션)
  createdAt: string;
  updatedAt: string;
}

const RouteCard: FC<RouteCardProps> = ({ markerId, name, address, content = "" }) => {
  const [showDetails, setShowDetails] = useState(false); // 상세보기 상태 관리
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 관리
  const [editableName, setEditableName] = useState(name); // 수정 가능한 이름 상태
  const [editableContent, setEditableContent] = useState(content); // 수정 가능한 내용 상태

  const toggleDetails = () => {
    setShowDetails(!showDetails); // 토글 상태 변경
    setIsEditing(false); // 팝업을 닫을 때 수정 모드 해제
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing); // 수정 모드 토글
  };

  // const handleSave = () => {
  //   setIsEditing(false); // 저장 후 수정 모드 해제
  //   // 여기에서 변경된 이름과 내용에 대한 저장 작업을 진행합니다.
  // };
  //ESlint 때문에 주석처리함

  return (
    <OuterContainer>
      {/* 상단: 인덱스와 닫기 버튼 */}
      <TopContainer>
        <Index>{markerId}</Index>
        <CloseButton>
          <CloseIcon />
        </CloseButton>
      </TopContainer>

      {/* 중단: 제목과 위치 */}
      <InnerContainer>
        <TitleSection>{name}</TitleSection>
        <LocationSection>{address}</LocationSection>
      </InnerContainer>

      {/* 하단: 상세보기 버튼 */}
      <BottomContainer>
        <DetailButton onClick={toggleDetails}>
          {showDetails ? "상세보기 닫기" : "상세보기"}
        </DetailButton>
      </BottomContainer>

      {/* 상세 정보 창 */}
      {showDetails && (
        <DetailPopup>
          <ClosePopupButton onClick={toggleDetails}>
            <img src={closebutton} alt="닫기" />
          </ClosePopupButton>

          <DetailContent>
            <MarkerId>{markerId}</MarkerId>
            <Name>
              {isEditing ? (
                <Input value={editableName} onChange={(e) => setEditableName(e.target.value)} />
              ) : (
                editableName
              )}
            </Name>
            <Address>{address}</Address>
            <Content>
              {isEditing ? (
                <TextArea
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                />
              ) : (
                editableContent || "내용 없음"
              )}
            </Content>
          </DetailContent>

          <ButtonContainer>
            <EditButton onClick={toggleEdit}>{isEditing ? "저장" : "수정"}</EditButton>
          </ButtonContainer>
        </DetailPopup>
      )}
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

  @media (max-width: 1550px) {
    min-width: 350px;
    min-height: 100px;
  }

  @media (max-width: 1024px) {
    min-width: 320px;
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

  @media (max-width: 1024px) {
    width: 300px;
  }
`;

const LocationSection = styled(TextEllipsis)`
  width: 330px;
  margin-top: 5px;
  font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-weight: 500;

  @media (max-width: 1024px) {
    width: 300px;
  }
`;

const BottomContainer = styled(FlexBox)`
  justify-content: flex-end;
  margin: -10px;

  @media (max-width: 1550px) {
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

  @media (max-width: 1024px) {
    width: 60px;
    height: 25px;
    font-size: 13px;
  }
`;

const DetailPopup = styled.div`
  width: 460px;
  height: 575px;
  position: fixed; /* 화면에 고정되게 */
  bottom: 0px; /* 화면 중간에 위치 */
  left: 103%; /* 화면 중앙 */
  background-color: #ffffff;
  border: 3px dashed ${({ theme }) => theme.colors.stroke.neutral3};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  z-index: 100; /* 다른 요소 위에 떠 있도록 */
`;

const ClosePopupButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;

const DetailContent = styled.div`
  margin-top: 10px;
`;

const MarkerId = styled.div`
  margin-left: 10px;
  font-size: 32px;
`;
const Name = styled.div`
  margin-left: 40px;
  margin-top: -20px;
  font-size: 24px;
`;
const Address = styled.div`
  margin-left: 40px;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  margin-left: 35px;
  width: 380px;
  height: 375px;
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 91%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: transparent;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 180px;

  /* margin-top: 10px; */
  text-align: center;
`;

const EditButton = styled.button`
  padding: 7px 25.5px;
  color: white;
  background-color: ${({ theme }) => theme.colors.text.title};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
