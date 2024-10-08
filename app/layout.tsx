import type { Metadata, Viewport } from 'next';
import '@/app/index.css';
import '@smastrom/react-rating/style.css';
import { startupImage } from './startupImage';
import {
  AriaRouterProvider,
  FramerMotionConfig,
  StoreProvider,
} from '@/app/ui';
import { NextUIProvider } from '@nextui-org/react';

export const metadata: Metadata = {
  title: 'Car Showroom',
  description: 'Car Showroom',
  metadataBase: new URL('https://abp-test-task.vercel.app/'),
  robots: 'all',
  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title: 'Car Showroom',
    description: 'Car Showroom',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Car Showroom',
    description: 'Car Showroom',
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage,
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
      className='dark h-[max(calc(100%_+_env(safe-area-inset-top)),_100%)] font-sans touch-pan-x touch-pan-y motion-safe:scroll-smooth'
    >
      <body className='max-w-[1440px] mx-auto h-full py-safe px-safe-or-5 dark:bg-black dark:text-white'>
        <FramerMotionConfig>
          <AriaRouterProvider>
            <StoreProvider>
              <NextUIProvider className='w-full h-full'>
                {children}
              </NextUIProvider>
            </StoreProvider>
          </AriaRouterProvider>
        </FramerMotionConfig>
      </body>
    </html>
  );
}
