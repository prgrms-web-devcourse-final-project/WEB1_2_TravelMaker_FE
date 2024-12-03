import type { SVGProps } from "react";

const PlaneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 22" fill="none" {...props}>
    <path
      fill="#F4F7FB"
      d="M11.265 9.487 5.627.647 8.041 0l8.689 8.025 6.578-1.762a1.875 1.875 0 1 1 .97 3.622L5.562 14.898l-.97-3.623.3-.081 3.085 3.056-3.283.88a1.25 1.25 0 0 1-1.416-.6L0 8.623l1.811-.485 3.083 3.056zm-8.098 9.21h20v2.5h-20z"
    />
  </svg>
);

const PlaneIcon2 = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70 49"
    preserveAspectRatio="none"
    fill="none"
    {...props}>
    <path
      fill="#1B2636"
      d="M45.514 28.29 28.189 48.5h-6.857l8.66-20.21H11.616l-5.712 7.578H.761L4.189 24.5.761 13.132h5.142l5.716 7.578h18.377L21.332.5h6.857l17.325 20.21h18.675c2.84 0 5.143 1.697 5.143 3.79s-2.303 3.79-5.143 3.79z"
    />
  </svg>
);

export default PlaneIcon;
export { PlaneIcon2 };
