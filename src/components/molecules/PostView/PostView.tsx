import React from 'react';

export const B4HPostView = ({ children, menuOpen }: any) => {
  return (
    <div className={`md:m-2 md:flex basis-3/4 ${menuOpen ? 'hidden' : ''}`}>
      <div className="md:px-8 flex-1 prose dark:prose-invert max-w-none break-words">
        {children}
      </div>
    </div>
  );
};
