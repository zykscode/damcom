import localFont from 'next/font/local';

const Atyp = localFont({
  src: [
    {
      path: '../assets/fonts/atyp/AtypDisplay-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/atyp/AtypDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/atyp/AtypDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/atyp/AtypDisplay-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/atyp/AtypDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-atyp',
});

const Suisse = localFont({
  src: [
    {
      path: '../assets/fonts/suisse/SuisseIntl-Black.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/suisse/SuisseIntl-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/suisse/SuisseIntl-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/suisse/SuisseIntl-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/suisse/SuisseIntl-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/suisse/SuisseIntl-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/suisse/SuisseIntl-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/suisse/SuisseIntl-Ultralight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/suisse/SuisseIntl-Book.woff2',
      weight: '350',
      style: 'normal',
    },
  ],
  variable: '--font-suisse',
});

export { Atyp, Suisse };
