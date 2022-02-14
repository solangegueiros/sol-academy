import React from 'react';

export const B4HPostView = ({ children }: any) => {
  return (
    <div className="m-2 flex" style={{ flexBasis: '75%' }}>
      <div className="px-8 flex-1">{children}</div>
    </div>
  );
};
