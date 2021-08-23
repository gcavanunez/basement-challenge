import "../styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";

import footer from "@/assets/footer.svg";
import Head from "next/head";
import { GlobalProvider } from "@/context/GlobalState";
import Header from "@/components/Header";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider>
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <title>Basement studio - Challenge</title>
          <meta name="theme-color" content="#000000"></meta>
          <meta
            name="description"
            content="A man can’t have enough base­ment swag"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Basement studio - Challenge" />
          <meta
            name="twitter:description"
            content="A man can’t have enough base­ment swag"
          />
          <meta name="twitter:site" content="@gcavanunez" />
          <meta property="twitter:image" content="/open-graphql.jpg"></meta>
          <meta name="og:title" content="Basement studio - Challenge" />
          <meta
            name="og:description"
            content="A man can’t have enough base­ment swag"
          />
          <meta
            name="og:url"
            content="https://basement-challenge-one.vercel.app"
          />
          <meta name="og:site_name" content="Basement studio - Challenge" />
          <meta name="og:type" content="website" />
          <meta property="og:image" content="/open-graphql.jpg"></meta>
        </Head>
        <div className="min-h-screen">
          <Header />
          <main className="">
            <Component {...pageProps} />
          </main>
          <footer className="mt-14">
            <section className="max-w-screen-xl mx-auto lg:px-8 px-4 pb-4">
              <Image alt="Wear everday" src={footer} />
            </section>
          </footer>
        </div>
      </GlobalProvider>
    </>
  );
}
export default MyApp;
