import React, { memo, useCallback, useState } from 'react';

import { SubmenuProps, ContentProps } from './types';

export const B4HSidebarContent: React.FC<ContentProps> = memo(
  ({ currentLang, menu }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = useCallback(() => {
      setMenuOpen(!menuOpen);
    }, [menuOpen]);

    const renderMenuItems = useCallback(() => {
      return (
        <div>
          <button
            className="flex items-center justify-between text-left w-full px-6 py-2  focus:outline-none"
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
              {menu.routes.map((submenu: SubmenuProps) => {
                return (
                  <a
                    key={submenu.path}
                    className="block px-16 py-2 text-sm hover:bg-green-500 rounded-lg"
                    href={submenu.path}
                  >
                    {currentLang === 'en'
                      ? submenu.title.en
                      : currentLang === 'es'
                      ? submenu.title.es
                      : submenu.title.pt}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      );
    }, [handleMenu, menuOpen, currentLang, menu]);

    return renderMenuItems();
  }
);
