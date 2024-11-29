import type { SVGProps } from "react";

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={44} height={60} fill="none" {...props}>
    <g filter="url(#a)">
      <path
        fill="#fff"
        d="M40 17.73C40 27.524 22 50 22 50S4 27.878 4 18.085 12.059 0 22 0s18 7.938 18 17.73"
      />
      <path
        stroke="#1B2636"
        strokeWidth={1.5}
        d="m22.181 48.555-.186.239-.18-.228c-.49-.62-1.19-1.52-2.03-2.629a178 178 0 0 1-6.16-8.638c-2.242-3.364-4.472-7.016-6.139-10.425-1.68-3.437-2.736-6.524-2.736-8.789C4.75 8.698 12.481.75 22 .75c9.538 0 17.25 7.613 17.25 16.98 0 2.267-1.056 5.376-2.737 8.847-1.668 3.443-3.898 7.14-6.14 10.548a183 183 0 0 1-6.161 8.761c-.841 1.126-1.541 2.039-2.03 2.669Z"
      />
    </g>
    <g filter="url(#b)" opacity={0.2}>
      <ellipse cx={22} cy={50} fill="#1B2636" rx={5} ry={2} />
    </g>
    <defs>
      <filter
        id="a"
        width={44}
        height={58}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_903_3919" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_903_3919" result="shape" />
      </filter>
      <filter
        id="b"
        width={18}
        height={12}
        x={13}
        y={48}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_903_3919" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_903_3919" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default Icon;
