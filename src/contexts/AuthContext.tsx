import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import Web3Modal from 'web3modal';

type AuthContextData = {
  account: string;
  chainId: number;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<number>(0);
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

  const signIn = useCallback(async function () {
    setLoading(true);
    const web3Modal =
      typeof window !== 'undefined' &&
      new Web3Modal({
        cacheProvider: true,
        providerOptions,
        theme: 'dark',
      });

    // @ts-ignore
    const provider = await web3Modal.connect();
    // walletconect
    if (provider?.accounts?.length) {
      await setAccount(provider?.accounts[0]);
      await setChainId(provider?.chainId);
    }
    // metamask
    else {
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      setAccount(await signer.getAddress());
      setChainId(await (await web3Provider.getNetwork()).chainId);
    }
  }, []);

  async function signOut() {
    const web3Modal =
      typeof window !== 'undefined' &&
      new Web3Modal({
        cacheProvider: true,
        providerOptions,
        theme: 'dark',
      });
    // @ts-ignore
    const provider = await web3Modal.connect();

    // @ts-ignore
    await web3Modal.clearCachedProvider();
    if (provider?.accounts?.length) {
      await provider.disconnect();
    }
    setAccount('');
    setChainId(0);
  }

  async function loadAccount() {
    const web3Modal =
      typeof window !== 'undefined' &&
      new Web3Modal({
        cacheProvider: true,
        providerOptions,
        theme: 'dark',
      });

    // @ts-ignore
    if (web3Modal.cachedProvider) {
      // @ts-ignore
      const provider = await web3Modal.connect();

      if (provider?.accounts?.length) {
        await setAccount(provider?.accounts[0]);
        await setChainId(provider?.chainId);
      } else {
        const web3Provider = new providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        setAccount(await signer.getAddress());
        setChainId(await (await web3Provider.getNetwork()).chainId);
      }
    }
  }

  useEffect(() => {
    loadAccount();
  }, [account]);

  return (
    <AuthContext.Provider
      value={{
        account,
        chainId,
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
