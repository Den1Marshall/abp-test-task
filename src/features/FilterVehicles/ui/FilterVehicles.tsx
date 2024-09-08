'use client';
import { useAppDispatch, useAppSelector } from '@/app/ui';
import {
  filterByActions,
  useGetAllVehiclesQuery,
  Vehicle,
} from '@/entities/VehicleList';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { Button, Checkbox, Input, Slider } from '@nextui-org/react';
import { Variants } from 'framer-motion';
import { FC, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { FilterIcon } from './FilterIcon';

export const FilterVehicles: FC = () => {
  const dispatch = useAppDispatch();

  const { filterBy, minPrice, maxPrice, inStock } = useAppSelector(
    (state) => state.filterByReducer
  );

  // For modal styling
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const lg = useMediaQuery('(min-width: 1024px)');

  const variants: Variants = {
    enter: {
      y: lg ? undefined : '0%',
      x: lg ? '0%' : undefined,
    },
    exit: {
      y: lg ? undefined : '50%',
      x: lg ? '-100%' : undefined,
    },
  };

  // Set default slider max value as price of the most expensive vehicle
  const { data } = useGetAllVehiclesQuery('default');

  const maxValue = useMemo(() => {
    if (data) {
      const vehiclesCopy: Vehicle[] = JSON.parse(JSON.stringify(data));
      return vehiclesCopy.sort((a, b) => b.price - a.price)[0].price + 0.01; // Because of slider step of 1000
    }
  }, [data]);

  useEffect(() => {
    if (maxValue) {
      dispatch(filterByActions.setMaxPrice({ maxPrice: maxValue + '' }));
    }
  }, [maxValue]);

  return (
    <>
      <Button disableRipple variant='bordered' fullWidth onPress={onOpen}>
        <FilterIcon /> Filter
      </Button>
      <Modal
        hideCloseButton={!lg}
        size='full'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          dragDirectionLock: true,
          variants,
          drag: !lg && 'y',
          dragConstraints: { top: -0 },
          dragElastic: 0.05,
          dragSnapToOrigin: true,
          dragTransition: { bounceStiffness: 500, bounceDamping: 50 },
          onDragEnd: (_e, info) => {
            if (
              info.offset.y >= window.innerHeight / 4 ||
              info.velocity.y >= 250
            ) {
              onClose();
            }
          },
        }}
        classNames={{
          base: 'max-lg:max-h-[50%]',
          wrapper: 'lg:max-w-[25%]',
          body: 'gap-5',
        }}
      >
        <ModalContent>
          <ModalHeader>Filters</ModalHeader>
          <ModalBody>
            <Input
              label='Enter any parameters'
              isClearable
              onClear={() =>
                dispatch(filterByActions.setFilterBy({ filterBy: '' }))
              }
              value={filterBy}
              onChange={(e) => {
                dispatch(
                  filterByActions.setFilterBy({
                    filterBy: e.target.value,
                  })
                );
              }}
            />
            <Slider
              label='Price Range'
              step={1000}
              minValue={0}
              maxValue={maxValue}
              value={[+minPrice, +maxPrice]}
              onChange={(value) => {
                if (typeof value === 'object') {
                  dispatch(
                    filterByActions.setMinPrice({ minPrice: value[0] + '' })
                  );

                  dispatch(
                    filterByActions.setMaxPrice({ maxPrice: value[1] + '' })
                  );
                }
              }}
              formatOptions={{ style: 'currency', currency: 'USD' }}
            />
            <Checkbox
              isSelected={inStock}
              onValueChange={(inStock) =>
                dispatch(filterByActions.setInStock({ inStock }))
              }
            >
              In stock
            </Checkbox>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
