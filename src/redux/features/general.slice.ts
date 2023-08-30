import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Configs from '@/config/settings.json';

type GeneralState = {
  formOption: object;
};

const initialState: GeneralState = {
  formOption: {},
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // set item form input object
    setFormOption (state, action: PayloadAction<any>) {
      state.formOption = action.payload;
    },

  },
});

export const itemActions = generalSlice.actions;

export default generalSlice;
