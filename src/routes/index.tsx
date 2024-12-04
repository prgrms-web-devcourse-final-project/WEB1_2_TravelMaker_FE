import { createBrowserRouter } from "react-router-dom";

import { Main, NotFound, Login, My, Planner, Landing } from "pages";
import { ROUTES } from "./type";
import { RoomCreateModal, RoomEnterModal } from "@pages/Modal";

const router = createBrowserRouter([
  { path: ROUTES.MAIN, element: <Main /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.MY, element: <My /> },
  { path: ROUTES.PLANNER, element: <Planner /> },
  { path: ROUTES.LANDING, element: <Landing /> },
  { path: ROUTES.CREATE_MODAL, element: <RoomCreateModal /> },
  { path: ROUTES.ENTER_MODAL, element: <RoomEnterModal /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
