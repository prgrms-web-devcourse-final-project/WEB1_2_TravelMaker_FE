import type { Meta, StoryObj } from "@storybook/react";

import LoginButton from "../button/Button"; // 수정된 Button 컴포넌트
import Icon from "../assets/icons/GoogleIcon";
import Icon1 from "../assets/icons/KakaoIcon";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Button/LargeButton",
  component: LoginButton,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", backgroundColor: "#f4f7fb" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    type: "medium",
  },
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof LoginButton>;

// 커스텀 버튼
export const CustomButton: Story = {
  args: {
    label: "커스텀 크기 버튼",
    onClick: () => alert("커스텀 버튼 클릭!"),
  },
};

export const WithIcon: Story = {
  args: {
    label: "구글로 로그인",
    icon: Icon, // 첫 번째 아이콘 사용
    onClick: () => alert("아이콘 버튼 클릭!"),
  },
};

export const WithIcon2: Story = {
  args: {
    label: "계정으로 로그인",
    icon: Icon1, // 두 번째 아이콘 사용
    onClick: () => alert("다른 아이콘 버튼 클릭!"),
  },
};

export const SmallButton: Story = {
  args: {
    label: "참여하기",
    onClick: fn(),
    type: "small",
  },
};
