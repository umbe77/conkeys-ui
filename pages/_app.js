import "../styles/globals.css";

import Layout from "../components/_layout";
import Head from "next/head";

function ConkeysUiApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Conkyes Web UI</title>
      </Head>
      <div className="h-screen bg-[#0e141b] text-white">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}

export default ConkeysUiApp;
