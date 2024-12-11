import { FC, forwardRef, PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { calcResponsiveByPercent } from "@common/styles/theme";
import CloseIcon from "@components/assets/icons/CloseIcon";
import commonCircleStyle from "@common/styles/circleStyle";
import Divider from "@components/divider/Divider";
import Button from "@components/button/Button";
import FormField from "@components/field/FormField";
import CopyIcon from "@components/assets/icons/Copy";
import DateIcon from "@components/assets/icons/Date";

type LabelTypes = "default" | "danger";
// type InviteEmailHandler = (email: string) => void;
type Schedule = { startDate: Date; endDate: Date };

interface PlannerFormData {
  roomTitle: string;
  schedule: Schedule;
  destination: string;
}

interface ModalHeaderProps {
  title: string;
  onModalClose?: () => void;
  showCloseIcon?: boolean;
  center?: boolean;
}

interface ModalMessageProps {
  message: string;
  type: LabelTypes;
}

interface ModalConfirmProps extends ModalHeaderProps {
  onConfirm: () => void;
  onCancel: () => void;
}

interface ModalShareProps extends ModalHeaderProps {
  url: string;
  roomId: string;
  code: string;
  // email: string;
  // onInviteEmail: InviteEmailHandler;
}

interface ModalEntryProps extends ModalHeaderProps {
  code?: string;
  onEntry: (code: string, messageFn: HandleModalMessage) => Promise<void>;
}

interface ModalConfigProps extends ModalHeaderProps {
  onConfirm: (plannerFormData: PlannerFormData) => void;
  plannerFormData?: PlannerFormData;
  buttonLabel?: string;
}

type ModalComponent = {
  Layout: FC<PropsWithChildren>;
  Header: FC<ModalHeaderProps>;
  Message: FC<ModalMessageProps>;
  Confirm: FC<ModalConfirmProps>;
  Entry: FC<ModalEntryProps>;
  Config: FC<ModalConfigProps>;
  Share: FC<ModalShareProps>;
};

export type HandleModalMessage = (
  type: LabelTypes,
  text: string,
  asyncOperation?: Promise<unknown>
) => Promise<void>;

interface UseModalMessageReturn {
  showMessage: boolean;
  messageType: LabelTypes;
  message: string;
  handleMessage: HandleModalMessage;
}

const MODAL_CONSTANTS = {
  SIZES: {
    BADGE: 25,
    ICON: 11,
  },
} as const;

const Modal: ModalComponent = {
  Layout: ({ children }) => <ModalStyle.ModalContainer>{children}</ModalStyle.ModalContainer>,
  Header: ({ title, onModalClose: onClickClose, ...styleProps }) => {
    const { center, showCloseIcon } = styleProps;

    return (
      <>
        <ModalStyle.HeaderContainer $center={center}>
          <ModalStyle.Label>{title}</ModalStyle.Label>
          <ModalStyle.CloseContainer
            onClick={onClickClose}
            $size={MODAL_CONSTANTS.SIZES.BADGE}
            $showIcon={showCloseIcon}>
            <ModalCloseIcon size={MODAL_CONSTANTS.SIZES.ICON} />
          </ModalStyle.CloseContainer>
        </ModalStyle.HeaderContainer>
        <Divider />
      </>
    );
  },
  // 모달 메시지
  Message: ({ message, type }) => (
    <Modal.Layout>
      <ModalStyle.HeaderContainer $center>
        <ModalStyle.Label $labelTypes={type}>{message}</ModalStyle.Label>
      </ModalStyle.HeaderContainer>
    </Modal.Layout>
  ),
  // 플래너 방나가기, 삭제
  Confirm: ({ onCancel, onConfirm, title }) => {
    return (
      <Modal.Layout>
        <Modal.Header title={title} showCloseIcon={false} center />
        <ModalStyle.ButtonContainer>
          <Button label="아니오" type="small" onClick={onCancel} />
          <Button label="네" type="small" onClick={onConfirm} />
        </ModalStyle.ButtonContainer>
      </Modal.Layout>
    );
  },
  // 플래너 입장하기
  Entry: ({ title, code: initCode, onEntry, onModalClose }) => {
    const [code, setCode] = useState(initCode ?? "");
    const { showMessage, messageType, message, handleMessage } = useModalMessage();

    return (
      <div>
        <Modal.Layout>
          <Modal.Header title={title} showCloseIcon onModalClose={onModalClose} />
          <EmailFieldLayout>
            <FormField.Input
              label={code}
              onChange={setCode}
              placeholder="입장 코드를 입력해 주세요."
              font={{ size: "small" }}
            />
            <Button
              label="참여하기"
              type="small"
              onClick={() => onEntry(code, handleMessage)}
              disabled={code.length <= 0}
            />
          </EmailFieldLayout>
        </Modal.Layout>
        <MessageOverlay $visible={showMessage}>
          <Modal.Message message={message} type={messageType} />
        </MessageOverlay>
      </div>
    );
  },
  // 플래너 생성, 수정
  Config: ({ title, onModalClose, onConfirm, buttonLabel = "확인", plannerFormData }) => {
    const [formData, setFormData] = useState<PlannerFormData>(
      () =>
        plannerFormData ?? {
          roomTitle: "",
          schedule: {
            startDate: new Date(),
            endDate: new Date(),
          },
          destination: "",
        }
    );

    useEffect(() => {
      if (plannerFormData) {
        setFormData(plannerFormData);
      }
    }, [plannerFormData]);

    const DateClickable = forwardRef<HTMLDivElement, { value?: string; onClick?: () => void }>(
      ({ value, onClick }, ref) => (
        <div ref={ref}>
          <FormField.Clickable
            label={value || "날짜 선택"}
            onClick={onClick}
            icon={LeftIcon}
            font={{ size: "small" }}
          />
        </div>
      )
    );

    // 플래너 방제목
    const handleTitleChange = (value: string) => {
      setFormData((prev) => ({
        ...prev,
        roomTitle: value,
      }));
    };

    // 플래너 일정
    const handleDateChange = (type: keyof Schedule) => (date: Date | null) => {
      setFormData((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [type]: date,
        },
      }));
    };

    // 플래너 여행지
    const handleDestinationChange = (value: string) => {
      setFormData((prev) => ({
        ...prev,
        destination: value,
      }));
    };

    // 플래너 확인 버튼 핸들러
    const handleSubmit = () => {
      onConfirm(formData);
    };

    const LeftIcon = { left: <DateIcon /> };
    const commonDatePickerProps = {
      calendarContainer: CalendarContainer,
      showPopperArrow: false,
      customInput: <DateClickable />,
      dateFormat: "yy.MM.dd",
      portalId: "root",
      popperClassName: "calendar-popper",
    };

    return (
      <Modal.Layout>
        <Modal.Header title={title} showCloseIcon onModalClose={onModalClose} />
        <FormContainer>
          <FieldLayout>
            <LabelContainer>
              <FieldLabel>방제목</FieldLabel>
            </LabelContainer>
            <FormField.Input
              label={formData.roomTitle}
              placeholder="제목을 입력해 주세요."
              onChange={handleTitleChange}
            />
          </FieldLayout>
          <FieldLayout>
            <LabelContainer>
              <FieldLabel>일정</FieldLabel>
            </LabelContainer>
            <ScheduleFieldLayout>
              <DatePicker
                {...commonDatePickerProps}
                selected={formData.schedule.startDate}
                onChange={handleDateChange("startDate")}
              />
              <DatePicker
                {...commonDatePickerProps}
                selected={formData.schedule.endDate}
                onChange={handleDateChange("endDate")}
                minDate={formData.schedule.startDate}
              />
            </ScheduleFieldLayout>
          </FieldLayout>
          <FieldLayout>
            <LabelContainer>
              <FieldLabel>여행지</FieldLabel>
            </LabelContainer>
            <FormField.Input
              label={formData.destination}
              placeholder="여행지를 입력해 주세요."
              onChange={handleDestinationChange}
            />
          </FieldLayout>
          <ModalStyle.ButtonContainer>
            <Button label={buttonLabel} type="small" onClick={handleSubmit} />
          </ModalStyle.ButtonContainer>
        </FormContainer>
      </Modal.Layout>
    );
  },
  // 플래너 공유
  Share: ({ title, onModalClose, ...data }) => {
    const { url, roomId, code } = data;
    const { showMessage, messageType, message } = useModalMessage();

    // 다음 버전에서 사용예정
    // const handleInvite = () => {
    //   try {
    //     onInviteEmail(code);
    //     handleMessage("default", "초대 메일이 발송되었습니다.");
    //   } catch {
    //     handleMessage("danger", "잘못된 참여코드 입니다.");
    //   }
    // };

    return (
      <>
        <Modal.Layout>
          <Modal.Header title={title} showCloseIcon onModalClose={onModalClose} />
          <FormContainer>
            <CopyableField label="URL" value={url} />
            <CopyableField label="ROOM ID" value={roomId} />
            <CopyableField label="CODE" value={code} />
            {/* <InvitationField value={email} onInviteEmail={handleInvite} /> */}
          </FormContainer>
        </Modal.Layout>
        <MessageOverlay $visible={showMessage}>
          <Modal.Message message={message} type={messageType} />
        </MessageOverlay>
      </>
    );
  },
};

