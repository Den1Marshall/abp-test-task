import { Spinner } from '@nextui-org/react';
import { FC } from 'react';

export const Loading: FC = () => {
  return <Spinner size='lg' aria-label='Loading...' className='my-auto' />;
};
