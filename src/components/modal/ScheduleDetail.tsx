import React, { useState } from "react";
import styled from "styled-components";

interface ScheduleItem {
  scheduleItemId: number;
  markerId: number;
  name?: string;
  address: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  itemOrder: number;
}

interface ScheduleDetailProps {
  scheduleItem: ScheduleItem;
}

const ScheduleDetail: React.FC<ScheduleDetailProps> = ({ scheduleItem }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Container>
      <Title>
        <h3>{scheduleItem.name}</h3>
        <Button onClick={toggleDetails}>{showDetails ? "Hide Details" : "Show Details"}</Button>
      </Title>
      {showDetails && (
        <DetailSection>
          <p>
            <strong>Address:</strong> {scheduleItem.address}
          </p>
          <p>
            <strong>Content:</strong> {scheduleItem.content || "No content available."}
          </p>
          <p>
            <strong>Created at:</strong> {scheduleItem.createdAt}
          </p>
        </DetailSection>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const DetailSection = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export default ScheduleDetail;
