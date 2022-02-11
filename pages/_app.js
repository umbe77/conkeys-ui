import "../styles/globals.css"

import Layout from "../components/_layout"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import LoginForm from "../components/loginform"

function ConkeysUiApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Conkyes Web UI</title>
            </Head>
            <div className="h-screen bg-[#0e141b] text-white">
                <RecoilRoot>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <LoginForm />
                </RecoilRoot>
            </div>
        </>
    )
}

export default ConkeysUiApp
