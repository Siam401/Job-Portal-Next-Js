import { createSlice, createSelector } from '@reduxjs/toolkit';

interface CommonState {
  data: Record<string, unknown>;
  isLoading: boolean;
  error: Record<string, string> | null;
}

const initialState: CommonState = {
  data: {},
  isLoading: false,
  error: null,
};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    fetchDataPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataFulfilled: (state, action) => {
      state.isLoading = false;
      state.data[action.payload.dataKey] = action.payload.data;
    },
    fetchDataRejected: (state, action) => {
      state.isLoading = false;
      state.error = {
        ...state.error,
        [action.payload.dataKey]: action.payload.message,
      };
    },
  },
});

const getDataByKey = createSelector(
  (state: { common: CommonState }, dataKey: string) =>
    state.common.data[dataKey],
  (data) => data,
);

const getIsLoading = createSelector(
  (state: { common: CommonState }) => state.common.isLoading,
  (isLoading) => isLoading,
);

const getErrorByKey = createSelector(
  (state: { common: CommonState }, dataKey: string) =>
    state.common.error === null ? null : state.common.error[dataKey],
  (error) => error,
);

export const commonSlice = {
  ...common,
  selectors: { getDataByKey, getIsLoading, getErrorByKey },
};
