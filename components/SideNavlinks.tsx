'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { HomeIcon, SettingsIcon, SheetIcon } from './icons';
import { cn } from '@/lib/utils';
import { useMenu } from '@/context/MenuContext';

const links = [
  {
    href: '/',
    label: 'Home',
    icon: <HomeIcon />,
  },
  {
    href: '/create-sheet',
    label: 'Create Sheet',
    icon: <SheetIcon />,
  },
  {
    href: '/view-bundles',
    label: 'View Bundles',
    icon: <SettingsIcon />,
  },
];

function SideNavlinks() {
  const { isOpen } = useMenu();
  const pathName = usePathname();

  return (
    <ul className="mt-20">
      {links.map((link) => {
        const isActive = pathName === link.href;

        return (
          <li
            key={link.href}
            className={cn(
              'mb-3 p-2 text-nowrap',
              isActive && 'rounded border-l-2 bg-white p-2',
              isOpen && 'w-fit'
            )}
          >
            <Link href={link.href} className={cn(isActive ? 'text-black' : '')}>
              <div className="flex items-center gap-3">
                {/* for menu close */}
                {!isOpen && <span>{link.icon}</span>}
                {!isOpen && <span>{link.label}</span>}

                {isOpen && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger> {link.icon}</TooltipTrigger>
                      <TooltipContent side="right">{link.label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default SideNavlinks;
