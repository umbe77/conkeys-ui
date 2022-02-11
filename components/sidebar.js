import Link from "next/link"
import { useRouter } from "next/router"
import { CodeIcon, UsersIcon } from "@heroicons/react/outline"
import css from "./sidebar.module.css"
import { useRecoilValue } from "recoil"
import { userState } from "../lib/atoms/userState"

const SideHeader = () => {
    return (
        <div className="bg-[#0e141b] flex h-20 items-center justify-center mb-16 sticky text-white text-3xl top-0">
            CONKEYS
        </div>
    )
}

const SideItems = () => {
    const user = useRecoilValue(userState)
    const { asPath } = useRouter()
    const style = {
        title: `mx-4 text-sm`,
        section: `font-thin pl-5 text-white mb-6 uppercase lg:pl-6`,
        active: `border-l-4 border-white lg:border-l-0 lg:border-r-4`,
        link: `flex items-center text-gray-200 justify-start my-9 px-3 w-full hover:text-white`,
    }

    const isUserLogged = (usr) => {
        if (usr?.isLogged) {
            return (
                <Link href="/users">
                    <a
                        className={`${style.link}
                    ${"/users" === asPath ? style.active : ""}`}
                    >
                        <span>
                            <UsersIcon className="h-6 w-6" />
                        </span>
                        <span className={style.title}>Users</span>
                    </a>
                </Link>
            )
        }
        return <></>
    }

    return (
        <ul className="md:pl-6">
            <li>
                {/* section keys */}
                <div className="mb-12">
                    <div className={style.section}>APPLICATION</div>
                    <Link href="/">
                        <a
                            className={`${style.link}
                    ${"/" === asPath ? style.active : ""}`}
                        >
                            <span>
                                <CodeIcon className="h-6 w-6" />
                            </span>
                            <span className={style.title}>Keys</span>
                        </a>
                    </Link>
                </div>
                {isUserLogged(user)}
            </li>
        </ul>
    )
}

export default function Sidebar() {
    const style = {
        mobilePosition: {
            left: "left-0",
            right: "right-0",
        },
        close: `hidden`,
        container: `pb-32 lg:pb-6`,
        open: `w-8/12 absolute z-40 sm:w-5/12`,
        default: `bg-[#0e141b] h-screen overflow-y-auto top-0 lg:block lg:relative lg:w-64 lg:z-auto`,
    }
    return (
        <aside
            className={`${style.default} ${style.mobilePosition.left} 
       ${style.open ? style.open : style.close} ${css.scrollbar}`}
        >
            <SideHeader />
            <SideItems />
        </aside>
    )
}
