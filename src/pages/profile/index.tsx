import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import {
  B4HHeader,
  B4HMasterName,
  B4HNameContract,
} from '@/components/molecules';

const Profile: NextPage = () => {
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
      <main>
        <B4HNameContract
          ownerAddress={'0x6585d1ba166aeBF1e6A88f816e3024BF324D21ad'}
        />
        <B4HMasterName />
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

export default Profile;
