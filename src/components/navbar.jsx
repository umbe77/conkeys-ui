import {
    LoginIcon,
    SearchIcon,
    SunIcon,
    MoonIcon,
} from "@heroicons/react/outline"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { signInModalState, userState } from "../atoms"
import { useDarkMode } from "../hooks"

const ThemeIcon = ({ theme }) => {
    const style = "w-7 h-7"
    if (theme === "dark") {
        return <SunIcon className={style} />
    }
    return <MoonIcon className={style} />
}

export default function Navbar() {
    const user = useRecoilValue(userState)
    const setSignInOpen = useSetRecoilState(signInModalState)
    const [theme, setTheme] = useDarkMode()
    return (
        <>
            <nav className="transition duration-200 bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <div className="justify-between items-center w-full md:flex md:w-auto">
                        <div className="hidden relative mr-3 md:mr-0 md:block">
                            <div className="flex absolute text-gray-500 dark:text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <SearchIcon className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                id="email-adress-icon"
                                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                    <div className="flex w-1/4 items-center justify-end">
                        <div className="mr-5">
                            <button
                                type="button"
                                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                                onClick={() =>
                                    setTheme(
                                        theme === "dark" ? "light" : "dark"
                                    )
                                }
                            >
                                <ThemeIcon theme={theme} />
                            </button>
                        </div>
                        {!user.isLogged && (
                            <div className="space-x-2">
                                <button
                                    type="button"
                                    className="inline-flex justify-center items-center space-x-2 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                                    onClick={() => setSignInOpen(true)}
                                >
                                    <LoginIcon className="h-5 w-5" />
                                    <span>Sign In</span>
                                </button>
                            </div>
                        )}
                        {user.isLogged && (
                            <div>
                                <button className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-purple-400 dark:focus:ring-purple-600">
                                    <div className="w-12 h-12 inline-flex items-center justify-center font-bold rounded-full border-purple-400 border-2 dark:border-purple-600 bg-purple-300  dark:bg-purple-500 text-gray-800">
                                        <span>
                                            {user?.name[0]?.toUpperCase()}
                                            {user?.lastName[0]?.toUpperCase()}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}
