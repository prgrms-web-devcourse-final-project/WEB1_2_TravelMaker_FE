import styled from "styled-components";

interface HostIconProps {
  size: number;
}

const HostIcon = styled.svg.attrs<HostIconProps>(({ size }) => ({
  width: size,
  height: size,
  viewBox: "0 0 15 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: (
    <path
      fill="#3360C2"
      d="m2.332 5.665 2.487.43.73-3.525a.5.5 0 0 1 .744-.33l3.099 1.834 1.354-2.13a.5.5 0 0 1 .9.122l2.072 6.72a.5.5 0 0 1-.275.604l-7.418 3.28a.5.5 0 0 1-.633-.203L1.816 6.41a.5.5 0 0 1 .516-.746m6.189 2.62a1 1 0 1 0-.81-1.828 1 1 0 0 0 .81 1.829"
    />
  ),
}))``;

export default HostIcon;
