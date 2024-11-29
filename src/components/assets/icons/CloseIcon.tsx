interface CloseIconProps {
  size?: number;
  color?: string;
}

const CloseIcon = ({ size = 10, color = "#1B2636" }: CloseIconProps) => (
  <svg width={size} height={size} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L7 7M7 1L1 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default CloseIcon;
