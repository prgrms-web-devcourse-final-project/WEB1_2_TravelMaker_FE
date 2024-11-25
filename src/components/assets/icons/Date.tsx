import type { SVGProps } from "react";

const DateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke={props.stroke ?? "#1B2636"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.333 1.666v3.333M6.667 1.666v3.333M2.5 8.333h15m-13.333-5h11.666c.92 0 1.667.746 1.667 1.666v11.667c0 .92-.746 1.667-1.667 1.667H4.167c-.92 0-1.667-.746-1.667-1.667V4.999c0-.92.746-1.666 1.667-1.666"
    />
  </svg>
);

export default DateIcon;
