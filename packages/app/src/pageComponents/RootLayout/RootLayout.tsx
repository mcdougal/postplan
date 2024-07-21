import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

// eslint-disable-next-line import/extensions
import 'swiper/css';
import './globals.css';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

const title = `Postplan`;
const description = `Plan your Instagram posts in advance.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: Props): React.ReactElement => {
  return (
    <html lang="en">
      <head>
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />
      </head>
      <body className={inter.className}>
        <Toaster toastOptions={{ duration: 5000 }} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
