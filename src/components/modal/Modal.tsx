import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

import { calcResponsiveByPercent } from "@common/styles/theme";
import CloseIcon from "@components/assets/icons/CloseIcon";
import commonCircleStyle from "@common/styles/circleStyle";
import Divider from "@components/divider/Divider";
import Button from "@components/button/Button";

type LabelTypes = "default" | "danger";

interface ModalHeaderProps {
  title: string;
  onClickClose?: () => void;
  showCloseIcon?: boolean;
  center?: boolean;
}

interface ModalMessageProps {
  message: string;
  type: LabelTypes;
}

interface ModalConfirmProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

type ModalComponent = {
  Layout: FC<PropsWithChildren>;
  Header: FC<ModalHeaderProps>;
  Message: FC<ModalMessageProps>;
  Confirm: FC<ModalConfirmProps>;
};

const DEFAULTS = {
  BADGE_SIZE: 25,
  ICON_SIZE: 11,
} as const;

const Modal: ModalComponent = {
  Layout: ({ children }) => <Base.ModalContainer>{children}</Base.ModalContainer>,
  Header: ({ title, onClickClose = () => {}, ...styleProps }) => {
    const { center, showCloseIcon } = styleProps;

    return (
      <>
        <Base.HeaderContainer $center={center}>
          <Base.Label>{title}</Base.Label>
          <Base.CloseContainer
            onClick={onClickClose}
            $size={DEFAULTS.BADGE_SIZE}
            $showIcon={showCloseIcon}>
            <ModalCloseIcon size={DEFAULTS.ICON_SIZE} />
          </Base.CloseContainer>
        </Base.HeaderContainer>
        <Divider />
      </>
    );
  },
  Message: ({ message, type }) => (
    <Modal.Layout>
      <Base.HeaderContainer $center>
        <Base.Label $labelTypes={type}>{message}</Base.Label>
      </Base.HeaderContainer>
    </Modal.Layout>
  ),
  Confirm: (props) => {
    return (
      <Modal.Layout>
        <Modal.Header {...props} showCloseIcon={false} center />
        <Base.ButtonContainer>
          <Button label="아니오" type="small" onClick={() => {}} />
          <Button label="네" type="small" onClick={() => {}} />
        </Base.ButtonContainer>
      </Modal.Layout>
    );
  },
};

const ModalCloseIcon = styled(CloseIcon).attrs(({ theme }) => ({
  color: theme.colors.text.title,
}))``;

const Base = {
  ModalContainer: styled.div`
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
  Label: styled.div.attrs<{ $labelTypes?: LabelTypes }>(({ $labelTypes = "default" }) => ({
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
