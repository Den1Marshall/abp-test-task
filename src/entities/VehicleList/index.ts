export type { Vehicle } from './model/Vehicle';

export type { SortBy } from './model/sortBySlice';
export { sortByReducer, sortByActions } from './model/sortBySlice';

export { vehiclesApi, useGetAllVehiclesQuery } from './api/vehiclesApi';

export { VehicleList } from './ui/VehicleList';
