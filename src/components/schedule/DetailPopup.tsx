import styled from "styled-components";
import closebutton from "../assets/icons/closebutton.svg";
import { FC } from "react";

interface DetailPopupProps {
  markerId: number;
  name?: string;
  address: string;
  content: string;
  isEditing: boolean;
  editableName: string;
  editableContent: string;
  onToggleDetails: () => void;
  onToggleEdit: () => void;
  onNameChange: (value: string) => void;
  onContentChange: (value: string) => void;
}
const DetailPopup: FC<DetailPopupProps> = ({
  markerId,
  // name,
  address,
  // content,
  isEditing,
  editableName,
  editableContent,
  onToggleDetails,
  onToggleEdit,
  onNameChange,
  onContentChange,
}) => (
  <PopupContainer>
    <ClosePopupButton onClick={onToggleDetails}>
      <img src={closebutton} alt="닫기" />
    </ClosePopupButton>

    <DetailContent>
      <MarkerId>{markerId}</MarkerId>
      <Name>
        {isEditing ? (
          <Input value={editableName} onChange={(e) => onNameChange(e.target.value)} />
        ) : (
          editableName
        )}
      </Name>
      <Address>{address}</Address>
      <Content>
        {isEditing ? (
          <TextArea value={editableContent} onChange={(e) => onContentChange(e.target.value)} />
        ) : (
          editableContent || "내용 없음"
        )}
      </Content>
    </DetailContent>

    <ButtonContainer>
      <EditButton onClick={onToggleEdit}>{isEditing ? "저장" : "수정"}</EditButton>
    </ButtonContainer>
  </PopupContainer>
);

export default DetailPopup;

// 스타일 정의
const PopupContainer = styled.div`
  width: 460px;
  height: 575px;
  position: fixed;
  bottom: 0px;
  left: 103%;
  background-color: #ffffff;
  border: 3px dashed ${({ theme }) => theme.colors.stroke.neutral3};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
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
`;

const EditButton = styled.button`
  padding: 7px 25.5px;
  color: white;
  background-color: ${({ theme }) => theme.colors.text.title};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
