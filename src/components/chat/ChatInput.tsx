import { ChangeEvent, FC, useRef } from "react";
import styled from "styled-components";

import { calcResponsive } from "@common/styles/theme";
import SendIcon from "@components/assets/icons/Send";
import { hideScrollbar } from "@common/styles/hideScrollbar";

interface Props {
  onSubmit: (text: string) => void;
}

const ChatInput: FC<Props> = ({ onSubmit }) => {
  // 비제어 컴포넌트 사용
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isComposing = useRef<boolean>(false);

  const onCompositionStart = () => {
    isComposing.current = true;
  };

  const onCompositionEnd = () => {
    isComposing.current = false;
  };

  const onChangeTextAreaHandler = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || isComposing.current) return;
    if (e.shiftKey) return;

    e.preventDefault();
    e.stopPropagation();

    if (!textareaRef.current?.value.trim()) return;

    const value = textareaRef.current.value.trim();

    textareaRef.current.value = "";
    textareaRef.current.style.height = "auto";
    onSubmit(value);
  };

  const onSubmitHandler = () => {
    if (textareaRef.current && textareaRef.current.value.trim()) {
      onSubmit(textareaRef.current.value);
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
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
            onKeyDown={onKeyDownHandler}
            onCompositionStart={onCompositionStart}
            onCompositionEnd={onCompositionEnd}
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
  ${hideScrollbar}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: ${calcResponsive({ value: 55, dimension: "height" })};
  padding: ${calcResponsive({ value: 17.5, dimension: "height" })}${calcResponsive({
      value: 22,
      dimension: "height",
    })};
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
  ${hideScrollbar}
  width: 100%;
  height: 25px;
  min-height: 25px;
  max-height: ${calcResponsive({ value: 150, dimension: "width" })};
  line-height: 1.8;
  outline: none;
  border: none;
  resize: none;
  vertical-align: top;
  display: flex;
  font-size: ${({ theme }) =>
    calcResponsive({
      value: theme.typography.body.bold.fontSize,
      dimension: "height",
      minValue: 13,
    })};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  color: ${({ theme }) => theme.colors.text.caption};
`;

export default ChatInput;
