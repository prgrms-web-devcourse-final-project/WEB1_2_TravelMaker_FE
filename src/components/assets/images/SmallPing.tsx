import type { SVGProps } from "react";

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <g stroke="#2862E8" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#a)">
      <path d="M15.5 7.556c0 5.055-6.5 9.389-6.5 9.389s-6.5-4.334-6.5-9.39a6.5 6.5 0 0 1 13 0" />
      <path d="M9 9.722A2.167 2.167 0 1 0 9 5.39a2.167 2.167 0 0 0 0 4.333" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.334.333h17.333v17.333H.334z" />
      </clipPath>
    </defs>
  </svg>
);

export default Icon;
