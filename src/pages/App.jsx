import { CodeIcon, SearchIcon } from "@heroicons/react/outline"
import { KeyList } from "../components"
import { createSearchObservable, searchKeys } from "../lib"
import { useEffect, useMemo, useState } from "react"
import { useObservable } from "../hooks"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { keyFormModalOpenState, selectedKeyState, userState } from "../atoms"

export const App = () => {
    const { token } = useRecoilValue(userState)
    const search$ = useMemo(() => createSearchObservable(searchKeys), [])
    const [search, setSearch] = useState("")
    const setKeyFormOpen = useSetRecoilState(keyFormModalOpenState)
    const [keys, setKeys] = useObservable(search$, [])
    const setSelectedKey = useSetRecoilState(selectedKeyState)

    const onSearch = (e) => {
        const newValue = e.target.value
        setSearch(newValue)
        setKeys(newValue)
    }

    const newKey = () => {
        setSelectedKey(null)
        setKeyFormOpen(true)
    }

    const refresh = () => setKeys(search)

    useEffect(() => {
        setKeys("")
    }, [])
    return (
        <>
            <div className="container mx-auto scrollbar-hide">
                <div className="mx-auto">
                    <div className="flex flex-wrap flex-row mb-1 sm:mb-0 justify-between w-full">
                        <h2 className="text-2xl leading-tight md:pr-0 text-gray-900 dark:text-white">
                            KEYS
                        </h2>
                        <div className="flex space-x-2 text-end">
                            {token && (
                                <button
                                    className="inline-flex justify-center items-center space-x-2 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-base px-5 text-center mr-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                                    onClick={newKey}
                                >
                                    <CodeIcon className="h-5 w-5" />
                                    <span>Add Key</span>
                                </button>
                            )}
                            <div className="hidden relative mr-3 md:mr-0 md:block">
                                <div className="flex absolute text-gray-500 dark:text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <SearchIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search..."
                                    onChange={onSearch}
                                    value={search}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <div className="max-w-full h-screen overflow-x-auto shadow rounded-lg bg-gray-50 dark:bg-gray-800 p-8">
                        <KeyList keys={keys} refresh={refresh} />
                    </div>
                </div>
            </div>
        </>
    )
}
