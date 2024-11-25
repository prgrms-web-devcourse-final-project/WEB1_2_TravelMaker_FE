import type { SVGProps } from "react";

const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" {...props}>
    <mask
      id="a"
      width={30}
      height={30}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}>
      <path fill="#2B4461" d="M30 0H0v30h30z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#2B4461"
        fillRule="evenodd"
        d="m19.783 2.339-16.8 16.87a2 2 0 0 0-.51.879l-1.9 6.88a2 2 0 0 0 .137 1.424 2 2 0 0 0 2.315 1.038l6.9-1.88a2 2 0 0 0 .892-.519l16.746-16.815q.721-.636 1.25-1.772A5.1 5.1 0 0 0 29.3 6.25q0-1.149-.486-2.194-.52-1.116-1.225-1.749-.681-.707-1.706-1.167A5.3 5.3 0 0 0 23.8.71q-1.172 0-2.219.446-.835.374-1.655 1.052-.075.062-.143.13M6.188 21.659l-.825 2.988 2.996-.816L24.783 7.339q.069-.07.143-.13.081-.068.26-.453a1.19 1.19 0 0 0 0-1.012q-.179-.385-.26-.452a2 2 0 0 1-.206-.197 1.2 1.2 0 0 0-.404-.275 1.3 1.3 0 0 0-.516-.11q-.358 0-.58.094a3.2 3.2 0 0 0-.676.431z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

export default Icon;
