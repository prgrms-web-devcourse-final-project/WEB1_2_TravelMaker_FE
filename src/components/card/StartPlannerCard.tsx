import styled from "styled-components";

import { calcResponsiveByPercent } from "@common/styles/theme";
import Button from "@components/button/Button";
import Divider from "@components/divider/Divider";
import FormField from "@components/field/FormField";
import { FC, useState } from "react";

interface Props {
  onClickPlanner: () => void;
  onSubmit: (code: string) => void;
}

const StartPlannerCard: FC<Props> = ({ onClickPlanner, onSubmit }) => {
  const [code, setCode] = useState("");

  const onSubmitHandler = () => {
    return onSubmit(code);
  };

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
        <FormField.Input label={code} onChange={setCode} />
        <Button label="참여하기" type="small" onClick={onSubmitHandler} />
      </SubmitContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calcResponsiveByPercent(-10, 50)};
`;

const SubmitContainer = styled.div`
  display: flex;
  gap: ${calcResponsiveByPercent(-10, 30)};
`;

const LogoLabel = styled.h1`
  font-weight: 700;
  font-size: 64px;
  color: ${({ theme }) => theme.colors.text.body};
`;

const DescriptionLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
`;

export default StartPlannerCard;
