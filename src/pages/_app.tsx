import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import { AuthProvider, MasterNameProvider } from '@/contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AuthProvider>
        <MasterNameProvider>
          <Component {...pageProps} />
        </MasterNameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
