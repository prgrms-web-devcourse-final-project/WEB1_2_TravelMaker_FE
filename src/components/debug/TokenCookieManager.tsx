import React, { useState, useEffect } from "react";
import { withDevOnly } from "./withDevOnly";
import { setDefaultsHeaderAuth } from "@api/fetch";

interface TokenInputProps {
  style?: React.CSSProperties;
}

/**
 * TokenCookieManager 컴포넌트는 개발 전용 컴포넌트입니다.
 */
const TokenCookieManager: React.FC<TokenInputProps> = withDevOnly(({ style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tokenInputs, setTokenInputs] = useState({
    accessToken: "",
    refreshToken: "",
  });

  useEffect(() => {
    // 초기 쿠키 값 로드
    const currentAccessToken = localStorage.getItem("accessToken") || "";
    const currentRefreshToken = getCookie("refreshToken") || "";

    setTokenInputs({
      accessToken: currentAccessToken,
      refreshToken: currentRefreshToken,
    });

    setDefaultsHeaderAuth(currentAccessToken);
    localStorage.setItem("accessToken", currentAccessToken);
  }, []);

  const handleTokenChange = (type: "accessToken" | "refreshToken", value: string) => {
    setTokenInputs((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleApplyTokens = () => {
    const expiresAccess = new Date();
    const expiresRefresh = new Date();

    // Access Token은 3시간 후 만료
    expiresAccess.setHours(expiresAccess.getHours() + 3);
    // Refresh Token은 2주 후 만료
    expiresRefresh.setDate(expiresRefresh.getDate() + 14);

    if (tokenInputs.accessToken) {
      setCookie("accessToken", tokenInputs.accessToken);
      localStorage.setItem("accessToken", tokenInputs.accessToken);
    }

    if (tokenInputs.refreshToken) {
      setCookie("refreshToken", tokenInputs.refreshToken);
    }

    alert("토큰이 성공적으로 적용되었습니다.");
  };

  const handleClearTokens = () => {
    setCookie("accessToken", "");
    setCookie("refreshToken", "");
    setTokenInputs({
      accessToken: "",
      refreshToken: "",
    });
    localStorage.removeItem("accessToken");
    alert("토큰이 삭제되었습니다.");
  };

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: "15px",
    borderRadius: "8px",
    color: "white",
    width: "400px",
    ...style,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    backgroundColor: "#2b2b2b",
    border: "1px solid #444",
    color: "white",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "12px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "8px 16px",
    margin: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <button
        style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "토큰 설정 닫기" : "토큰 설정 열기"}
      </button>

      {isOpen && (
        <div style={{ marginTop: "10px" }}>
          {/* Access Token */}
          <div style={{ marginBottom: "10px" }}>
            <label>Access Token:</label>
            <textarea
              style={{ ...inputStyle, height: "60px" }}
              value={tokenInputs.accessToken}
              onChange={(e) => handleTokenChange("accessToken", e.target.value)}
              placeholder="Access Token을 입력하세요"
            />
          </div>

          {/* Refresh Token */}
          <div style={{ marginBottom: "10px" }}>
            <label>Refresh Token:</label>
            <textarea
              style={{ ...inputStyle, height: "60px" }}
              value={tokenInputs.refreshToken}
              onChange={(e) => handleTokenChange("refreshToken", e.target.value)}
              placeholder="Refresh Token을 입력하세요"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{ ...buttonStyle, backgroundColor: "#2196F3" }}
              onClick={handleApplyTokens}>
              토큰 적용
            </button>
            <button
              style={{ ...buttonStyle, backgroundColor: "#f44336" }}
              onClick={handleClearTokens}>
              토큰 삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value};`;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;

  return null;
};

(() => {
  // 초기 쿠키 값 로드
  const currentCookieToken = getCookie("accessToken") || "";

  setDefaultsHeaderAuth(currentCookieToken);
})();

export default TokenCookieManager;
