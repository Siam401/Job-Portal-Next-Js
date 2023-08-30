import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppliedJobListState = {
  data: string[];
  isLoading: boolean;
  error: string | null;
};

const initialState: AppliedJobListState = {
  data: [],
  isLoading: false,
  error: null,
};

const appliedJobListSlice = createSlice({
  name: 'appliedJobList',
  initialState,
  reducers: {
    setAppliedJob(state, action: PayloadAction<string[]>) {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setAppliedJobLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setAppliedJobError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setAppliedJob, setAppliedJobLoading, setAppliedJobError } =
  appliedJobListSlice.actions;

export default appliedJobListSlice.reducer;
