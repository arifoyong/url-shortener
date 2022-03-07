import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my initial page
        </h1>



        <div className={styles.grid}>
          <Link href="/test" >
            <a className={styles.card}>
              <h2>Test</h2>
              <p>This is really just a test page to give my initial frontend a link</p>
            </a>
          </Link>
        </div>
      </main>

    </div>
  )
}
