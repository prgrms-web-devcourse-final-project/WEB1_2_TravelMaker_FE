import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
