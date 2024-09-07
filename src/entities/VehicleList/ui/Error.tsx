'use client';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

interface ErrorProps {
  refetch: () => void;
}

export const Error: FC<ErrorProps> = ({ refetch }) => {
  return (
    <div className='mt-auto h-full flex flex-col gap-5 items-center justify-center'>
      <p role='alert' className='text-danger'>
        Error while fetching vehicles
      </p>
      <Button color='primary' onPress={refetch}>
        Try again
      </Button>
    </div>
  );
};
