import { VehicleList } from '@/entities/VehicleList';
import { FilterVehicles } from '@/features/FilterVehicles';
import { SortVehicles } from '@/features/SortVehicles';

export default function Home() {
  return (
    <main className='h-full flex flex-col gap-10'>
      <h1 className='text-5xl text-center'>Car Showroom</h1>
      <div className='flex gap-5'>
        <FilterVehicles />
        <SortVehicles />
      </div>
      <VehicleList />
    </main>
  );
}
