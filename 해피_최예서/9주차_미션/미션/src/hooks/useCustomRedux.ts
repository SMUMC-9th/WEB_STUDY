import {useDispatch as useDefaultDispatch, useSelector as useDefaultSelector} from "react-redux";
import type {TypedUseSelectorHook} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";

export const useDispatch: () => AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;