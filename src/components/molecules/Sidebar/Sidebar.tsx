import React, { memo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import classes from '@/../content/classes.json';

import { menu, submenu } from './types';

export const B4HSidebar: React.FC = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const currentLang = router.locale;

  const handleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const renderMenuItems = useCallback(
    () =>
      classes.routes.map((menu: menu, idx) => {
        return (
          <div key={idx}>
            <button
              className="flex items-center justify-between w-full px-6 py-2  focus:outline-none"
              onClick={() => handleMenu()}
            >
              <span className="flex items-center">
                <span className="mx-4 font-medium">
                  {currentLang === 'en'
                    ? menu.title.en
                    : currentLang === 'es'
                    ? menu.title.es
                    : menu.title.pt}
                </span>
              </span>
              <span>
                <svg
                  className={`w-4 h-4 transition-transform transform ${
                    menuOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuOpen && (
                    <path
                      d="M19 9l-7 7-7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  )}
                  {!menuOpen && (
                    <path
                      d="M19 9l-7 7-7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  )}
                </svg>
              </span>
            </button>
            {menuOpen && (
              <div>
                {menu.routes.map((submenu: submenu) => {
                  return (
                    <a
                      key={submenu.path}
                      className="block px-16 py-2 text-sm hover:bg-green-500 rounded-lg"
                      href="#"
                    >
                      {submenu.title.en}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        );
      }),
    [handleMenu, menuOpen]
  );

  return (
    <div className="max-w-xs">
      {renderMenuItems()}
      {/* <button
        className="flex items-center justify-between w-full px-6 py-2  focus:outline-none"
        onClick={() => handleMenu()}
      >
        <span className="flex items-center">
          <span className="mx-4 font-medium">Sub links</span>
        </span>
        <span>
          <svg
            className={`w-4 h-4 transition-transform transform ${
              menuOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen && (
              <path
                d="M19 9l-7 7-7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            )}
            {!menuOpen && (
              <path
                d="M19 9l-7 7-7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            )}
          </svg>
        </span>
      </button>
      {menuOpen && (
        <div>
          <a
            className="block px-16 py-2 text-sm hover:bg-green-500 rounded-lg"
            href="#"
          >
            Manage Accounts
          </a>
        </div>
      )} */}
    </div>
  );
});
