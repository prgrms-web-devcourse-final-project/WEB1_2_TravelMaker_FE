import styled from "styled-components";
import { FC } from "react";

interface InfoCardProps {
  children: React.ReactNode; // 텍스트 문구를 children으로 받습니다.
}

const InfoCard: FC<InfoCardProps> = ({ children }) => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Text>{children}</Text>
      </InnerContainer>
    </OuterContainer>
  );
};

export default InfoCard;

// 공통 스타일 정의
const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const OuterContainer = styled.div`
  ${FlexBox};
  flex-direction: column;
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

const InnerContainer = styled(FlexBox)`
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 왼쪽 정렬 */
`;

const Text = styled.div`
  margin-top: 20px;
  width: 350px;
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-weight: 500;
  text-align: center;

  @media (max-width: 1024px) {
    width: 300px;
  }
`;
