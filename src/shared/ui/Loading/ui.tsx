import { Spinner } from '@nextui-org/react';
import { FC } from 'react';

interface LoadingProps {
  className?: string;
}

export const Loading: FC<LoadingProps> = ({ className }) => {
  return <Spinner size='lg' aria-label='Loading...' className={className} />;
};
