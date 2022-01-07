import React, { memo, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import NextLink from 'next/link';

import b4hvector from '@/../public/images/b4h_vector.svg';
/* import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import Web3Modal from 'web3modal'; */
import { useAuth } from '@/contexts/AuthContext';

import { ellipseAddress } from '@/utils';

import { B4HButtonLanguage, B4HSwitchTheme } from '@/components/atoms';

export const B4HHeader: React.FC = memo(() => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { t } = useTranslation('common');
  /* const [account, setAccount] = useState<string>(); */
  const { account, signIn, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleMenu() {
    setMenuOpen(!menuOpen);
  }

  /* const providerOptions = {
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
    typeof window !== '''' &&
    new Web3Modal({
      cacheProvider: false,
      providerOptions,
      theme: 'dark',
    });

  const provider =
    typeof window !== '''' && window?.web3?.currentProvider;
  const web3 = new Web3(provider); */

  /* async function signIn() {
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
        console.log('erro');
        return false;
      });
    return true;
  } */

  /* useEffect(() => {
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
  }, [account, web3]); */

  /* async function signOut() {
    // @ts-ignore
    await web3Modal.clearCachedProvider();
    setAccount('');
  } */

  if (!mounted) return null;

  return (
    <header className="bg-gray-200 dark:bg-gray-800">
      <nav className="antialiased">
        <div className="w-full">
          <div className="bg-gray-100 dark:bg-gray-700">
            <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-end md:flex-row md:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <B4HButtonLanguage />
                <B4HSwitchTheme />
              </div>
            </div>
          </div>
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <NextLink href="/" passHref>
                <a className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline cursor-pointer">
                  <Image src={b4hvector} width={55} height={55} />
                </a>
              </NextLink>
              <button
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                onClick={() => handleMenu()}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  {menuOpen === false && (
                    <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"></path>
                  )}
                  {menuOpen === true && (
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                  )}
                </svg>
              </button>
            </div>
            <nav
              className={`flex-col flex-grow ${
                menuOpen ? 'flex' : 'hidden'
              } pb-4 md:pb-0 md:flex md:justify-start md:flex-row`}
            >
              <NextLink href="/classes" passHref>
                <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  {t`classes`}
                </a>
              </NextLink>
              {account && (
                <NextLink href="/profile" passHref>
                  <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    {t`profile`}
                  </a>
                </NextLink>
              )}
            </nav>
            <nav
              className={`flex-col flex-grow ${
                menuOpen ? 'flex' : 'hidden'
              } pb-4 md:pb-0 md:flex md:justify-end md:flex-row cursor-pointer`}
            >
              {!account ? (
                <a
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => signIn()}
                >
                  Login
                </a>
              ) : (
                <>
                  <a
                    className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      navigator.clipboard.writeText(account);
                    }}
                  >
                    {ellipseAddress(account)}
                  </a>
                  <a
                    className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    onClick={() => signOut()}
                  >
                    <i className="far fa-sign-out text-lg"></i>
                  </a>
                </>
              )}
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
});
