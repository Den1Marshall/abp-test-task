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
import { formatSortString } from './lib/formatSortString';

export const SortVehicles: FC = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.sortByReducer.sortBy);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button fullWidth variant='bordered' disableRipple className='min-h-10'>
          Sort by: {formatSortString(sortBy)}
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
