import { useEffect, useState } from "react"

const getKeys = async (search, keysCallback) => {
    let endpoint = "/api/keys"
    if (!search || search.length > 0) {
        endpoint += `/${encodeURIComponent(search)}`
    }
    const keys = await fetch(endpoint, {
        method: "GET",
    }).then((resp) => resp.json())
    if (keysCallback) {
        keysCallback(keys)
    }
}

export default function Home() {
    const [keys, setKeys] = useState([])
    const [search, setSearch] = useState("")

    const doSearch = async (e) => {
        e.preventDefault()
        await getKeys(search, setKeys)
    }

    useEffect(() => {
        getKeys("", setKeys)
    }, [])

    return (
        <>
            <div className="container mx-auto scrollbar-hide">
                <div className="py-8">
                    <div className="flex flex-wrap flex-row mb-1 sm:mb-0 justify-between w-full">
                        <h2 className="text-2xl leading-tight md:pr-0 text-white">
                            KEYS
                        </h2>
                        <div className="text-end">
                            <form
                                className="flex w-full space-x-3"
                                onSubmit={doSearch}
                            >
                                <div className=" relative ">
                                    <input
                                        type="text"
                                        id='"form-subscribe-Filter'
                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="key name"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                    type="submit"
                                >
                                    Filter
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <div className="max-w-full h-screen overflow-x-auto shadow rounded-lg bg-white">
                        <div className="w-full leading-normal overflow-y-auto">
                            {keys &&
                                keys.map((k) => (
                                    <code className="text-gray-800" key={k.key}>
                                        {JSON.stringify(k, null, 2)}
                                    </code>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
