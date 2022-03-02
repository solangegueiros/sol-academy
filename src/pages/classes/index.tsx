import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { B4HHeader, B4HSidebar, B4HPostView } from '@/components/molecules';

const Classes: NextPage = () => {
  return (
    <div>
      <Head>
        <title>b4H Academy</title>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
      </Head>
      <B4HHeader />
      <main className="md:flex mt-8 max-w-screen-xl px-4 mx-auto">
        <B4HSidebar menuOpen={true} handleMenu={() => {}} />
        <B4HPostView />
      </main>
      <footer></footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Classes;
