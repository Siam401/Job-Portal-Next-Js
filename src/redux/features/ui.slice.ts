import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isSidebarOpen: boolean;
}

const initialState: UIState = {
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { openSidebar, closeSidebar } = uiSlice.actions;

export default uiSlice.reducer;
