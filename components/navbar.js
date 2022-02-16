import {
    LoginIcon,
    SearchIcon,
    SunIcon,
    MoonIcon,
} from "@heroicons/react/outline"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { signInModalState } from "../lib/atoms/signInModalState"
import { userState } from "../lib/atoms/userState"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

const ThemeIcon = ({ theme }) => {
    const style = "w-7 h-7"
    console.log(theme)
    if (theme === "dark") {
        console.log("sun")
        return <SunIcon className={style} />
    }
    return <MoonIcon className={style} />
}

export default function Navbar() {
    const user = useRecoilValue(userState)
    const setSignInOpen = useSetRecoilState(signInModalState)
    const { theme, setTheme } = useTheme()
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    return (
        <nav className="bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="justify-between items-center w-full md:flex md:w-auto">
                    <div className="hidden relative mr-3 md:mr-0 md:block">
                        <div className="flex absolute text-gray-500 dark:text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            {/* <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg> */}
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
                    {isMounted && (
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
                    )}
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
                            <button className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                <div className="w-12 h-12 inline-flex items-center justify-center font-bold rounded-full bg-indigo-200 text-gray-800">
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
    )
    // return (
    //     // <nav className="bg-[#0e141b] h-20 items-center relative z-10">
    //     <nav className="h-20 items-center relative z-10">
    //         <div className="flex flex-center flex-col h-full justify-center mx-auto px-3 relative">
    //             <div className="flex items-center pl-1 relative w-full sm:pr-2 sm:ml-0 lg:max-w-68">
    //                 <div className="container flex left-0 relative w-3/4">
    //                     <div className="flex group h-full items-center relative w-12">
    //                         <button
    //                             type="button"
    //                             aria-expanded="false"
    //                             aria-label="Toggle sidenav"
    //                             className="text-4xl text-white focus:outline-none lg:hidden"
    //                         >
    //                             &#8801;
    //                         </button>
    //                     </div>
    //                     <div className="flex group h-full items-center relative w-full lg:w-64">
    //                         <div className="absolute block cursor-pointer h-10 items-center justify-center p-3 pr-2 text-gray-500 text-sm uppercase w-auto sm:hidden">
    //                             <svg
    //                                 fill="none"
    //                                 className="h-5 relative w-5"
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth="2"
    //                                 stroke="currentColor"
    //                                 viewBox="0 0 24 24"
    //                             >
    //                                 <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    //                             </svg>
    //                         </div>
    //                         <svg
    //                             className="absolute fill-current h-4 hidden left-0 ml-4 pointer-events-none text-gray-500 w-4 group-hover:text-gray-400 sm:block"
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             viewBox="0 0 20 20"
    //                         >
    //                             <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
    //                         </svg>
    //                         <input
    //                             type="text"
    //                             className="bg-gray-100 block leading-normal pl-10 pr-4 py-1.5 ring-opacity-90 rounded-2xl text-gray-400 w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                             placeholder="Search"
    //                         />
    //                         <div className="absolute border border-gray-300 hidden h-auto mr-2 px-2 py-1 right-0 rounded-2xl text-gray-400 text-xs md:block">
    //                             <ChevronDownIcon className="h-4 w-4 text-gray-800" />
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex items-center justify-end ml-5 p-1 relative w-1/4 sm:mr-0 sm:right-auto">
    //                     {!user.isLogged && (
    //                         <div className="space-x-2">
    //                             <button
    //                                 className="inline-flex space-x-2 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
    //                                 onClick={() => setSignInOpen(true)}
    //                             >
    //                                 <LoginIcon className="h-6 w-6" />
    //                                 <span>Sign In</span>
    //                             </button>
    //                         </div>
    //                     )}
    //                     {user.isLogged && (
    //                         <div>
    //                             <div className="w-12 h-12 inline-flex items-center justify-center font-bold rounded-full bg-indigo-200 text-gray-800">
    //                                 <span>
    //                                     {user?.name[0]?.toUpperCase()}
    //                                     {user?.lastName[0]?.toUpperCase()}
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //     </nav>
    // )
}
