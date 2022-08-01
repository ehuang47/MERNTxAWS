import { configureStore } from '@reduxjs/toolkit';
import { profiles } from './slices';

const store = configureStore({
  reducer: { profiles },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {profiles: ProfilesState}
export type TypedDispatch = typeof store.dispatch;

export default store;