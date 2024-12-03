import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocialCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      fetch(
        "http://wayfarer-develop-env.eba-s3bm7efv.ap-northeast-2.elasticbeanstalk.com//auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authorizationCode }),
        }
      )
        .then(async (response) => {
          if (!response.ok) throw new Error("Authorization failed");
          //   const tokens = await response.json();
          // 서버가 쿠키에 저장하면 클라이언트에서 따로 처리할 필요 없음
          alert("로그인 성공!");
          navigate("/"); // 메인 페이지로 이동
        })
    } else {
      alert("Authorization Code를 받지 못했습니다.");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default SocialCallback;
