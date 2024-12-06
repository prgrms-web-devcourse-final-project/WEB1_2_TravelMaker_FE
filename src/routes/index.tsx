import { createBrowserRouter } from "react-router-dom";

import { Main, NotFound, Login, My, Planner, Landing } from "pages";
import { ROUTES } from "./type";
import { RoomCreateModal, RoomEnterModal } from "@pages/Modal";
import Header from "@components/header/Header";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      { path: ROUTES.MAIN, element: <ProtectedRoute><Main /></ProtectedRoute> },
      { path: ROUTES.MY, element: <ProtectedRoute><My /></ProtectedRoute> },
    ],
  },
  { path: ROUTES.LOGIN, element: <Login /> },
  {
    path: ROUTES.PLANNER,
    element: (
      <ProtectedRoute>
        <Planner />
      </ProtectedRoute>
    ),
  },
  { path: ROUTES.LANDING, element: <Landing /> },
  {
    path: ROUTES.CREATE_MODAL,
    element: (
      <ProtectedRoute>
        <RoomCreateModal />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ENTER_MODAL,
    element: (
      <ProtectedRoute>
        <RoomEnterModal />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
