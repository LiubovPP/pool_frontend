import type { TypedUseSelectorHook } from "react-redux"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../store"

// вместо plain `useDispatch` и `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
