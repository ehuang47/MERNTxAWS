import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { legacy_createStore, applyMiddleware, compose, AnyAction } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import rootReducer from "./reducers";

export default legacy_createStore(rootReducer, {}, compose(applyMiddleware(thunk)));

/* Types https://github.com/reduxjs/redux-toolkit/issues/587*/
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export type TypedGetState = () => ReduxState;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;