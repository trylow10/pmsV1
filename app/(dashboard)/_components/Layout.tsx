'use client';
import { useMenu } from '@/context/MenuContext';
import { cn } from '@/lib/utils';

function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useMenu();
  return (
    <div
      className={cn(
        'grid lg:h-screen lg:grid-cols-[16rem_1fr] lg:grid-rows-[auto_1fr]',
        isOpen && 'lg:grid-cols-[6rem_1fr]'
      )}
    >
      {children}
    </div>
  );
}

export default Layout;
