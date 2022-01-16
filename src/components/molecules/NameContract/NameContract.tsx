import React, { memo, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { MasterNameAbi, MasterNameAddress } from '@/contracts/MasterName';
import Web3 from 'web3';

import { B4HShowName } from '@/components/atoms';

export const B4HNameContract: React.FC<any> = memo(
  ({ ownerAddress, chainId }) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const [name, setName] = useState('');
    const { account } = useAuth();

    const provider =
      typeof window !== 'undefined' && window.web3.currentProvider;
    const web3 = new Web3(provider);
    // @ts-ignore
    const contract = new web3.eth.Contract(MasterNameAbi, MasterNameAddress);

    const VerifyMasterName = useCallback(async () => {
      await console.log(
        contract.methods
          .getNameByOwner(account)
          .call()
          .then((result: any) => {
            if (result) {
              setName(result);
            }
          })
          .catch(() => {
            setName('');
          })
      );
    }, [contract.methods, account]);

    useEffect(() => {
      setMounted(true);
      if (account) {
        VerifyMasterName();
      }
    }, [account]);

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
          <B4HShowName name={name} />
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
