import { useForm } from "react-hook-form"
import { useRecoilState, useSetRecoilState } from "recoil"
import { signInModalState, userState } from "../atoms"
import { login } from "../lib/conkeys"

export default function LoginForm() {
    const setUser = useSetRecoilState(userState)
    const [signInOpen, setSignInOpen] = useRecoilState(signInModalState)

    const { register, handleSubmit } = useForm()

    const onSubmit = async ({ userName, password }) => {
        const usr = await login(userName, password)
        if (usr.isLogged) {
            setUser(usr)
            setSignInOpen(false)
            return
        }
        alert(usr.error)
    }

    if (signInOpen) {
        return (
            <div
                className="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0
				bg-black bg-opacity-50"
                onClick={() => setSignInOpen(false)}
            >
                <div className="relative px-4 w-full max-w-md h-full md:h-auto">
                    <div
                        className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                onClick={() => setSignInOpen(false)}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <form
                            className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Sign in to our platform
                            </h3>
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    autoFocus
                                    name="userName"
                                    {...register("userName", {
                                        required: true,
                                    })}
                                    placeholder="Username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                    placeholder="Password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return <></>
}
