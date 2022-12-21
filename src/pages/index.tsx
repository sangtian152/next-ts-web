import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import {wrapper} from '@/store'
import { login } from '@/store/slices/auth'
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  await store.dispatch(login())
  return {
    props: {}
  }
});

export default Home
