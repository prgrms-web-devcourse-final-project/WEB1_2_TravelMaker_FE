/**
 * 특정 퍼센트만큼 증감된 값을 계산하는 함수
 * @param original 원래 값
 * @param percentage 증감 퍼센트 (양수는 증가, 음수는 감소)
 * @returns 계산된 값
 */
const calcByPercent = (original: number, percentage: number): number => {
  if (original < 0) {
    throw new Error("원래 값(original)은 0보다 작을 수 없습니다.");
  }

  const calculatedValue = original + (original * percentage) / 100;

  return parseFloat(calculatedValue.toFixed(2)); // 소수점 두 자리까지
};

export default calcByPercent;
