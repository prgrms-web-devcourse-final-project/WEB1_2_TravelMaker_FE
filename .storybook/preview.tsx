import React from "react";
import type { Preview } from "@storybook/react";

import { CustomThemeProvider } from "../src/common/styles/ThemeProvider";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <CustomThemeProvider>
        <Story />
      </CustomThemeProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
