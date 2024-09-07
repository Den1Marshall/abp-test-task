import { configureStore } from '@reduxjs/toolkit';
import { vehiclesApi } from '@/entities/VehicleList';
import { sortByReducer } from '@/entities/VehicleList';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [vehiclesApi.reducerPath]: vehiclesApi.reducer,
      sortByReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(vehiclesApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
