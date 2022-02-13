import { userState } from "../lib/atoms/userState"
import { useRecoilValue } from "recoil"
import { At, Calendar, Hash, Checkbox, Key } from "tabler-icons-react"
import { useRouter } from "next/router"

const ConfKeyType = ({ type }) => {
    switch (type) {
        case 0:
            return <Hash className="h-6 w-6" />
        case 1:
            // return <Variable className="h-6 w-6" />
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"
                    viewBox="0 0 12 12"
                    className="h-5 w-5"
                >
                    <ellipse
                        cx="7"
                        cy="6.5"
                        fill="none"
                        stroke="currentColor"
                        rx="3.5"
                        ry="5"
                    />
                    <circle cx="2" cy="11" r="1" fill="currentColor" />
                </svg>
            )
        case 2:
            return <At className="h-6 w-6" />
        case 3:
            return <Calendar className="h-6 w-6" />
        case 4:
            return <Checkbox className="h-6 w-6" />
        case 5:
            return <Key className="h-6 w-6" />
    }
}

const KeyCard = ({ item }) => {
    const { key, T, V } = item
    const user = useRecoilValue(userState)
    const { push } = useRouter()
    const goToKey = (e) => {
        if (!user.isLogged) {
            e.preventDefault()
            return
        }
        push(`/key/${encodeURIComponent(key)}`)
    }
    return (
        <div
            className={
                "bg-gray-100 border border-gray-400 p-6 rounded-lg hover:shadow-md group" +
                (user.isLogged ? " cursor-pointer" : "")
            }
            onClick={goToKey}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">
                        {key}
                    </h2>
                    <p className="truncate leading-relaxed text-black">{V}</p>
                </div>
                <div className="flex flex-col">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full group-hover:bg-purple-700 bg-slate-400 text-blue-100 mb-4">
                        <ConfKeyType type={T} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function KeyList({ keys }) {
    return (
        <div className="grid grid-cols-4 gap-6">
            {keys.map((k) => (
                <KeyCard item={k} key={k.key} />
            ))}
        </div>
    )
}
