import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends CustomTheme {}
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CustomTheme {}

export const lightTheme: DefaultTheme = {};

export const darkTheme: DefaultTheme = {};
