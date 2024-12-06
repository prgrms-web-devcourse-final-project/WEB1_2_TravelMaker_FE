import "styled-components";
import { DefaultTheme } from "styled-components";

import calcByPercent from "@common/utils/calcByPercent";
import {
  createResponsiveClampCalculator,
  createViewportSizeCalculator,
} from "@common/utils/createResponsiveCalculator";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends CustomTheme {}
}

export interface CustomTheme {
  colors: {
    primary: ColorStates;
    secondary: ColorStates;
    tertiary: ColorStates;
    success: InteractiveColorStates;
    information: InteractiveColorStates;
    warning: InteractiveColorStates;
    danger: InteractiveColorStates;
    text: Text;
    background: Background;
    stroke: Stroke;
  };
  typography: Typography;
  cornerRadius: CornerRadius;
  strokeWidth: StrokeWidth;
  shadows: Shadows;
}

interface Stroke {
  neutral1: string;
  neutral2: string;
  neutral3: string;
}

interface Background {
  neutral0: string;
  neutral1: string;
  neutral2: string;
  neutral3: string;
}

interface Text {
  title: string;
  body: string;
  bodySubtle: string;
  caption: string;
}

interface Shadows {
  small: string;
  medium: string;
  large: string;
}

interface StrokeWidth {
  thin: string;
  regular: string;
  thick: string;
}

interface CornerRadius {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  circular: string;
}

interface FontWeight {
  thin: 100;
  extraLight: 200;
  light: 300;
  regular: 400;
  medium: 500;
  semiBold: 600;
  bold: 700;
}

interface Typography {
  fontFamily: {
    main: "IBM Plex Sans KR";
    secondary: "Ticketing-regular";
  };
  heading: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    h4: TextStyle;
  };
  body: {
    regular: TextStyle;
    bold: TextStyle;
  };
  caption: TextStyle;
  fontWeight: FontWeight;
}

interface ColorStates {
  normal: string;
  hover: string;
  active: string;
  disabled: string;
  subtle: string;
  strong: string;
}

interface InteractiveColorStates {
  normal: string;
  hover: string;
  active: string;
  disabled: string;
}

interface TextStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
}

const sharedTypography: Typography = {
  fontFamily: {
    main: "IBM Plex Sans KR",
    secondary: "Ticketing-regular",
  },
  fontWeight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  heading: {
    h1: {
      fontSize: "32px",
      lineHeight: "48px",
      fontWeight: "700",
    },
    h2: {
      fontSize: "24px",
      lineHeight: "36px",
      fontWeight: "700",
    },
    h3: {
      fontSize: "20px",
      lineHeight: "30px",
      fontWeight: "700",
    },
    h4: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "700",
    },
  },
  body: {
    regular: {
      fontSize: "14px",
      lineHeight: "21px",
      fontWeight: "400",
    },
    bold: {
      fontSize: "14px",
      lineHeight: "21px",
      fontWeight: "700",
    },
  },
  caption: {
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: "400",
  },
};

const sharedCorners = {
  small: "3px",
  medium: "5px",
  large: "10px",
  extraLarge: "20px",
  circular: "999px",
};

const sharedStrokeWidth = {
  thin: "0.5px",
  regular: "1.5px",
  thick: "2.5px",
};

const sharedShadows = {
  small: "0px 4px 5px rgba(0, 0, 0, 0.2)",
  medium: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  large: "0px 4px 20px rgba(0, 0, 0, 0.4)",
};

export const lightTheme: DefaultTheme = {
  colors: {
    primary: {
      normal: "#7EB4EA",
      hover: "#9FCAF1",
      active: "#518CF0",
      disabled: "#7BBAFA50",
      subtle: "#F1F7FD",
      strong: "#3366C2",
    },
    secondary: {
      normal: "#4C7AA7",
      hover: "#6F99C1",
      active: "#38628E",
      disabled: "#4C7AA750",
      subtle: "#E9EEF5",
      strong: "#244461",
    },
    tertiary: {
      normal: "#182553",
      hover: "#203A88",
      active: "#182553",
      disabled: "#18255350",
      subtle: "#2862E8",
      strong: "#204ED5",
    },
    success: {
      normal: "#01B84E",
      hover: "#0ADD63",
      active: "#095040",
      disabled: "#01B84E50",
    },
    information: {
      normal: "#114FFF",
      hover: "#3275FF",
      active: "#023FF3",
      disabled: "#114FFF50",
    },
    warning: {
      normal: "#F66100",
      hover: "#FF7F10",
      active: "#C74F00",
      disabled: "#F6610050",
    },
    danger: {
      normal: "#F72216",
      hover: "#FF3F24",
      active: "#D01005",
      disabled: "#F7221650",
    },
    text: {
      title: "#1B2636",
      body: "#2B4461",
      bodySubtle: "#3B628E",
      caption: "#6F99C1",
    },
    background: {
      neutral0: "#FFFFFF",
      neutral1: "#F4F7FB",
      neutral2: "#E9EEF5",
      neutral3: "#CDD8EA",
    },
    stroke: {
      neutral1: "#E9EEF5",
      neutral2: "#A2BCD7",
      neutral3: "#4C7AA7",
    },
  },
  typography: sharedTypography,
  cornerRadius: sharedCorners,
  strokeWidth: sharedStrokeWidth,
  shadows: sharedShadows,
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: {
      normal: "#7BBAFA",
      hover: "#9FCAF1",
      active: "#518CF0",
      disabled: "#7BBAFA50",
      subtle: "#F1F7FD",
      strong: "#B7DFFF",
    },
    secondary: {
      normal: "#4C7AA7",
      hover: "#38628E",
      active: "#102A42",
      disabled: "#4C7AA750",
      subtle: "#203544",
      strong: "#1E242A",
    },
    tertiary: {
      normal: "#F8F8FC",
      hover: "#CBD8F1",
      active: "#A9CDE8",
      disabled: "#F8F7F040",
      subtle: "#123154",
      strong: "#091E40",
    },
    success: {
      normal: "#01B84E",
      hover: "#0ADD63",
      active: "#32E89F",
      disabled: "#01B84E50",
    },
    information: {
      normal: "#114FFF",
      hover: "#3275FF",
      active: "#143FCF",
      disabled: "#114FFF50",
    },
    warning: {
      normal: "#F66100",
      hover: "#FF7F10",
      active: "#C74F00",
      disabled: "#F6610050",
    },
    danger: {
      normal: "#F72216",
      hover: "#FF3F24",
      active: "#CD1B1A",
      disabled: "#F7221650",
    },
    text: {
      title: "#F1F1F1",
      body: "#D9D9D9",
      bodySubtle: "#CBD8F1",
      caption: "#A2BCD7",
    },
    background: {
      neutral0: "#121212",
      neutral1: "#182636",
      neutral2: "#283852",
      neutral3: "#244461",
    },
    stroke: {
      neutral1: "#283852",
      neutral2: "#314F73",
      neutral3: "#4C7AA7",
    },
  },
  typography: sharedTypography,
  cornerRadius: sharedCorners,
  strokeWidth: sharedStrokeWidth,
  shadows: sharedShadows,
};

