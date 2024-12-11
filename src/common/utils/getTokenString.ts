export const getTokenString = (token: string) => {
  if (!token) {
    throw new Error("토큰이 존재하지 않습니다.");
  }
  const authorization = (token ?? "Bearer ").replace("Bearer", "").trim();

  return authorization;
};
