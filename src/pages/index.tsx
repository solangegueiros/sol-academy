import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  B4HHeader
} from '@/components/molecules'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>b4H Academy</title>
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <B4HHeader />
      <main>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Home
