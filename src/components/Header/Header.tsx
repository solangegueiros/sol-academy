import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import b4hvector from '@/../public/images/b4h_vector.svg';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';
/* import { useAuth } from '@/hooks/useAuth'; */

import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export const B4HHeader: React.FC = memo(() => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
/*   const { signIn } = useAuth(); */
  const [account, setAccount] = useState();

  useEffect(() => {
    setMounted(true);
  }, [])

  function handleMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleTheme() {
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark'){
      setTheme('light')
    }else{
      setTheme('dark')
    }
  }

  const changeLanguage = (e: any) => {
    const locale = e.target.value;
    router.push("/", "/", {locale});
  }

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
        chainId: 31,
        rpc: {
          31: 'https://public-node.testnet.rsk.co',
        },
      },
    },
  };

  const web3Modal = typeof window !== "undefined" && new Web3Modal({
    cacheProvider: false,
    providerOptions,
    theme: `${theme}`,
  });

  const provider = typeof window !== "undefined" && window.web3.currentProvider;

  async function signIn() {
    await web3Modal
      .connect()
      .then(res => {
        if (res?.accounts?.length > 0) {
          setAccount(res.accounts[0]);
        } else {
          web3.eth.getAccounts().then(res => {
            if (res?.length > 0) {
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
  };

  const web3 = new Web3(provider);

  useEffect(() => {
    web3.eth.getAccounts(async function (err, accounts) {
       if (err != null) {
        console.log(err);
      }
      if (accounts?.length > 0) {
        await setAccount(accounts[0]);
      }
    });
  }, [account, web3]);
  
  if (!mounted) return null;

  return(
    <header className={`min-h-screen`}>
      <nav className="antialiased">
        <div className="w-full">
          
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-end md:flex-row md:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center justify-between p-2 pr-8">
                <select defaultValue={locale} onChange={changeLanguage} className="inline-flex shadow-sm rounded-md">
                  <option value="en" className="bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 text-gray-900 dark:text-gray-200">
                      EN
                  </option>
                  <option value="es" className="bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 text-gray-900 dark:text-gray-200">
                      ES
                  </option>
                  <option value="pt" className="bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 text-gray-900 dark:text-gray-200">
                      PT
                  </option>
                </select> 
              </div>
              <div className="flex">
                <div onClick={() => handleTheme()} className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200">
                  <input type="checkbox" className={`toggle-checkbox absolute block w-6 h-6 rounded-full ${theme === 'dark' && "right-0 border-green-400"} bg-white border-4 appearance-none cursor-pointer`} />
                  <label className={`toggle-label block ${theme === 'dark' && "bg-green-400"} overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer`}></label>
                </div>
                <span className="">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <a href="/" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline">
                <Image
                  src={b4hvector}
                  width={55}
                  height={55}
                />
              </a>
              <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={() => handleMenu()} >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                  {menuOpen === false && 
                    <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"></path>
                  }
                  {menuOpen === true && 
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>    
                  }
                </svg>
              </button>
            </div>
            <nav className={`flex-col flex-grow ${menuOpen ? "flex" : "hidden"} pb-4 md:pb-0 md:flex md:justify-start md:flex-row`}>
              <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">{t`classes`}</a>
              <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">{t`profile`}</a> 
            </nav>
            <nav className={`flex-col flex-grow ${menuOpen ? "flex" : "hidden"} pb-4 md:pb-0 md:flex md:justify-end md:flex-row cursor-pointer`}>
              {account === undefined ? <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => signIn()}>Login</a>
              : 
              <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => {}}>Logado</a>
              
              }
            </nav>
          </div>

        </div>
      </nav>
    </header>
  )
})
