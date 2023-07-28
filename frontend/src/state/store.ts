import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import modemReducer from './slices/modemSlice';

export const store = configureStore({
  reducer: {
    modems: modemReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;