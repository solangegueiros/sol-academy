import React, { memo } from 'react';

import { useRouter } from 'next/router';

import classes from '@/../content/classes.json';

import { B4HSidebarContent } from './SidebarContent';
import { MenuProps } from './types';

export const B4HSidebar: React.FC = memo(() => {
  const router = useRouter();
  const currentLang = router.locale;

  return (
    <div className="flex flex-col w-full basis-1/4">
      {classes.routes.map((menu: MenuProps, idx) => (
        <B4HSidebarContent key={idx} currentLang={currentLang} menu={menu} />
      ))}
    </div>
  );
});
