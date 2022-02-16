import Link from "next/link"
import { useRouter } from "next/router"
import { UsersIcon } from "@heroicons/react/outline"
import { CodeIcon } from "@heroicons/react/solid"
import { useRecoilValue } from "recoil"
import { userState } from "../lib/atoms/userState"

const SideHeader = () => {
    return (
        <div className="flex h-20 justify-center mb-16 sticky text-gray-900 dark:text-white text-3xl top-0">
            CONKEYS
        </div>
    )
}

const SideItems = () => {
    const user = useRecoilValue(userState)
    const style = {
        title: `mx-4 text-sm`,
        section: `font-thin pl-5 text-white mb-6 uppercase lg:pl-6`,
        // active: `border-l-4 border-white lg:border-l-0 lg:border-r-4`,
        active: "border-b-2 border-gray-900 dark:border-white",
        link: `flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`,
    }

    const isUserLogged = (usr) => {
        if (usr?.isLogged) {
            return (
                <li>
                    <Link href="/users">
                        <a className={`${style.link}`}>
                            <span>
                                <UsersIcon className="h-6 w-6" />
                            </span>
                            <span className={style.title}>Users</span>
                        </a>
                    </Link>
                </li>
            )
        }
        return <></>
    }

    return (
        <ul className="md:pl-6 space-y-2">
            <li>
                {/* section keys */}
                <Link href="/">
                    <a className={`${style.link}`}>
                        <CodeIcon className="w-5 h-6" />
                        <span className="ml-3 font-medium">Keys</span>
                    </a>
                </Link>
            </li>

            {isUserLogged(user)}
        </ul>
    )
}

export default function Sidebar() {
    return (
        <aside className="h-screen top-0 lg:block lg:relative lg:w-64 px-3 py-4 overflow-y-auto rounded bg-gray-100 dark:bg-gray-800">
            <SideHeader />
            <SideItems />
        </aside>
    )
}
