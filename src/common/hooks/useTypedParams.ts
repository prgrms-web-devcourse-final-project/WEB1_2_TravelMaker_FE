import { RouteParams } from "@routes/type";
import { useParams } from "react-router-dom";

export const useTypedParams = <T extends keyof RouteParams>() => {
  return useParams<NonNullable<RouteParams[T]>>();
};
