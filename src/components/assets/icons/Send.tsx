import type { SVGProps } from "react";

const SendIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
    <path
      fill="#3360C2"
      d="M18.822 8.865 9.905 4.406c-5.99-3-8.447-.541-5.447 5.448l.906 1.813c.26.531.26 1.146 0 1.677l-.906 1.802c-3 5.99-.553 8.448 5.447 5.448l8.917-4.459c4-2 4-5.27 0-7.27m-3.364 4.416H9.833a.787.787 0 0 1-.782-.78c0-.428.354-.782.782-.782h5.624c.428 0 .782.354.782.781a.787.787 0 0 1-.782.781"
    />
  </svg>
);

export default SendIcon;
