import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'

import '../styles/globals.css';
import Head from 'next/head';
import { HomeLayout } from '@/components';

export default function App({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/logo-180x180.png" />
        <link rel="icon" href="/logo-180x180.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#18181b" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://cg-netflix-clone.vercel.app" />
        <meta name="description" content="This a clone of the Netflix website built for educational purposes only." />
        <title>CGFlix Clone</title>
      </Head>
      <SessionProvider session={session}>
        <HomeLayout>
          <Component {...pageProps} />
        </HomeLayout>
      </SessionProvider>
    </>
  )
}