/**
 * 주어진 최소값과 최대값 범위에서, 뷰포트 너비(vw)에 따라 반응형 값을 계산합니다.
 * @param min 최소 픽셀 값
 * @param max 최대 픽셀 값
 * @returns `clamp`를 사용하여 최소값, 뷰포트 기반 계산 값, 최대값을 포함하는 CSS 표현식
 */
export const calcResponsiveCore = (min: number, max: number, type?: "vw" | "vh") => {
  const viewPortType = type ?? "vw";

  return `clamp(${min}px, calc(${max} / 1920 * 100${viewPortType}), ${max}px)`;
};

/**
 * 퍼센트를 기준으로 최소값을 계산하고, 최대값과 함께 반응형 값을 제공합니다.
 * @param percentage 최소값을 계산할 퍼센트
 * @param max 최대 픽셀 값
 * @returns `calcResponsive`를 호출하여 퍼센트 기반 최소값과 최대값으로 생성된 CSS 표현식
 */
export const calcResponsiveByPercent = (percentage: number, max: number) => {
  return calcResponsiveCore(calcByPercent(max, percentage), max);
};

const config = {
  designWidth: 1920,
  designHeight: 1080,
  minWidth: 1024,
  minHeight: 768,
};

/**
 * 반응형 CSS clamp 값을 생성하는 유틸리티 함수
 *
 * @description
 * 디자인 시안의 고정 크기 값을 반응형 clamp() 함수로 변환합니다.
 * 최소값, 반응형 값, 최대값을 자동으로 계산하여 CSS clamp를 생성합니다.
 *
 * @example
 * // 기본 설정
 * const config = {
 *   designWidth: 1920,    // 디자인 기준 너비
 *   designHeight: 1080,   // 디자인 기준 높이
 *   minWidth: 1024,       // 최소 지원 너비
 *   minHeight: 768        // 최소 지원 높이
 * };
 *
 * const calcResponsive = createResponsiveClampCalculator(config);
 *
 * // 사용 예시
 * calcResponsive({ value: 32 })                    // width 기준, 숫자값
 * calcResponsive({ value: "24px" })                // width 기준, 문자열
 * calcResponsive({ value: 50, dimension: "height" }) // height 기준
 * calcResponsive({ value: 40, minValue: 20 })      // 최소값 직접 지정
 *
 * // 결과 예시
 * // clamp(17px, calc(32 / 1920 * 100vw), 32px)
 *
 * @param {ViewportConfig} config - 뷰포트 설정 객체
 * @returns {Function} 반응형 clamp 값을 생성하는 함수
 */
export const calcResponsive = createResponsiveClampCalculator(config);

/**
 * 디자인 시안의 크기를 기준으로 현재 뷰포트에 맞는 반응형 크기를 계산하는 함수를 생성합니다.
 *
 * @param config - 디자인 시안의 기준 크기 설정
 * @param config.designWidth - 디자인 시안의 기준 너비 (픽셀)
 * @param config.designHeight - 디자인 시안의 기준 높이 (픽셀)
 *
 * @returns 현재 뷰포트에 맞는 크기를 계산하는 함수를 반환합니다.
 *
 * @example
 * // useWindowSize 훅과 함께 사용
 * const App = () => {
 *   const windowSize = useWindowSize();
 *
 *   // 디자인 시안의 30px을 현재 뷰포트 너비에 맞게 변환
 *   const responsiveWidth = calcResponsiveValue({
 *     value: 30,
 *     dimension: "width",
 *     window: windowSize
 *   });
 *
 *   return <div style={{ width: responsiveWidth }} />;
 * }
 */

export const calcResponsiveValue = createViewportSizeCalculator(config);
