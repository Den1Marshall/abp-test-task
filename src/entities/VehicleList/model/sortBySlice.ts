import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortBy =
  | 'sortBy=price&order=asc'
  | 'sortBy=price&order=desc'
  | 'sortBy=rating&order=desc'
  | 'default';

interface SortByState {
  sortBy: SortBy;
}

const initialState: SortByState = {
  sortBy: 'default',
};

const sortBySlice = createSlice({
  name: 'sortBy',
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
  },
});

export const { reducer: sortByReducer, actions: sortByActions } = sortBySlice;
