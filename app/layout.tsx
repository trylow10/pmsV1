import './globals.css';
import SideNav from '@/components/SideNav';
import HeaderItems from '@/components/HeaderItems';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'PMS',
  description: 'Inventory track',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
