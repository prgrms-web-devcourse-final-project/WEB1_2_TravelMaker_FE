import type { SVGProps } from "react";

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" {...props}>
    <path
      stroke="#1B2636"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M6.25 15h17.5"
    />
  </svg>
);

export default Icon;
