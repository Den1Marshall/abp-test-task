import { VehicleList } from '@/entities/VehicleList';
import { SortVehicles } from '@/features/SortVehicles';

export default function Home() {
  return (
    <main className='h-full flex flex-col gap-10'>
      <h1 className='text-6xl text-center'>Car Showroom</h1>
      <div className='h-full w-[50%] ml-auto flex flex-col gap-10'>
        <SortVehicles />
        <VehicleList />
      </div>
    </main>
  );
}
