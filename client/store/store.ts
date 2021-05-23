import { configureStore } from '@reduxjs/toolkit';

import buildReducer from '#features/builds/slices/buildSlice';

export const store = configureStore({
  reducer: {
    build: buildReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
