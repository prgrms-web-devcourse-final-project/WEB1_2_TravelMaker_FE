import * as React from "react";
import type { SVGProps } from "react";
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" {...props}>
    <path
      stroke="#1B2636"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19 11-8 8m0-8 8 8m9.333-4c0 7.364-5.97 13.334-13.334 13.334S1.666 22.364 1.666 15 7.636 1.667 14.999 1.667 28.333 7.637 28.333 15"
    />
  </svg>
);

export default CloseIcon;
