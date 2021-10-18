import type { NextPage } from 'next'
import Head from 'next/head'

import {
  B4HHeader
} from '@/components'

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

export default Home
