import React, { memo } from 'react';

import { B4HTextFieldProps } from './types';

export const B4HTextField: React.FC<B4HTextFieldProps> = memo(
  ({ placeholder, type, value, onChange }) => {
    return (
      <div className="flex">
        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
        </div>
        <input
          type={type}
          className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 outline-none focus:border-blue-800"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    );
  }
);
