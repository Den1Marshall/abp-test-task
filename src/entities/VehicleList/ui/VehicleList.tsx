'use client';
import { FC, useMemo } from 'react';
import { useGetAllVehiclesQuery } from '../api/vehiclesApi';
import Image from 'next/image';
import { Card, CardBody, Link as NextUILink } from '@nextui-org/react';
import Link from 'next/link';
import { useAppSelector } from '@/app/ui';
import { Error } from './Error';
import { Vehicle } from '../model/Vehicle';
import { NothingFound } from './NothingFound';
import { Loading } from '@/shared/ui';

export const VehicleList: FC = () => {
  const sortBy = useAppSelector((state) => state.sortByReducer.sortBy);
  const { filterBy, minPrice, maxPrice, inStock } = useAppSelector(
    (state) => state.filterByReducer
  );

  const { data, isError, isLoading, isFetching, refetch } =
    useGetAllVehiclesQuery(sortBy);

  const filteredVehicles = useMemo(() => {
    if (data) {
      let vehiclesCopy: Vehicle[] = JSON.parse(JSON.stringify(data));

      if (filterBy) {
        vehiclesCopy = vehiclesCopy.filter((vehicle) =>
          Object.keys(vehicle).some((parameter) => {
            const prop = (vehicle as any)[parameter];

            return prop
              .toString()
              .toLowerCase()
              .includes(filterBy.toLowerCase());
          })
        );
      }

      if (minPrice) {
        vehiclesCopy = vehiclesCopy.filter(
          (vehicle) => vehicle.price >= +minPrice
        );
      }

      if (maxPrice) {
        vehiclesCopy = vehiclesCopy.filter(
          (vehicle) => vehicle.price <= +maxPrice
        );
      }

      if (inStock) {
        vehiclesCopy = vehiclesCopy.filter(
          (vehicle) => vehicle.availabilityStatus === 'In Stock'
        );
      }

      return vehiclesCopy;
    }
  }, [data, filterBy, minPrice, maxPrice, inStock]);

  if (isLoading || isFetching) return <Loading className={'my-auto'} />;
  if (isError) return <Error refetch={refetch} />;
  if (filteredVehicles && filteredVehicles.length === 0)
    return <NothingFound />;

  return (
    <section className='overflow-y-scroll overscroll-contain no-scrollbar pb-5'>
      <div className='flex flex-col gap-10'>
        {filteredVehicles &&
          filteredVehicles.map((vehicle, i) => (
            <Card key={vehicle.id} as={'article'}>
              <CardBody className='flex flex-row gap-10 overflow-hidden'>
                <NextUILink
                  as={Link}
                  href={`/vehicles/${vehicle.id}`}
                  className='bg-black'
                >
                  <Image
                    priority={i === 0}
                    src={vehicle.thumbnail}
                    width={400}
                    height={400}
                    alt={`${vehicle.title} thumbnail`}
                    className='max-w-full h-auto'
                  />
                </NextUILink>
                <div className='flex flex-col gap-2 overflow-hidden'>
                  <NextUILink
                    as={Link}
                    href={`/vehicles/${vehicle.id}`}
                  >{`${vehicle.brand} ${vehicle.title}`}</NextUILink>

                  <p className='text-success'>${vehicle.price}</p>
                  <p className='whitespace-nowrap overflow-hidden text-ellipsis'>
                    {vehicle.description}
                  </p>

                  <div className='mt-auto flex items-center justify-between'>
                    <p className='text-gray-500'>
                      {new Date(vehicle.meta.createdAt).toLocaleDateString()}
                    </p>
                    <p
                      className={`${
                        vehicle.availabilityStatus === 'Out of Stock' &&
                        'text-warning'
                      }`}
                    >
                      {vehicle.availabilityStatus}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </section>
  );
};
