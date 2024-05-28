import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import userReducer from "./slices/userReducer";
import { useDispatch, useSelector, useStore } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
