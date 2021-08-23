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
          <title>Basement studio - Challenge</title>
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
