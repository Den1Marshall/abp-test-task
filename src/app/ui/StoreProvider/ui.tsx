'use client';
import { FC, PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './model/store';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
