/**
 * 요소의 크기를 비율에 맞게 계산하는 함수입니다.
 */
const scaleByContainer = (containerSize: number, minSize: number, designSize: number) => {
  return Math.max(minSize, Math.round((containerSize / designSize) * minSize));
};

export default scaleByContainer;
