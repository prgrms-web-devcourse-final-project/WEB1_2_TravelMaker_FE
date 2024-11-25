import { calcResponsiveByPercent } from "@common/styles/theme";
import { ChangeEvent, FC } from "react";
import styled from "styled-components";

interface FormFieldBaseProps {
  label: string;
  fullWidth?: boolean;
  font?: FormFieldFont;
}

type FormFieldFont = {
  size: "small" | "medium";
  bold: boolean;
};

interface FormFieldInputProps extends FormFieldBaseProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

interface FormFieldClickableProps extends FormFieldBaseProps {
  onClick: () => void;
  icon?: {
    left: JSX.Element;
  };
}

interface FormFieldActionLabelProps extends FormFieldBaseProps {
  icon: {
    right: {
      Item: JSX.Element;
      onClick: (label: string) => void;
    };
  };
}

type FormFieldComponent = {
  Label: FC<FormFieldBaseProps>;
  Input: FC<FormFieldInputProps>;
  Clickable: FC<FormFieldClickableProps>;
  ActionLabel: FC<FormFieldActionLabelProps>;
};

const FormField: FormFieldComponent = {
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
  Clickable: ({ label, onClick, icon, font = { size: "medium" }, fullWidth = false }) => {
    return (
      <Base.Container $fullWidth={fullWidth} as="button" onClick={onClick}>
        <Base.Content>
          {icon?.left ? <IconContainer>{icon.left}</IconContainer> : null}
          <Base.Text $font={font}>{label}</Base.Text>
        </Base.Content>
      </Base.Container>
    );
  },
  ActionLabel: ({ label, icon, font = { size: "small" }, fullWidth = true }) => {
    const onClickHandler = () => {
      icon.right.onClick(label);
    };

    return (
      <Base.Container $fullWidth={fullWidth}>
        <Base.Content>
          <ButtonContainer $hidden></ButtonContainer>
          <FullContainer>
            <Base.Text $font={font}>{label}</Base.Text>
          </FullContainer>
          <ButtonContainer $hidden={false} onClick={onClickHandler}>
            {icon.right.Item}
          </ButtonContainer>
        </Base.Content>
      </Base.Container>
    );
  },
};

const FullContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const ButtonContainer = styled.button<{ $hidden: boolean }>`
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
  width: 32px;
  aspect-ratio: 1;
  border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.small};
`;

const Base = {
  Container: styled.div<{ $fullWidth: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: ${(props) => (props.$fullWidth ? "320px" : undefined)};
    max-width: ${calcResponsiveByPercent(-25, 320)};
    height: ${calcResponsiveByPercent(-15, 55)};
    padding: 20px;
    border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.large};
    background-color: ${({ theme }) => theme.colors.secondary.subtle};
  `,
  Content: styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
  `,
  Text: styled.p<{ $font: Partial<FormFieldFont> }>`
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${({ theme: { typography }, $font }) =>
      $font.size === "small" ? typography.heading.h4.fontSize : typography.heading.h3.fontSize};
    font-weight: ${({ $font }) => ($font.bold ? 600 : 400)};
    color: ${({ theme }) => theme.colors.text.body};
  `,
  Input: styled.input<{ $font: Partial<FormFieldFont> }>`
    width: 100%;
    text-align: center;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: ${({ theme: { typography }, $font }) =>
      $font.size === "small" ? typography.heading.h4.fontSize : typography.heading.h3.fontSize};
    font-weight: ${({ $font }) => ($font.bold ? 600 : 400)};
    color: ${({ theme }) => theme.colors.text.body};
  `,
};

const IconContainer = styled.div`
  padding-bottom: 3px;
`;

export default FormField;
export type {
  FormFieldBaseProps,
  FormFieldFont,
  FormFieldInputProps,
  FormFieldClickableProps,
  FormFieldActionLabelProps,
};
