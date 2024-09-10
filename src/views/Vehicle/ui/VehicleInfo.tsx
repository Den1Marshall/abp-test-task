import { Vehicle } from '@/entities/VehicleList';
import {
  Card,
  CardBody,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Rating, ThinStar } from '@smastrom/react-rating';
import { FC } from 'react';

interface VehicleInfoProps {
  vehicle: Vehicle;
}

export const VehicleInfo: FC<VehicleInfoProps> = ({ vehicle }) => {
  return (
    <Card className='w-full lg:max-w-[50%]'>
      <CardBody className='gap-3'>
        <p
          className={`${
            vehicle.availabilityStatus === 'Out of Stock' && 'text-warning'
          }`}
        >
          {vehicle.availabilityStatus}
        </p>
        <p>
          Price:{' '}
          <span className='text-success'>
            {new Intl.NumberFormat('en', {
              style: 'currency',
              currency: 'USD',
            }).format(vehicle.price)}
          </span>
        </p>
        <p>{vehicle.description}</p>
        <p>Discount: {vehicle.discountPercentage}%</p>

        <div className='flex items-center gap-1'>
          <p>Rating:</p>
          <Rating
            itemStyles={{
              itemShapes: ThinStar,
              activeFillColor: '#ffb700',
              inactiveFillColor: '#fbf1a9',
            }}
            value={vehicle.rating}
            readOnly
            className='max-w-[150px]'
          />
        </div>

        <Divider />
        <p>Return policy: {vehicle.returnPolicy}</p>
        <p>Shipping information: {vehicle.shippingInformation}</p>
        <p>SKU: {vehicle.sku}</p>
        <p
          className={`${
            vehicle.availabilityStatus === 'Out of Stock' && 'text-warning'
          }`}
        >
          Available: {vehicle.stock}
        </p>
        <p>{vehicle.warrantyInformation}</p>
        <Divider />
        <Table topContent={<p>Vehicle dimensions</p>}>
          <TableHeader>
            <TableColumn>Width</TableColumn>
            <TableColumn>Height</TableColumn>
            <TableColumn>Depth</TableColumn>
            <TableColumn>Weight</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{vehicle.dimensions.width}</TableCell>
              <TableCell>{vehicle.dimensions.height}</TableCell>
              <TableCell>{vehicle.dimensions.depth}</TableCell>
              <TableCell>{vehicle.weight}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};
