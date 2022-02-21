import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { App, Users } from "./pages"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components"
import { RecoilRoot } from "recoil"
import LoginForm from "./components/loginform"

import "flowbite"

ReactDOM.render(
    <React.StrictMode>
        <div className="h-screen bg-white dark:bg-gray-900 transition duration-200">
            <RecoilRoot>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/users" element={<Users />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
                <LoginForm />
            </RecoilRoot>
        </div>
    </React.StrictMode>,
    document.getElementById("root")
)
