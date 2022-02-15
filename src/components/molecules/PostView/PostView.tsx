import React from 'react';

export const B4HPostView = ({ children }: any) => {
  return (
    <div className="m-2 flex basis-3/4">
      <div className="px-8 flex-1 prose dark:prose-invert">{children}</div>
    </div>
  );
};
