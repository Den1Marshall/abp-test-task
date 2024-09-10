import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Vehicle } from '../model/Vehicle';
import { SortBy } from '../model/sortBySlice';

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),

  endpoints: (builder) => ({
    getAllVehicles: builder.query<Vehicle[], SortBy>({
      query: (sortBy) => {
        if (sortBy === 'default') return '/products/category/vehicle';

        return `/products/category/vehicle?${sortBy}`;
      },

      transformResponse: (response: { products: Vehicle[] }) =>
        response.products, // instantly return products array to avoid unnecessary destructurization
    }),

    getVehicleById: builder.query<Vehicle, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllVehiclesQuery, useGetVehicleByIdQuery } = vehiclesApi;
