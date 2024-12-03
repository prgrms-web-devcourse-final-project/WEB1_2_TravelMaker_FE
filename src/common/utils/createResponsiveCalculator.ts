import extractNumber from "./extractNumber";

type ViewportConfig = {
  designWidth: number; // 디자인 기준 너비 (default: 1920)
  designHeight: number; // 디자인 기준 높이 (default: 1080)
  minWidth: number; // 최소 지원 너비 (default: 1024)
  minHeight: number; // 최소 지원 높이 (default: 768)
};

type ResponsiveValue = {
  value: number | string; // 원본 값
  dimension?: "width" | "height"; // 적용 차원
  minValue?: number;
};

export const createResponsiveClampCalculator = (config: ViewportConfig) => {
  const { designWidth, designHeight, minWidth, minHeight } = config;

  return ({ value, minValue, dimension = "width" }: ResponsiveValue) => {
    const baseSize = dimension === "width" ? designWidth : designHeight;
    const minSize = dimension === "width" ? minWidth : minHeight;
    const viewportUnit = dimension === "width" ? "vw" : "vh";
    // value가 30px같은 문자열로 넘어온경우 파싱처리 -> 30
    const numValue = typeof value === "string" ? extractNumber(value) : value;

    // 최소값 계산 (비율 유지)
    const scale = minSize / baseSize;
    const min = minValue ?? Math.floor(numValue * scale);

    // 뷰포트 기반 동적 값 계산
    const dynamicValue = `calc(${numValue} / ${baseSize} * 100${viewportUnit})`;

    return `clamp(${min}px, ${dynamicValue}, ${numValue}px)`;
  };
};

export const createViewportSizeCalculator = (config: ViewportConfig) => {
  const { designWidth, designHeight } = config;

  return ({
    value,
    dimension = "width",
    window: { width, height },
  }: ResponsiveValue & { window: { width: number; height: number } }) => {
    const baseSize = dimension === "width" ? designWidth : designHeight;

    // 현재 뷰포트 크기 가져오기
    const currentViewport = dimension === "width" ? width : height;
    // value가 30px같은 문자열로 넘어온경우 파싱처리 -> 30
    const numValue = typeof value === "string" ? extractNumber(value) : value;

    // (value / baseSize * 100) * currentViewport / 100
    return (numValue / baseSize) * currentViewport;
  };
};
