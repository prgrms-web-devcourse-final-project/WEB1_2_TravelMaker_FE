import type { SVGProps } from "react";

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={280} height={280} fill="none" {...props}>
    <path
      fill="#D9D9D9"
      stroke="#4C7AA7"
      strokeWidth={2.5}
      d="M278.75 140c0 76.63-62.12 138.75-138.75 138.75S1.25 216.63 1.25 140 63.37 1.25 140 1.25 278.75 63.37 278.75 140Z"
    />
  </svg>
);

export default Icon;
