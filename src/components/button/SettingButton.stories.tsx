import { Meta, StoryObj } from "@storybook/react";
import SettingButton from "@components/button/SettingButton";

const meta: Meta<typeof SettingButton> = {
  title: "Components/Button/SettingButton",
  component: SettingButton,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SettingButton>;

export const Default: Story = {
  args: {},
};
