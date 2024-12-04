import { FC, useState } from "react";
import styled from "styled-components";

import { calcResponsive } from "@common/styles/theme";
import Button from "@components/button/Button";
import Divider from "@components/divider/Divider";
import FormField from "@components/field/FormField";

interface Props {
  onClickPlanner: () => void;
  onSubmit: (code: string) => void;
  placeholder?: string;
}

const StartPlannerCard: FC<Props> = ({ onClickPlanner, onSubmit, placeholder }) => {
  const [code, setCode] = useState("");

  return (
    <Container>
      <LogoLabel>WAYFARER</LogoLabel>
      <div>
        <DescriptionLabel>채팅과 실시간 스케줄링 기능을 통해</DescriptionLabel>
        <DescriptionLabel>실시간으로 친구와 여행을 계획해보세요.</DescriptionLabel>
      </div>
      <Button label="플래너 시작하기" fullWidth onClick={onClickPlanner} />
      <Divider />
      <SubmitContainer>
        <FormField.Input label={code} onChange={setCode} placeholder={placeholder} />
        <Button
          label="참여하기"
          type="small"
          onClick={() => onSubmit(code)}
          disabled={code.length <= 0}
        />
      </SubmitContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calcResponsive({ value: 50, dimension: "width" })};
`;

const SubmitContainer = styled.div`
  display: flex;
  gap: ${calcResponsive({ value: 30 })};
`;

const LogoLabel = styled.h1`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${calcResponsive({ value: 64, dimension: "height" })};
  color: ${({ theme }) => theme.colors.text.body};
`;

const DescriptionLabel = styled.p`
  font-size: ${({ theme }) =>
    calcResponsive({ value: theme.typography.heading.h3.fontSize, dimension: "height" })};
  color: ${({ theme }) => theme.colors.text.body};
`;

export default StartPlannerCard;
