import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

// eslint-disable-next-line import/extensions
import 'swiper/css';
import './globals.css';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Postplan`,
  description: `Postplan`,
  openGraph: {
    title: `Postplan`,
    description: `Postplan`,
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
