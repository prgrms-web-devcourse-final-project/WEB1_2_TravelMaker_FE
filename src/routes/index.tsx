import { createBrowserRouter } from "react-router-dom";

import { Main, NotFound, Login, My, Planner, Landing } from "pages";

const router = createBrowserRouter([
  { path: "/", element: <Main /> }, // 메인 페이지
  { path: "/login", element: <Login /> }, // 로그인 페이지
  { path: "/my", element: <My /> }, // 마이 페이지
  { path: "/planner", element: <Planner /> }, // 플레너 페이지
  { path: "/landing", element: <Landing /> }, // 404 페이지
  { path: "*", element: <NotFound /> }, // 404 페이지
]);

export default router;
