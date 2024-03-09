import './globals.css';
import { Inter } from 'next/font/google';

import AuthProvider from '@/context/AuthProvider';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import MenuProvider from '@/context/MenuContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'PMS',
  description: 'Inventory track',
  icons: [{ rel: 'icon', url: '/vercel.svg' }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <AuthProvider>
          <Toaster />
          <MenuProvider>{children}</MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
