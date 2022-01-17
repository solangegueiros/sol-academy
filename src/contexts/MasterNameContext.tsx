import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { MasterNameAbi, MasterNameAddress } from '@/contracts/MasterName';
import Web3 from 'web3';

type MasterNameContextData = {
  name: string;
  haveMasterName: boolean;
  RegisterMasterName: (newAdress: any, newName: any) => Promise<void>;
  DeleteMasterName: () => Promise<void>;
};

type MasterNameProviderProps = {
  children: ReactNode;
};

export const MasterNameContext = createContext({} as MasterNameContextData);

function MasterNameProvider({ children }: MasterNameProviderProps) {
  const [name, setName] = useState('');
  const [haveMasterName, setHaveMasterName] = useState<boolean>(false);
  const { account, provider } = useAuth();

  const web3 = new Web3(provider);
  // @ts-ignore
  const contract = new web3.eth.Contract(MasterNameAbi, MasterNameAddress);

  const RegisterMasterName = useCallback(
    async (newAddress, newName) => {
      if (newAddress && newName && !haveMasterName) {
        await contract.methods
          .addName(newAddress, newName)
          .send({ from: account })
          .then(() => {
            setHaveMasterName(true);
            setName(newName);
          });
      }
    },
    [contract.methods, account, haveMasterName]
  );

  const DeleteMasterName = useCallback(async () => {
    if (haveMasterName) {
      await contract.methods
        .deleteName()
        .send({ from: account })
        .then(() => {
          setHaveMasterName(false);
          setName('');
        });
    }
  }, [contract.methods, account, haveMasterName]);

  const VerifyMasterName = useCallback(async () => {
    await contract.methods
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
      });
  }, [contract.methods, account]);

  useEffect(() => {
    if (account) {
      VerifyMasterName();
    } else {
      setHaveMasterName(false);
      setName('');
    }
  }, [account, VerifyMasterName]);

  return (
    <MasterNameContext.Provider
      value={{
        name,
        haveMasterName,
        RegisterMasterName,
        DeleteMasterName,
      }}
    >
      {children}
    </MasterNameContext.Provider>
  );
}

function useMasterName() {
  const context = useContext(MasterNameContext);

  return context;
}

export { MasterNameProvider, useMasterName };
