import styled from "styled-components";
import { FC, useState, useMemo } from "react";
import CloseIcon from "@components/assets/icons/CloseIcon";
import DetailPopup from "./DetailPopup";
import { ScheduleItem } from "@components/schedule/RouteCardList";
import { useCallback } from "react";

// API 응답에 맞춘 RouteCardProps 타입 정의
interface RouteCardProps {
  item: ScheduleItem;
  onSave: (scheduleItemId: number, name: string, content: string) => void;
  deleteScheduleItem: (scheduleItemId: number) => void; // 삭제 함수 추가
}

const RouteCard: FC<RouteCardProps> = ({ item, onSave, deleteScheduleItem }) => {
  const [showDetails, setShowDetails] = useState(false); // 상세보기 상태 관리
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 관리
  const [editableName, setEditableName] = useState(item.name); // 수정 가능한 이름 상태
  const [editableContent, setEditableContent] = useState(item.content); // 수정 가능한 내용 상태

  const toggleDetails = useCallback(() => {
    if (showDetails && isEditing) {
      // 닫힐 때 수정 취소
      setEditableName(item.name); // 초기 이름으로 복원
      setEditableContent(item.content); // 초기 내용으로 복원
      setIsEditing(false); // 수정 모드 해제
    }
    setShowDetails(!showDetails);
  }, [showDetails, isEditing, item.name, item.content]); // 의존성 배열 추가

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []); // 의존성 배열이 비어 있어도 괜찮음 (상태를 토글하기만 함)

  const handleSave = useCallback(() => {
    onSave(item.scheduleItemId, editableName || "", editableContent || ""); // 기본값 제공
    setIsEditing(false); // 저장 후 수정 모드 해제
  }, [item.scheduleItemId, editableName, editableContent, onSave]); // 의존성 배열 추가

  // CloseButton 클릭 시 아이템 삭제
  const handleDelete = () => {
    deleteScheduleItem(item.scheduleItemId); // 삭제 함수 호출
  };

  // DetailPopup props 최적화
  const detailPopupProps = useMemo(
    () => ({
      scheduleItemId: item.scheduleItemId,
      markerId: item.markerId,
      address: item.address,
      itemOrder: item.itemOrder,
      isEditing,
      editableName: editableName || "", // 기본값 제공
      editableContent: editableContent || "", // 기본값 제공
      onToggleDetails: toggleDetails,
      onToggleEdit: toggleEdit,
      onNameChange: setEditableName,
      onContentChange: setEditableContent,
      onSave: handleSave,
    }),
    [item, editableName, editableContent, isEditing, handleSave, toggleDetails, toggleEdit] // 의존성 추가
  );

  return (
    <OuterContainer>
      <TopContainer>
        <Index>{item.itemOrder}</Index>
        <CloseButton onClick={handleDelete}>
          <CloseIcon />
        </CloseButton>
      </TopContainer>

      <InnerContainer>
        <TitleSection>{editableName || "제목 없음"}</TitleSection>
        <LocationSection>{item.address}</LocationSection>
      </InnerContainer>

      <BottomContainer>
        <DetailButton onClick={toggleDetails}>상세보기</DetailButton>
      </BottomContainer>

      {showDetails && <DetailPopup {...detailPopupProps} />}
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
