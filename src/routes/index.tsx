import { createBrowserRouter } from "react-router-dom";

import { Main, NotFound, My, Planner } from "pages";
import LoginPage from "@pages/Login/LoginPage";

const router = createBrowserRouter([
  { path: "/", element: <Main /> }, // 메인 페이지
  { path: "/login", element: <LoginPage /> }, // 로그인 페이지
  { path: "/my", element: <My /> }, // 마이 페이지
  { path: "/planner", element: <Planner /> }, // 플레너 페이지
  { path: "*", element: <NotFound /> }, // 404 페이지
]);

export default router;
