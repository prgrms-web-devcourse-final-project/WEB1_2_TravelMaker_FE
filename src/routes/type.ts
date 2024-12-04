export const ROUTES = {
  MAIN: "/",
  LOGIN: "/login",
  MY: "/my",
  PLANNER: "/planner",
  LANDING: "/landing",
  CREATE_MODAL: "/createModalRoom",
  ENTER_MODAL: "/enterModalRoom",
} as const;

export type RouteParams = {
  [ROUTES.MAIN]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.MY]: undefined;
  [ROUTES.PLANNER]: undefined;
  [ROUTES.LANDING]: undefined;
  [ROUTES.CREATE_MODAL]: undefined;
  [ROUTES.ENTER_MODAL]: undefined;
};
