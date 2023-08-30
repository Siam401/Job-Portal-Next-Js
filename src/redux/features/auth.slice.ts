import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  username: string;
  token: string;
};

const initialState: AuthState = {
  username: '',
  token: '',
};

const authSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // set item form input object
    setUserName(state, action: PayloadAction<any>) {
      state.username = action.payload;
    },

    setToken(state, action: PayloadAction<any>) {
      state.token = action.payload;
    },

  },
});

export const authActions = authSlice.actions;

export default authSlice;
