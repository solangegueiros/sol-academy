import React, { memo, useEffect, useState } from 'react';

import { B4HButton, B4HTextField } from '@/components/atoms';

export const B4HMasterName: React.FC = memo(() => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`
        w-full pt-5 px-4 mx-auto
        bg-gray-50 dark:bg-gray-600
        rounded-lg
        md:w-1/2 md:items-center md:justify-between md:px-6 lg:px-8
      `}
      >
        <div className="text-center mb-10">
          <h1 className="font-semibold text-xl">MasterName</h1>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <B4HTextField
              placeholder="Name"
              type="text"
              value={name}
              onChange={setName}
            />
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <B4HTextField
              placeholder="Address"
              type="text"
              value={address}
              onChange={setAddress}
            />
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-5">
            <B4HButton title="Set Name" />
          </div>
          <div className="w-1/2 px-3 mb-5">
            <B4HButton title="Delete Name" bgColor="red" />
          </div>
        </div>
      </div>
    </>
  );
});
