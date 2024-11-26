import { ChangeEvent, FC, useRef } from "react";
import styled from "styled-components";

import { calcResponsiveByPercent } from "@common/styles/theme";
import SendIcon from "@components/assets/icons/Send";

interface Props {
  onSubmit: (text: string) => void;
}

const ChatInput: FC<Props> = ({ onSubmit }) => {
  // 비제어 컴포넌트 사용
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onChangeTextAreaHandler = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
  };

  const onSubmitHandler = () => {
    if (textareaRef.current) {
      onSubmit(textareaRef.current.value);
      textareaRef.current.value = "";
    }
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <InputContainer>
          <TextArea
            ref={textareaRef}
            rows={1}
            placeholder="Write your message"
            onChange={onChangeTextAreaHandler}
          />
        </InputContainer>
        <IconContainer onClick={onSubmitHandler}>
          <SendIcon />
        </IconContainer>
      </InnerContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: ${calcResponsiveByPercent(-15, 55)};
  padding: 17.5px 22px;
  border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.extraLarge};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const InnerContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
`;

const IconContainer = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 25px;
  min-height: 25px;
  max-height: 150px;
  line-height: 1.8;
  outline: none;
  border: none;
  resize: none;
  vertical-align: top;
  display: flex;
  font-size: ${({ theme }) => theme.typography.body.bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.bold.fontWeight};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  color: ${({ theme }) => theme.colors.text.caption};
`;

export default ChatInput;
