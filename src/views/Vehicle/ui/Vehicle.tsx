'use client';
import { useGetVehicleByIdQuery, VehicleReview } from '@/entities/VehicleList';
import { Loading } from '@/shared/ui';
import {
  Link as NextUILink,
  Card,
  CardBody,
  Divider,
  CardHeader,
  CardFooter,
} from '@nextui-org/react';
import Link from 'next/link';
import { AddReview } from '@/features/AddReview';
import { useLocalStorage } from 'usehooks-ts';
import { useCallback } from 'react';
import { Rating, ThinStar } from '@smastrom/react-rating';
import { VehicleInfo } from './VehicleInfo';
import { VehicleImages } from './VehicleImages';
import { Error } from './Error';

export default function Vehicle({ params }: { params: { id: number } }) {
  const {
    data: vehicle,
    isLoading,
    isError,
    refetch,
  } = useGetVehicleByIdQuery(params.id);

  const [localReviews, setLocalReviews] = useLocalStorage<VehicleReview[]>(
    `reviews/${params.id}`,
    [],
    { initializeWithValue: false }
  );

  const addReview = useCallback(
    (review: VehicleReview) => {
      setLocalReviews([...localReviews, review]);
    },
    [localReviews, setLocalReviews]
  );

  if (isLoading)
    return (
      <Loading
        className={
          'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
        }
      />
    );

  if (isError || !vehicle) return <Error refetch={refetch} />;

  return (
    <main className='flex flex-col justify-center items-center gap-5 pb-10'>
      <NextUILink as={Link} href='/'>
        Go back
      </NextUILink>
      <h1 className='text-5xl text-center'>{`${vehicle.brand} ${vehicle.title}`}</h1>
      <div className='flex flex-col items-center lg:flex-row'>
        <VehicleImages vehicle={vehicle} />
        <VehicleInfo vehicle={vehicle} />
      </div>

      <Divider />
      <h2 className='text-2xl self-start'>Reviews</h2>
      <div className='w-full flex flex-col items-start gap-10 lg:flex-row'>
        <article className='w-full flex flex-col gap-5'>
          {vehicle.reviews.concat(localReviews).map(
            (
              review,
              i // can use index, because items in array won't be changed or deleted
            ) => (
              <Card key={i}>
                <CardHeader className='flex-row items-center justify-between'>
                  <p>{review.reviewerName}</p>
                  <p>{review.reviewerEmail}</p>
                </CardHeader>
                <CardBody>
                  <p>{review.comment}</p>
                </CardBody>
                <CardFooter className='flex-row items-center justify-between'>
                  <Rating
                    itemStyles={{
                      itemShapes: ThinStar,
                      activeFillColor: '#ffb700',
                      inactiveFillColor: '#fbf1a9',
                    }}
                    value={review.rating}
                    readOnly
                    className='max-w-[150px]'
                  />
                  <p>{new Date(review.date).toLocaleString()}</p>
                </CardFooter>
              </Card>
            )
          )}
        </article>

        <Divider className='lg:hidden' />
        <AddReview addReview={addReview} className='w-full' />
      </div>
    </main>
  );
}
