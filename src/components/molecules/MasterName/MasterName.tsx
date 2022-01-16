import React, { memo, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { MasterNameAbi, MasterNameAddress } from '@/contracts/MasterName';
import Web3 from 'web3';

import { B4HButton, B4HTextField } from '@/components/atoms';

export const B4HMasterName: React.FC = memo(() => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const { account, providerContext } = useAuth();
  const [haveMasterName, setHaveMasterName] = useState<boolean>(false);

  const provider = typeof window !== 'undefined' && window.web3.currentProvider;
  const web3 = new Web3(provider);
  // @ts-ignore
  const contract = new web3.eth.Contract(MasterNameAbi, MasterNameAddress);

  const RegisterMasterName = useCallback(() => {
    if (address && name && !haveMasterName) {
      contract.methods.addName(address, name).send({ from: account });
    }
  }, [contract.methods, name, address, account, haveMasterName]);

  const DeleteMasterName = useCallback(async () => {
    if (haveMasterName) {
      await contract.methods.deleteName().send({ from: account });
    }
  }, [contract.methods, account, haveMasterName]);

  const VerifyMasterName = useCallback(async () => {
    await console.log(
      contract.methods
        .getNameByOwner(account)
        .call()
        .then((result: any) => {
          if (result) {
            setHaveMasterName(true);
            setName(result);
          }
        })
        .catch(() => {
          setHaveMasterName(false);
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
        w-full pt-5 px-4 mx-auto mt-8 border-2
        shadow-lg
        dark:border-gray-600
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
            <B4HButton title="Set Name" onClick={RegisterMasterName} />
          </div>
          <div className="w-1/2 px-3 mb-5">
            <B4HButton
              title="Delete Name"
              bgColor="red"
              onClick={DeleteMasterName}
            />
          </div>
        </div>
      </div>
    </>
  );
});
