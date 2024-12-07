import styled from "styled-components";
import { FC, useState } from "react";
import CloseIcon from "@components/assets/icons/CloseIcon";

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
// 모달 Props 타입 정의
interface EditModalProps {
  name: string;
  content: string;
  onClose: () => void;
  onSave: (updatedName: string, updatedContent: string) => void;
}
// 수정 모달 컴포넌트
const EditModal: FC<EditModalProps> = ({ name, content, onClose, onSave }) => {
  const [editedName, setEditedName] = useState(name);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(editedName, editedContent); // 부모로 변경된 값 전달
    onClose(); // 모달 닫기
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>수정하기</h3>
        <InputField
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        <TextArea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          placeholder="내용을 입력하세요"
        />
        <ButtonContainer>
          <SaveButton onClick={handleSave}>저장</SaveButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const RouteCard: FC<RouteCardProps> = ({ markerId, name = "제목 없음", address, content = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [currentContent, setCurrentContent] = useState(content);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (updatedName: string, updatedContent: string) => {
    setCurrentName(updatedName); // 변경된 이름 업데이트
    setCurrentContent(updatedContent); // 변경된 내용 업데이트
  };

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
        <DetailButton onClick={openModal}>상세보기</DetailButton>
      </BottomContainer>
      {/* 수정 모달 */}
      {isModalOpen && (
        <EditModal
          name={currentName}
          content={currentContent}
          onClose={closeModal}
          onSave={handleSave}
        />
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  background: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;
