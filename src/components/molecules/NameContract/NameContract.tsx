import React, { memo, useEffect, useState } from 'react';

import { B4HAlert } from '@/components/atoms';

export const B4HNameContract: React.FC<any> = memo(
  ({ ownerAddress, chainId }) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
      <>
        <div
          className={`
        w-full px-4 mx-auto mt-8 border-2
        shadow-lg
      dark:border-gray-600
        rounded-lg
        md:w-1/2 md:items-center md:justify-between md:px-6 lg:px-8
      `}
        >
          <B4HAlert />
          <div className="w-full mx-auto overflow-auto mb-8">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <tbody>
                <tr>
                  <td className="px-4 py-3 w-1/3">OWNER ADDRESS</td>
                  <td className="px-4 py-3 w-2/3">
                    {ownerAddress || 'Não logado'}
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-gray-200 dark:border-gray-600 px-4 py-3">
                    NETWORK
                  </td>
                  <td className="border-t-2 border-gray-200 dark:border-gray-600 px-4 py-3">
                    {chainId || 'Não logado'}
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-gray-200 dark:border-gray-600 px-4 py-3">
                    {/* DESCRICAO */}
                  </td>
                  <td className="border-t-2 border-gray-200 dark:border-gray-600 px-4 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
);
