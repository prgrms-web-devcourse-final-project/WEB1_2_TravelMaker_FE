import type { SVGProps } from "react";

const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <path
      stroke={props.stroke ?? "#1B2636"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M6.666 20H5.333a2.667 2.667 0 0 1-2.667-2.667v-12a2.667 2.667 0 0 1 2.667-2.667h12a2.667 2.667 0 0 1 2.666 2.667v1.333m-5.333 5.333h12a2.667 2.667 0 0 1 2.667 2.667v12a2.667 2.667 0 0 1-2.667 2.667h-12a2.667 2.667 0 0 1-2.667-2.667v-12a2.667 2.667 0 0 1 2.667-2.667"
    />
  </svg>
);

export default CopyIcon;