const useModalMessage = (): UseModalMessageReturn => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState<LabelTypes>("default");
  const [message, setMessage] = useState("");

  const handleMessage: HandleModalMessage = async (type, text, asyncOperation) => {
    setMessageType(type);
    setMessage(text);
    setShowMessage(true);

    if (asyncOperation) {
      await asyncOperation;
      setShowMessage(false);
    }
  };

  return {
    showMessage,
    messageType,
    message,
    handleMessage,
  };
};

// 캘린더 스타일링 컴포넌트
const CalendarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["showTime"].includes(prop),
})`
  // 화살표
  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme: { colors } }) => colors.stroke.neutral3};
  }

  // 컨테이너
  &.react-datepicker {
    border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.large};
    border: ${({ theme: { strokeWidth, colors } }) =>
      `${strokeWidth.thick} solid ${colors.primary.subtle}`};
    box-shadow: ${({ theme }) => theme.shadows.small};
  }

  // 선택한 날짜
  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.primary.active};
  }
`;

const MessageOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  transform: translateY(20px);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

const CopyableField: FC<{ label: string; value: string }> = ({ label, value }) => {
  const handleContentCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("클립보드 복사 실패:", error);
    }
  };
  const RightIcon = {
    right: {
      Item: <CopyIcon />,
      onClick: handleContentCopy,
    },
  };

  return (
    <FieldLayout>
      <LabelContainer>
        <FieldLabel>{label}</FieldLabel>
      </LabelContainer>
      <FormField.ActionLabel icon={RightIcon} label={value} />
    </FieldLayout>
  );
};

