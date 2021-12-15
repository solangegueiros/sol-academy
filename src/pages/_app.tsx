import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
