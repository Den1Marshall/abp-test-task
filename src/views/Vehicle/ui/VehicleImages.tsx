import { Vehicle } from '@/entities/VehicleList';
import { Image as NextUIImage } from '@nextui-org/react';
import Image from 'next/image';
import { FC } from 'react';

interface VehicleImagesProps {
  vehicle: Vehicle;
}

export const VehicleImages: FC<VehicleImagesProps> = ({ vehicle }) => {
  return (
    <section className='w-full h-full flex gap-5 no-scrollbar overflow-x-scroll snap-mandatory snap-x lg:max-w-[50%]'>
      {vehicle.images.map((image, i) => (
        <NextUIImage
          key={image}
          as={Image}
          width={450}
          height={450}
          src={image}
          alt={`${vehicle.brand} ${vehicle.title} ${i} image`}
          className='snap-center object-contain'
          classNames={{ wrapper: 'min-w-[50%]' }}
        />
      ))}
    </section>
  );
};
