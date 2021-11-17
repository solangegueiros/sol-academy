import React, { memo } from 'react';

import { useTheme } from 'next-themes';

export const B4HSwitchTheme: React.FC = memo(() => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  function handleTheme() {
    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <div className="flex">
      <div
        onClick={() => handleTheme()}
        className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200"
      >
        <input
          type="checkbox"
          className={`toggle-checkbox absolute block w-6 h-6 rounded-full ${
            currentTheme === 'dark' && 'right-0 border-green-400'
          }
            bg-white border-4 appearance-none cursor-pointer`}
        />
        <label
          className={`toggle-label block ${
            currentTheme === 'dark' && 'bg-green-400'
          } overflow-hidden h-6 rounded-full ${
            currentTheme === 'dark' ? 'bg-green-400' : 'bg-gray-300'
          } cursor-pointer`}
        ></label>
      </div>
      <span className="">
        <svg
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </span>
    </div>
  );
});
