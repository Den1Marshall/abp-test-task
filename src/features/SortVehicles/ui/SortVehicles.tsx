'use client';
import { useAppDispatch, useAppSelector } from '@/app/ui';
import { sortByActions, SortBy } from '@/entities/VehicleList';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { FC } from 'react';
import { formatSortString } from '../lib/formatSortString';
import { SortIcon } from './SortIcon';
import { Variants } from 'framer-motion';

export const SortVehicles: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.sortByReducer.sortBy);

  const variants: Variants = {
    enter: {
      opacity: 1,
      transform: 'scale(1)',
      transition: { type: 'spring', duration: 0.5, bounce: 0.2 },
    },
    exit: {
      opacity: 0,
      transform: 'scale(0)',
    },
  };

  return (
    <Dropdown motionProps={{ variants }}>
      <DropdownTrigger>
        <Button
          aria-label={`Sort by: ${formatSortString(sortBy)}`}
          fullWidth
          variant='bordered'
          disableRipple
          className='min-w-[50%]'
        >
          <SortIcon />
          Sort
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectionMode='single'
        selectedKeys={new Set<SortBy>([sortBy])}
        onSelectionChange={(keys) => {
          if (keys.currentKey) {
            dispatch(sortByActions.setSortBy(keys.currentKey as SortBy));
          }
        }}
        aria-label='Sort vehicles by'
      >
        <DropdownItem key={'default'}>Default</DropdownItem>
        <DropdownItem key={'sortBy=price&order=asc'}>Price (asc)</DropdownItem>
        <DropdownItem key={'sortBy=price&order=desc'}>
          Price (desc)
        </DropdownItem>
        <DropdownItem key={'sortBy=rating&order=desc'}>Rating</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
