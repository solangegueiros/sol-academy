import React, { memo } from 'react';

import { useRouter } from 'next/router';

import classes from '@/../content/classes.json';

import { B4HSidebarContent } from './SidebarContent';
import { MenuProps } from './types';

export const B4HSidebar: React.FC<any> = memo(({ menuOpen, handleMenu }) => {
  const router = useRouter();
  const currentLang = router.locale;

  return (
    <div className="mb-5">
      <button
        className="rounded-lg md:hidden focus:outline-none focus:shadow-outline float-right"
        onClick={() => handleMenu()}
      >
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
          {menuOpen === false && (
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"></path>
          )}
          {menuOpen === true && (
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
          )}
        </svg>
      </button>
      <div
        className={`md:flex flex-col w-full basis-1/4 ${
          menuOpen ? 'flex' : 'hidden'
        }`}
        data-cy="sidebarOption"
      >
        {classes.routes.map((menu: MenuProps, idx) => (
          <B4HSidebarContent key={idx} currentLang={currentLang} menu={menu} />
        ))}
      </div>
    </div>
  );
});
