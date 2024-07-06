import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Instaplan`,
  description: `Instaplan`,
  openGraph: {
    title: `Instaplan`,
    description: `Instaplan`,
  },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: Props): React.ReactElement => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster toastOptions={{ duration: 5000 }} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
