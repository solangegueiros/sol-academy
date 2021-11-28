import React, { memo } from 'react';

import { B4HButtonProps } from './types';

export const B4HButton: React.FC<B4HButtonProps> = memo(
  ({ title, bgColor }) => {
    return (
      <button
        className={`
          block w-full max-w-xs mx-auto 
          ${bgColor === 'red' ? 'bg-red-700' : 'bg-blue-700'}
          ${bgColor === 'red' ? 'hover:bg-red-800' : 'hover:bg-blue-800'}
          ${bgColor === 'red' ? 'focus:bg-red-800' : 'focus:bg-blue-800'}
          text-white 
          rounded-lg px-3 py-3 font-semibold`}
      >
        {title}
      </button>
    );
  }
);
