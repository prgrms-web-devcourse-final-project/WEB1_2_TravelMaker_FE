import { useNavigate } from "react-router-dom";

import { RouteParams } from "@routes/type";

export const useTypedNavigate = () => {
  const navigate = useNavigate();

  return <Path extends keyof RouteParams>(
    path: Path,
    params?: RouteParams[Path],
    options?: { replace?: boolean }
  ) => {
    let resolvedPath = path as string;

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        resolvedPath = resolvedPath.replace(`:${key}`, String(value));
      });
    }

    navigate(resolvedPath, { replace: options?.replace });
  };
};
