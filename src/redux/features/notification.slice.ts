import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  selectedId: number | null;
  unseenCount: number;
}

const initialState: NotificationState = {
  selectedId: null,
  unseenCount: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<number | null>) => {
      state.selectedId = action.payload;
    },
    setUnseenCount: (state, action: PayloadAction<number>) => {
      state.unseenCount = action.payload;
    },
  },
});

export const { setSelectedId, setUnseenCount } = notificationSlice.actions;

export default notificationSlice.reducer;
