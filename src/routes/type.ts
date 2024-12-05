export const ROUTES = {
  MAIN: "/",
  LOGIN: "/login",
  MY: "/my",
  PLANNER: "/planner/:roomId",
  LANDING: "/landing",
  CREATE_MODAL: "/createModalRoom",
  ENTER_MODAL: "/enterModalRoom/:roomId",
} as const;

export type RouteParams = {
  [ROUTES.MAIN]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.MY]: undefined;
  [ROUTES.PLANNER]: { roomId: string };
  [ROUTES.LANDING]: undefined;
  [ROUTES.CREATE_MODAL]: undefined;
  [ROUTES.ENTER_MODAL]: { roomId: string };
};
