import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import toastSlice from './features/toast.slice';
import { commonSlice } from './features/common.slice';
import authSlice from './features/auth.slice';
import uiReducer from './features/ui.slice';
import notificationReducer from './features/notification.slice';
import modalReducer from './features/modal.slice';
import appliedJobListReducer from './features/appliedJobList.slice';

export const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    common: commonSlice.reducer,
    auth: authSlice.reducer,
    ui: uiReducer,
    notification: notificationReducer,
    modal: modalReducer,
    appliedJobList: appliedJobListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState> & {
  [key: string]: any;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
