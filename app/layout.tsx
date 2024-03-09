import './globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
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
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <Toaster />
          <MenuProvider>{children}</MenuProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
