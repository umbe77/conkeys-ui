import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { signInModalState } from "../lib/atoms/signInModalState"
import { userState } from "../lib/atoms/userState"

export default function LoginForm() {
    const [signInOpen, setSignInOpen] = useRecoilState(signInModalState)
    const setUser = useSetRecoilState(userState)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async (e) => {
        e.preventDefault()
        const usr = await fetch("/api/token", {
            method: "POST",
            body: JSON.stringify({
                userName,
                password,
            }),
        }).then((resp) => resp.json())
        setUser(usr)
        setSignInOpen(false)
    }

    if (signInOpen) {
        return (
            <div
                className="absolute inset-0 flex -top-96 items-center justify-center bg-gray-700 bg-opacity-50 z-50"
                onClick={() => setSignInOpen(false)}
            >
                <div
                    className="flex flex-col w-full p-20 m-8 bg-white text-gray-800 rounded-md lg:m-0 lg:w-1/4 sm:p-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                        <p className="text-sm">
                            Sign in to access your account
                        </p>
                    </div>
                    <form onSubmit={signIn}>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="block mb-2 text-sm"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    name="userName"
                                    placeholder="Username"
                                    className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label
                                        htmlFor="password"
                                        className="text-sm"
                                    >
                                        Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    name="password"
                                    placeholder="Password"
                                    className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                />
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex gap-x-2">
                                <button
                                    type="submit"
                                    className="w-full px-8 py-3 text-blue-100 bg-gray-600 rounded-md"
                                >
                                    Sign in
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-8 py-3 text-blue-600 border border-blue-600 rounded-md"
                                    onClick={() => setSignInOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return <></>
}
