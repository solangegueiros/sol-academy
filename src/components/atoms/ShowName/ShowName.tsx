import React, { memo } from 'react';

export const B4HShowName: React.FC<any> = memo(({ name }) => {
  return name ? (
    <div className="flex items-center space-x-4 mt-10 mb-8 p-1">
      <span className="text-xl">{name}</span>
    </div>
  ) : (
    <div className="flex items-center space-x-4 rounded-sm bg-yellow-200 text-gray-700 mt-10 mb-8 p-1">
      <div className="flex items-center self-stretch justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-10 h-10"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <span>Name Contract has not been deployed</span>
    </div>
  );
});
