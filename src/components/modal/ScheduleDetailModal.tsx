// ScheduleDetailModal.tsx
import React, { useState } from "react";
import styled from "styled-components";

interface ScheduleDetailModalProps {
  scheduleItem: {
    scheduleItemId: number;
    markerId: number;
    name?: string;
    address: string;
    content?: string;
    createdAt: string;
    updatedAt: string;
    itemOrder: number;
  };

  onClose: () => void;
  onSave: (updatedContent: string, updatedName: string) => void;
}

const ScheduleDetailModal: React.FC<ScheduleDetailModalProps> = ({
  scheduleItem,
  onClose,
  onSave,
}) => {
  const [content, setContent] = useState(scheduleItem.content);
  const [name, setName] = useState(scheduleItem.name);

  const handleSave = () => {
    onSave(content || "", name || ""); //
    onClose(); // 모달 닫기
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{scheduleItem.name}</h2>
        <p>{scheduleItem.address}</p>
        <div>
          <label htmlFor="content">Content:</label>
          <TextArea onChange={(e) => setName(e.target.value)} />
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)} // content 수정
          />
        </div>
        <p>{`Created at: ${scheduleItem.createdAt}`}</p>
        <ButtonContainer>
          <SaveButton onClick={handleSave}>Save</SaveButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #999;
  }
`;

export default ScheduleDetailModal;
