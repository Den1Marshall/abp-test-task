'use client';
import { FC } from 'react';
import { useGetAllVehiclesQuery } from '../api/vehiclesApi';
import Image from 'next/image';
import { Card, CardBody, Link as NextUILink } from '@nextui-org/react';
import Link from 'next/link';
import { useAppSelector } from '@/app/ui';
import { Error } from './Error';
import { Loading } from './Loading';

export const VehicleList: FC = () => {
  const sortBy = useAppSelector((state) => state.sortByReducer.sortBy);

  const { data, isError, isLoading, isFetching, refetch } =
    useGetAllVehiclesQuery(sortBy);

  if (isLoading || isFetching) return <Loading />;
  if (isError || !data) return <Error refetch={refetch} />;

  return (
    <section className='flex flex-col gap-10'>
      {data.map((vehicle) => (
        <Card key={vehicle.id} as={'article'} className='max-h-[25%]'>
          <CardBody className='flex flex-row gap-10'>
            <NextUILink
              as={Link}
              isDisabled={vehicle.availabilityStatus === 'Out of Stock'}
              href={`/vehicles/${vehicle.id}`}
              className='bg-black'
            >
              <Image
                src={vehicle.thumbnail}
                width={400}
                height={400}
                alt={`${vehicle.title} thumbnail`}
              />
            </NextUILink>
            <div className='flex flex-col gap-2 overflow-hidden'>
              <NextUILink
                as={Link}
                href={`/vehicles/${vehicle.id}`}
                isDisabled={vehicle.availabilityStatus === 'Out of Stock'}
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
    </section>
  );
};
