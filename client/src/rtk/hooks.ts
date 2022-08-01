import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, TypedDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTypedDispatch: () => TypedDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;