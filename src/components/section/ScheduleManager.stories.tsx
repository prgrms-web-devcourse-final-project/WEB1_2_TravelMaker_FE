import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ScheduleManager from "./ScheduleManager";

const meta: Meta<typeof ScheduleManager> = {
  title: "Components/Section/ScheduleManager",
  component: ScheduleManager,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // 전체 화면에 표시되도록 설정
  },
};

export default meta;

type Story = StoryObj<typeof ScheduleManager>;

export const Default: Story = {
  args: {},
};