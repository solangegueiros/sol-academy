import React, { memo, useState } from 'react';

import { B4HAlertProps, ETypes } from './types';

export const B4HAlert: React.FC<B4HAlertProps> = memo(({ type, text }) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const textColor = ['text-yellow-500', 'text-red-500', 'text-green-500'];
  const bgColor = ['bg-yellow-500', 'bg-red-500', 'bg-green-500'];

  return showAlert ? (
    <div
      className="flex justify-center items-center self-center text-center bottom-7 fixed z-10 -left-0 w-full"
      role="alert"
    >
      <div className="p-2">
        <div
          className={`inline-flex items-center bg-white leading-none rounded-full p-2 shadow text-teal text-lg ${textColor[type]}`}
        >
          <span
            className={`inline-flex text-white rounded-full h-6 px-3 justify-center items-center ${bgColor[type]}`}
          >
            {ETypes[type]}
          </span>
          <span className="inline-flex px-2">{text}</span>
          <button
            type="button"
            onClick={() => {
              setShowAlert(false);
            }}
          >
            <span className="inline-flex px-2">×</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <> </>
  );
});
