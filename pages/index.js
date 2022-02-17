import { SearchIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { BehaviorSubject, debounceTime, from, mergeMap } from "rxjs"
import KeyList from "../components/keylist"

const getKeys = async (search) => {
    let endpoint = "/api/keys"
    if (!search || search.length > 0) {
        endpoint += `/${encodeURIComponent(search)}`
    }
    const res = await fetch(endpoint, {
        method: "GET",
    })
    return res.json()
}

const keys$ = new BehaviorSubject("")
const search$ = keys$.pipe(
    debounceTime(250),
    mergeMap((val) => from(getKeys(val)))
)

const useObsevabale = (observable, setter) => {
    useEffect(() => {
        observable.subscribe((keys) => {
            setter(keys)
        })

        return () => observable.unsubscribe()
    }, [observable, setter])
}

export default function Home() {
    const [keys, setKeys] = useState([])
    const [search, setSearch] = useState("")

    const onSearch = (e) => {
        const newValue = e.target.value
        setSearch(newValue)
        search$.next(newValue)
    }

    useObsevabale(search$, setKeys)

    return (
        <>
            <div className="container mx-auto scrollbar-hide">
                <div className="mx-auto">
                    <div className="flex flex-wrap flex-row mb-1 sm:mb-0 justify-between w-full">
                        <h2 className="text-2xl leading-tight md:pr-0 text-gray-900 dark:text-white">
                            KEYS
                        </h2>
                        <div className="text-end">
                            <div className="hidden relative mr-3 md:mr-0 md:block">
                                <div className="flex absolute text-gray-500 dark:text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <SearchIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    id="email-adress-icon"
                                    className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search..."
                                    onChange={onSearch}
                                    value={search}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <div className="max-w-full h-screen overflow-x-auto shadow rounded-lg bg-gray-100 dark:bg-gray-800 p-8">
                        <KeyList keys={keys} />
                    </div>
                </div>
            </div>
        </>
    )
}
