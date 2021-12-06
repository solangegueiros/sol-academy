import React, { memo } from 'react';

import { B4HButtonProps } from './types';

export const B4HButton: React.FC<B4HButtonProps> = memo(
  ({ title, bgColor }) => {
    return (
      <button
        className={`
          block w-full max-w-xs mx-auto 
          ${bgColor === 'red' ? 'bg-red-500' : 'bg-indigo-600'}
          ${bgColor === 'red' ? 'hover:bg-red-600' : 'hover:bg-indigo-700'}
          ${bgColor === 'red' ? 'focus:bg-red-600' : 'focus:bg-indigo-700'}
          text-white 
          rounded-lg px-3 py-3 font-semibold`}
      >
        {title}
      </button>
    );
  }
);
