import { At, Calendar, Hash } from "tabler-icons-react"

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
    }
}

const KeyCard = ({ item }) => {
    const { key, T, V } = item
    return (
        <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">
                        {key}
                    </h2>
                    <p className="truncate leading-relaxed text-black">{V}</p>
                </div>
                <div className="flex flex-col">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-400 text-blue-100 mb-4">
                        <ConfKeyType type={T} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function KeyList({ keys }) {
    return (
        <div className="flex flex-wrap -m-4">
            {keys.map((k) => (
                <KeyCard item={k} key={k.key} />
            ))}
        </div>
    )
}
