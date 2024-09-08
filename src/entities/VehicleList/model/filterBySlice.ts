import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterByState {
  filterBy: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
}

const initialState: FilterByState = {
  filterBy: '',
  minPrice: '',
  maxPrice: '',
  inStock: false,
};

const filterBySlice = createSlice({
  name: 'filterBy',
  initialState,

  reducers: {
    setFilterBy: (state, action: PayloadAction<{ filterBy: string }>) => {
      state.filterBy = action.payload.filterBy;
    },

    setMinPrice: (state, action: PayloadAction<{ minPrice: string }>) => {
      state.minPrice = action.payload.minPrice;
    },

    setMaxPrice: (state, action: PayloadAction<{ maxPrice: string }>) => {
      state.maxPrice = action.payload.maxPrice;
    },

    setInStock: (state, action: PayloadAction<{ inStock: boolean }>) => {
      state.inStock = action.payload.inStock;
    },
  },
});

export const { reducer: filterByReducer, actions: filterByActions } =
  filterBySlice;
