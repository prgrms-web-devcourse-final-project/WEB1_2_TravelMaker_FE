import { ComponentProps } from "react";
import type { ArgTypes, Meta, StoryObj } from "@storybook/react";

import Profile from "./ChatProfile";
import { fn } from "@storybook/test";

type ProfileImageProps = ComponentProps<typeof Profile.Image>;
type ProfileLabelProps = ComponentProps<typeof Profile.Label>;
type ProfileClickableImageProps = ComponentProps<typeof Profile.ClickableImage>;
type ProfileClickableLabelProps = ComponentProps<typeof Profile.ClickableLabel>;
type ProfileProps =
  | ProfileImageProps
  | ProfileLabelProps
  | ProfileClickableImageProps
  | ProfileClickableLabelProps;

type Base = {
  argTypes: Partial<ArgTypes<ProfileProps>>;
  args: Partial<ProfileProps>;
};

const base: Base = {
  argTypes: {
    size: {
      description: "프로필 사이즈를 정의합니다.",
      control: {
        type: "range",
        min: 30,
        max: 200,
        step: 10,
      },
      type: {
        name: "number",
        required: true,
      },
    },
    shadow: {
      control: "radio",
      description: "그림자 스타일을 정의합니다.",
      options: ["small", "medium", "large", "none"],
      table: {
        type: { summary: '"small" | "medium" | "large" | "none"' },
        defaultValue: { summary: "none" },
      },
    },
    stroke: {
      control: "boolean",
      description: "테두리 표시 여부를 정의합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showBadge: {
      control: "boolean",
      description: "뱃지 표시 여부를 정의합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    Icon: {
      description: "뱃지 컴포넌트를 정의합니다.",
      table: {
        type: { summary: "Component" },
        defaultValue: { summary: "<CloseIcon />" },
      },
    },
    isHost: {
      control: "boolean",
      description: "호스트 표시 여부를 정의합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    url: {
      control: "text",
      description: "프로필 이미지 URL",
      type: {
        name: "string",
        required: true,
      },
    },
  },
  args: {
    shadow: "none",
    showBadge: false,
    isHost: false,
    url: "https://picsum.photos/200/300",
  },
};

const meta = {
  title: "Components/Chat/Profile",
  component: Profile.Image,
  argTypes: { ...base.argTypes },
  args: { ...base.args },
} satisfies Meta<typeof Profile.Image>;

export default meta;

type ImageStory = StoryObj<typeof Profile.Image>;
type LabelStory = StoryObj<typeof Profile.Label>;
type ClickableImageStory = StoryObj<typeof Profile.ClickableImage>;
type ClickableLabelStory = StoryObj<typeof Profile.ClickableLabel>;

// Image 스토리
export const DefaultImage: ImageStory = {
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    stroke: false,
  },
};

export const StrokeImage: ImageStory = {
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    stroke: true,
  },
};

export const ShadowImage: ImageStory = {
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    shadow: "medium",
    stroke: false,
  },
};

export const BadgeImage: ImageStory = {
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    shadow: "medium",
    showBadge: true,
    stroke: false,
  },
};

export const HostImage: ImageStory = {
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    shadow: "medium",
    showBadge: false,
    stroke: false,
    isHost: true,
  },
};

// Label 스토리
export const DefaultLabel: LabelStory = {
  render: (args: ProfileLabelProps) => <Profile.Label {...args} />,
  args: {
    size: 50,
    text: "+4",
    stroke: true,
  },
};

// Clickable 스토리
export const DefaultClickable: ClickableImageStory = {
  render: (args: ProfileClickableImageProps) => <Profile.ClickableImage {...args} />,
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    shadow: "medium",
    showBadge: false,
    onClick: fn(),
    stroke: false,
    isInteractive: true,
  },
};

export const WithBadgeClickable: ClickableImageStory = {
  render: (args: ProfileClickableImageProps) => <Profile.ClickableImage {...args} />,
  args: {
    size: 50,
    url: "https://picsum.photos/200/300",
    shadow: "medium",
    showBadge: true,
    onClick: fn(),
    stroke: false,
    isInteractive: true,
  },
};

export const LabelClickable: ClickableLabelStory = {
  render: (args: ProfileClickableLabelProps) => <Profile.ClickableLabel {...args} />,
  args: {
    size: 50,
    text: "+4",
    stroke: true,
    shadow: "medium",
    onClick: fn(),
    isInteractive: true,
  },
};

// 변형 모음 스토리
export const Variants: ImageStory = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(3, 1fr)",
        padding: "1rem",
      }}>
      <div>
        <h3>기본 이미지</h3>
        <Profile.Image size={50} url="https://picsum.photos/200/300" />
      </div>

      <div>
        <h3>테두리 이미지</h3>
        <Profile.Image size={50} url="https://picsum.photos/200/300" stroke />
      </div>

      <div>
        <h3>그림자 이미지</h3>
        <Profile.Image size={50} url="https://picsum.photos/200/300" shadow="medium" />
      </div>

      <div>
        <h3>뱃지 이미지</h3>
        <Profile.Image size={50} url="https://picsum.photos/200/300" shadow="medium" showBadge />
      </div>

      <div>
        <h3>기본 라벨</h3>
        <Profile.Label size={50} text="+4" stroke />
      </div>

      <div>
        <h3>강조 라벨</h3>
        <Profile.Label size={50} text="+4" shadow="medium" />
      </div>
    </div>
  ),
};

// 크기 변형 스토리
export const SizeVariants: ImageStory = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
      }}>
      <Profile.Image size={30} url="https://picsum.photos/200/300" />
      <Profile.Image size={50} url="https://picsum.photos/200/300" />
      <Profile.Image size={70} url="https://picsum.photos/200/300" />

      <Profile.Image size={30} url="https://picsum.photos/200/300" isHost />
      <Profile.Image size={50} url="https://picsum.photos/200/300" isHost />
      <Profile.Image size={70} url="https://picsum.photos/200/300" isHost />

      <Profile.Image size={30} url="https://picsum.photos/200/300" showBadge />
      <Profile.Image size={50} url="https://picsum.photos/200/300" showBadge />
      <Profile.Image size={70} url="https://picsum.photos/200/300" showBadge />

      <Profile.Label size={30} text="+4" stroke />
      <Profile.Label size={50} text="+4" stroke />
      <Profile.Label size={70} text="+4" stroke />
    </div>
  ),
};
