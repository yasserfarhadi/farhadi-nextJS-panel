import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Farhadi test task</title>
        <meta name="description" content="Created by yasser farhadi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1>Farhadi Test Task</h1>
        </div>
      </main>
    </>
  );
}
