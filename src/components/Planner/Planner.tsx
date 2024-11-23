import { ChangeEvent, FC } from "react";
import styled from "styled-components";

interface PlannerBaseProps {
  label: string;
  fullWidth?: boolean;
  font: Partial<PlannerFont>;
}

type PlannerFont = {
  size: "small" | "medium";
  bold: boolean;
};

interface PlannerInputProps extends PlannerBaseProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

type PlannerComponent = {
  Label: FC<PlannerBaseProps>;
  Input: FC<PlannerInputProps>;
};

const Planner: PlannerComponent = {
  Label: ({ label, font = { size: "medium" }, fullWidth = true }) => {
    return (
      <Base.Container $fullWidth={fullWidth}>
        <Base.Content>
          <Base.Text $font={font}>{label}</Base.Text>
        </Base.Content>
      </Base.Container>
    );
  },
  Input: ({ label, onChange, placeholder, font = { size: "medium" }, fullWidth = true }) => {
    const onChangeHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      return onChange(value);
    };

    return (
      <Base.Container $fullWidth={fullWidth}>
        <Base.Content>
          <Base.Input
            placeholder={placeholder}
            onChange={onChangeHandler}
            value={label}
            $font={font}
          />
        </Base.Content>
      </Base.Container>
    );
  },
};

const Base = {
  Container: styled.div<{ $fullWidth: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: ${(props) => (props.$fullWidth ? "320px" : undefined)};
    max-width: 320px;
    height: 55px;
    padding: 15px;
    border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.large};
    background-color: ${({ theme }) => theme.colors.secondary.subtle};
  `,
  Content: styled.div`
    flex: 1;
    width: 100%;
  `,
  Text: styled.p<{ $font: Partial<PlannerFont> }>`
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${({ theme: { typography }, $font }) =>
      $font.size === "small" ? typography.body.regular.fontSize : typography.heading.h3.fontSize};
    font-weight: ${({ $font }) => ($font.bold ? 600 : 400)};
    color: ${({ theme }) => theme.colors.text.body};
  `,
  Input: styled.input<{ $font: Partial<PlannerFont> }>`
    width: 100%;
    text-align: center;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: ${({ theme: { typography }, $font }) =>
      $font.size === "small" ? typography.body.regular.fontSize : typography.heading.h3.fontSize};
    font-weight: ${({ $font }) => ($font.bold ? 600 : 400)};
    color: ${({ theme }) => theme.colors.text.body};
  `,
};

export default Planner;
export type { PlannerBaseProps, PlannerFont, PlannerInputProps };
