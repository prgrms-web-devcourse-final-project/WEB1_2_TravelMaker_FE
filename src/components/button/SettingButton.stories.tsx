import { Meta, StoryObj } from "@storybook/react";
import SettingButton from "@components/button/SettingButton";

const meta: Meta<typeof SettingButton> = {
  title: "Components/Button/SettingButton",
  component: SettingButton,
  decorators: [
    (Story) => (
      <div style={{ minWidth: 300, minHeight: 100 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isHost: true,
  },
};

export default meta;

type Story = StoryObj<typeof SettingButton>;

export const Default: Story = {
  args: {},
};
