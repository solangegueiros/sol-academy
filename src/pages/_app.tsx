import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import { AuthProvider, MasterNameProvider } from '@/contexts';

import seoOptions from '../../seo.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AuthProvider>
        <MasterNameProvider>
          <DefaultSeo {...seoOptions} />
          <Component {...pageProps} />
        </MasterNameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
