import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { lightTheme } from "@common/styles/theme";
import { GlobalStyle } from "./GlobalStyle";
import { PropsWithChildren } from "react";

export const CustomThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
