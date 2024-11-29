/**
 * 주어진 `currentSize`를 기준으로 비례적 크기를 계산하여 반환합니다.
 * 크기는 `baseSize`에 비례하며, 최소값은 `defaultSize`로 설정됩니다.
 *
 * @param {number} currentSize - 크기를 계산할 기준이 되는 현재 크기.
 *                               예: 화면 크기, 요소 크기 등.
 * @param {number} defaultSize - 비례적 크기를 계산할 때 최소로 사용되는 기본 크기.
 * @param {number} baseSize - 비례 계산에 사용되는 기준 크기.
 *
 * @returns {number} - 계산된 비례 크기. `currentSize`와 `baseSize` 비율에 기반하며, `defaultSize` 이하로는 줄어들지 않습니다.
 *
 * @example
 * // currentSize가 150이고, defaultSize가 20, baseSize가 100일 때
 * calculateProportionalSize(150, 20, 100); // 30 (150 / 100 * 20)
 *
 * @example
 * // currentSize가 50이고, defaultSize가 20, baseSize가 100일 때
 * calculateProportionalSize(50, 20, 100); // 20 (defaultSize가 최소값으로 사용됨)
 */
const calculateProportionalSize = (currentSize: number, defaultSize: number, baseSize: number) => {
  return Math.max(defaultSize, Math.round((currentSize / baseSize) * defaultSize));
};

export default calculateProportionalSize;
