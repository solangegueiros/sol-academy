import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

type AuthContextData = {
  account: string;
  loading: boolean;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '9aa3d95b3bc440fa88ea12eaa4456161',
        chainId: 5,
        rpc: {
          5: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        },
      },
    },
  };

  const web3Modal =
    typeof window !== 'undefined' &&
    new Web3Modal({
      cacheProvider: true,
      providerOptions,
      theme: 'dark',
    });

  const provider =
    typeof window !== 'undefined' && window?.web3?.currentProvider;
  const web3 = new Web3(provider);

  const signIn = useCallback(async function () {
    setLoading(true);
    // @ts-ignore
    await web3Modal
      // @ts-ignore
      .connect()
      .then((res: any) => {
        if (res?.accounts?.length > 0) {
          setAccount(res.accounts[0]);
        } else {
          web3.eth.getAccounts().then(res => {
            if (res?.length > 0) {
              // @ts-ignore
              setAccount(res[0]);
            }
          });
        }
        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        setLoading(false);
      });
    return true;
  }, []);

  async function signOut() {
    setAccount('');
    // @ts-ignore
    await web3Modal.clearCachedProvider();
    setAccount('');
  }

  async function loadAccount() {
    // @ts-ignore
    if (web3Modal.cachedProvider) {
      web3.eth.getAccounts(async function (err, accounts) {
        if (err != null) {
          console.log(err);
        }
        if (accounts?.length > 0) {
          // @ts-ignore
          await setAccount(accounts[0]);
        }
      });
    }
  }

  useEffect(() => {
    loadAccount();
  }, [account, web3]);

  return (
    <AuthContext.Provider
      value={{
        account,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