// const InvitationField: FC<{ value: string; onInviteEmail: InviteEmailHandler }> = ({
//   value,
//   onInviteEmail,
// }) => {
//   return (
//     <FieldLayout>
//       <LabelContainer>
//         <FieldLabel>Email</FieldLabel>
//       </LabelContainer>
//       <EmailFieldLayout>
//         <FormField.Label label={value} font={{ bold: true, size: "small" }} />
//         <Button label="초대" type="small" onClick={() => onInviteEmail(value)} />
//       </EmailFieldLayout>
//     </FieldLayout>
//   );
// };

const FormContainer = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
  width: 100%;
`;

const FieldLayout = styled.div`
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  width: 100%;
  gap: 25px;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EmailFieldLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
`;

const ScheduleFieldLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;
`;

const FieldLabel = styled.h3`
  color: ${({ theme }) => theme.colors.secondary.normal};
  font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
`;

const ModalCloseIcon = styled(CloseIcon).attrs(({ theme }) => ({
  color: theme.colors.text.title,
}))``;

const ModalStyle = {
  ModalContainer: styled.div`
    position: relative; // 추가
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    width: ${calcResponsiveByPercent(-15, 560)};
    background-color: ${({ theme }) => theme.colors.primary.subtle};
    border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.large};
    border: ${({ theme: { strokeWidth, colors } }) =>
      `${strokeWidth.thick} solid ${colors.stroke.neutral3}`};
  `,
  HeaderContainer: styled.div<{ $center?: boolean }>`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: ${({ $center = false }) => ($center ? "center" : "space-between")};
  `,
  CloseContainer: styled.div.attrs<{ $size: number; $color?: string; $showIcon?: boolean }>(
    ({ $size, $showIcon = true }) => ({
      $size,
      $showIcon,
    })
  )`
    ${commonCircleStyle}
    cursor: pointer;
    background-color: transparent;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.3);
    }
    border: ${({ theme }) => `${theme.strokeWidth.thick} solid ${theme.colors.text.title}`};
    display: ${({ $showIcon }) => ($showIcon ? "flex" : "none")};
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  `,
  Label: styled.h3.attrs<{ $labelTypes?: LabelTypes }>(({ $labelTypes = "default" }) => ({
    $labelTypes,
  }))`
    text-align: center;
    font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme: { colors }, $labelTypes }) =>
      $labelTypes === "danger" ? colors.danger.normal : colors.text.title};
  `,
};

export default Modal;
