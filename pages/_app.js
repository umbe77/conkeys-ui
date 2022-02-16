import "../styles/globals.css"

import Layout from "../components/_layout"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import LoginForm from "../components/loginform"

import { ThemeProvider } from "next-themes"

function ConkeysUiApp({ Component, pageProps }) {
    return (
        <>
            <ThemeProvider enableSystem={false} attribute="class">
                <Head>
                    <title>Conkyes Web UI</title>
                </Head>
                <div className="h-screen bg-white dark:bg-gray-900">
                    <RecoilRoot>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                        <LoginForm />
                    </RecoilRoot>
                </div>
            </ThemeProvider>
        </>
    )
}

export default ConkeysUiApp
