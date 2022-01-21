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
  provider: any;
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
  const [provider, setProvider] = useState<any>();
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
    await web3Modal.clearCachedProvider();
    // @ts-ignore
    const web3modalProvider = await web3Modal.connect();
    // walletconect
    if (web3modalProvider?.accounts?.length) {
      await setAccount(web3modalProvider?.accounts[0]);
      await setChainId(web3modalProvider?.chainId);
      setProvider(web3modalProvider);
    }
    // metamask
    else {
      const web3Provider = new providers.Web3Provider(web3modalProvider);
      const signer = web3Provider.getSigner();
      setAccount(await signer.getAddress());
      setChainId(await (await web3Provider.getNetwork()).chainId);
      setProvider(window.web3.currentProvider);
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
    const web3modalProvider = await web3Modal.connect();

    // @ts-ignore
    await web3Modal.clearCachedProvider();
    if (web3modalProvider?.accounts?.length) {
      await web3modalProvider.disconnect();
    }
    setAccount('');
    setChainId(0);
    setProvider('');
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
      const web3modalProvider = await web3Modal.connect();

      if (web3modalProvider?.accounts?.length) {
        await setAccount(web3modalProvider?.accounts[0]);
        await setChainId(web3modalProvider?.chainId);
        setProvider(web3modalProvider);
      } else {
        const web3Provider = new providers.Web3Provider(web3modalProvider);
        const signer = web3Provider.getSigner();
        setAccount(await signer.getAddress());
        setChainId(await (await web3Provider.getNetwork()).chainId);
        setProvider(window.web3.currentProvider);
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
        provider,
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
