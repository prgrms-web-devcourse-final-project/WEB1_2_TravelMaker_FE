import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../common/styles/theme"; // 테마 파일 경로에 맞게 수정
import LoginButton from "../button/Button"; // 수정된 Button 컴포넌트
import Icon from "../assets/icons/GoogleIcon";
import Icon1 from "../assets/icons/KakaoIcon";

const meta = {
  title: "Components/Button/LargeButton",
  component: LoginButton,
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <div style={{ padding: "20px", backgroundColor: "#f4f7fb" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
