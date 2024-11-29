/**
 * 문자열에서 첫 번째로 발견된 숫자를 추출하여 정수로 반환합니다.
 *
 * @param {string} value - 숫자를 포함할 가능성이 있는 문자열.
 *                         예: "15px", "width: 200px", "no number here".
 * @returns {number} - 문자열에서 추출된 정수 값. 숫자가 없으면 기본값으로 0을 반환합니다.
 *
 * @example
 * // 숫자가 포함된 문자열에서 숫자 추출
 * extractNumber("15px"); // 15
 * extractNumber("border-width: 20px"); // 20
 *
 * @example
 * // 숫자가 없는 문자열의 경우
 * extractNumber("none"); // 0
 * extractNumber(""); // 0
 *
 * @example
 * // 숫자와 문자가 혼합된 문자열
 * extractNumber("margin: -10px"); // 10 (음수 기호는 무시됨)
 */
const extractNumber = (value: string): number => {
  const result = value.match(/\d+/); // 숫자에 해당하는 부분 추출

  return result ? parseInt(result[0], 10) : 0; // 숫자로 변환
};

export default extractNumber;
