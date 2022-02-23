import { keyFormModalOpenState, userState } from "../atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { ConfKeyType, KeyForm } from "."

const KeyCard = ({ item }) => {
    const { key, T, V } = item
    const user = useRecoilValue(userState)
    const setKeyFormOpen = useSetRecoilState(keyFormModalOpenState)
    const goToKey = (e) => {
        e.preventDefault()
        if (user.isLogged) {
            setKeyFormOpen(true)
        }
    }
    return (
        <div
            className={
                "bg-white dark:bg-gray-900 border border-gray-400 p-6 rounded-lg hover:shadow-md dark:hover:shadow-slate-500 group" +
                (user.isLogged ? " cursor-pointer" : "")
            }
            onClick={goToKey}
        >
            <div className="flex flex-row text-grey-900 dark:text-salte-200 items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold title-font mb-2 text-green-900 dark:text-slate-200">
                        {key}
                    </h2>
                    <p className="truncate leading-relaxed text-gray-900 dark:text-slate-200">
                        {V}
                    </p>
                </div>
                <div className="flex flex-col">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full group-hover:bg-purple-700 bg-slate-400 dark:bg-slate-600 text-blue-100 mb-4">
                        <ConfKeyType type={T} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export const KeyList = ({ keys }) => {
    if (keys.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <h2 className="text-gray-900 dark:text-slate-200 font-bold text-2xl">
                    No Keys Found
                </h2>
            </div>
        )
    }
    return (
        <>
            <div className="grid grid-cols-4 gap-6">
                {keys.map((k) => (
                    <KeyCard item={k} key={k.key} />
                ))}
            </div>
            <KeyForm />
        </>
    )
}
