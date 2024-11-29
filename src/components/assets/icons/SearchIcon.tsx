import type { SVGProps } from "react";

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <path
      stroke="#6F99C1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m28 28-5.8-5.8m3.133-7.533c0 5.89-4.775 10.666-10.666 10.666S4 20.558 4 14.667 8.776 4 14.667 4c5.89 0 10.666 4.776 10.666 10.667"
    />
  </svg>
);

export default Icon;
