'use client';
import { VehicleReview } from '@/entities/VehicleList';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Rating, ThinStar } from '@smastrom/react-rating';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';

interface AddReviewProps {
  addReview: (review: VehicleReview) => void;
  className?: string;
}

interface Inputs {
  name: string;
  email: string;
  comment: string;
  rating: number;
}

export const AddReview: FC<AddReviewProps> = ({ addReview, className }) => {
  const userSchema: ZodType<Inputs> = z.object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(20, { message: 'Name can not be longer than 20 symbols' }),
    email: z.string().email(),
    comment: z
      .string()
      .min(1, { message: 'Comment is required' })
      .max(1000, { message: 'Comment can not be longer than 1000 symbols' }),
    rating: z.number().min(1, { message: 'Rating is required' }).max(5),
  });

  const { register, control, handleSubmit, setValue, reset, formState } =
    useForm<Inputs>({
      defaultValues: { name: '', email: '', comment: '', rating: 0 },
      resolver: zodResolver(userSchema),
    });

  const { errors, isDirty } = formState;

  const onSubmit: SubmitHandler<Inputs> = ({
    name,
    email,
    comment,
    rating,
  }) => {
    addReview({
      reviewerName: name,
      reviewerEmail: email,
      comment,
      rating,
      date: new Date().toString(),
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-3 ${className}`}
    >
      <Input
        label='Name'
        isClearable
        onClear={() => setValue('name', '')}
        isRequired
        isInvalid={errors.name !== undefined}
        errorMessage={errors.name?.message}
        {...register('name')}
      />
      <Input
        type='email'
        label='Email'
        isClearable
        onClear={() => setValue('email', '')}
        isRequired
        isInvalid={errors.email !== undefined}
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      <Textarea
        label='Comment'
        isRequired
        isInvalid={errors.comment !== undefined}
        errorMessage={errors.comment?.message}
        {...register('comment')}
      />
      <Controller
        name='rating'
        control={control}
        render={({ field }) => (
          <>
            <Rating
              itemStyles={{
                itemShapes: ThinStar,
                activeFillColor: '#ffb700',
                inactiveFillColor: '#fbf1a9',
              }}
              className='max-w-[150px]'
              {...field}
            />
            {errors.rating && (
              <p role='alert' className='text-danger'>
                {errors.rating.message}
              </p>
            )}
          </>
        )}
      />

      <Button color={isDirty ? 'primary' : undefined} type='submit'>
        Add review
      </Button>
    </form>
  );
};
