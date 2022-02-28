import { ChevronDownIcon } from "@heroicons/react/outline"
import { ConfKeyType } from "."
import { useForm } from "react-hook-form"
import { useRecoilState, useRecoilValue } from "recoil"
import { keyFormModalOpenState, selectedKeyState, userState } from "../atoms"
import { getKey, keyTypes, saveKey } from "../lib"
import { useCallback, useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "../hooks"
import { CheckIcon } from "@heroicons/react/solid"

export const KeyForm = ({ refresh }) => {
    const { token } = useRecoilValue(userState)
    const [keyType, setKeyType] = useState(0)
    const [isKeyTypesOpen, setKeyTypesOpen] = useState(false)
    const [formOpen, setFormOpen] = useRecoilState(keyFormModalOpenState)
    const [selectedKey, setSelectedKey] = useRecoilState(selectedKeyState)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm()

    const dropTypesRef = useRef(null)
    useOnClickOutside(
        dropTypesRef,
        useCallback(() => {
            setKeyTypesOpen(false)
        }, [setKeyTypesOpen])
    )

    const closeModal = () => {
        setFormOpen(false)
        setSelectedKey(null)
        reset()
    }

    const selectType = (e, type) => {
        e.preventDefault()
        setKeyType(type)
        setKeyTypesOpen(false)
    }

    const onSubmit = async ({ key, V }) => {
        await saveKey(token, { key, T: keyType, V })
        refresh()
        closeModal()
    }

    useEffect(() => {
        const load = async () => {
            if (selectedKey !== null) {
                const { key, V, T } = await getKey(selectedKey.key, token)
                setValue("key", key)
                setValue("V", V)
                setKeyType(T)
            }
        }

        load()
    }, [selectedKey, token, setKeyType])

    if (formOpen) {
        return (
            <div
                className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center h-modal pt-24 md:h-full md:inset-0
				bg-black bg-opacity-50 flex"
                onClick={() => closeModal()}
            >
                <div className="px-4 w-full max-w-lg h-full md:h-auto">
                    <div
                        className="bg-white rounded-lg shadow dark:bg-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                onClick={() => closeModal()}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <form
                            className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                            onSubmit={handleSubmit(onSubmit)}
                            autoComplete="off"
                        >
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Key Editor
                            </h3>
                            <div className="grid grid-cols-6 gap-2">
                                <div className="col-span-4">
                                    <label
                                        htmlFor="key"
                                        className={`block mb-2 text-sm font-medium ${
                                            errors.key
                                                ? "text-red-600 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500"
                                                : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                        }`}
                                    >
                                        Key
                                    </label>
                                    <input
                                        type="text"
                                        autoFocus
                                        {...register("key", {
                                            required: true,
                                        })}
                                        placeholder="Key"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                                            errors.key
                                                ? "border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                                                : "bg-gray-50 dark:bg-gray-600 text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                                        }`}
                                    />
                                    {errors.key && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <span className="font-medium">
                                                Oops!
                                            </span>{" "}
                                            Key is mandatory
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <div className="relative">
                                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                                            Type
                                        </label>
                                        <button
                                            type="button"
                                            className="inline-flex items-center text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                                            onClick={() =>
                                                setKeyTypesOpen(!isKeyTypesOpen)
                                            }
                                        >
                                            <span className="flex items-center">
                                                <div className="w-6 h-6 p-1 inline-flex items-center justify-center rounded-full group-hover:bg-purple-700 bg-slate-400 dark:bg-slate-600 text-blue-100">
                                                    <ConfKeyType
                                                        type={keyType}
                                                    />
                                                </div>
                                                <span className="ml-2 block truncate">
                                                    {keyTypes[keyType]}
                                                </span>
                                            </span>
                                            <ChevronDownIcon className="h-3 w-3 ml-2" />
                                        </button>
                                        {isKeyTypesOpen && (
                                            <div
                                                id="dropdown"
                                                className="absolute flex border-2 border-purple-300 z-50 w-44 text-base list-none bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-gray-700"
                                                ref={dropTypesRef}
                                            >
                                                <ul
                                                    className="py-1 w-full"
                                                    aria-labelledby="dropdownButton"
                                                >
                                                    {Object.entries(
                                                        keyTypes
                                                    ).map(([type, desc]) => (
                                                        <li key={type}>
                                                            <a
                                                                href="#"
                                                                className="inline-flex w-full space-x-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                onClick={(e) =>
                                                                    selectType(
                                                                        e,
                                                                        parseInt(
                                                                            type
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <ConfKeyType
                                                                    type={parseInt(
                                                                        type
                                                                    )}
                                                                />
                                                                <span className="ml-2">
                                                                    {desc}
                                                                </span>
                                                                {parseInt(
                                                                    type
                                                                ) ===
                                                                    keyType && (
                                                                    <CheckIcon className="h-5 w-5" />
                                                                )}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <label
                                        htmlFor="key"
                                        className={`block mb-2 text-sm font-medium ${
                                            errors.V
                                                ? "text-red-600 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500"
                                                : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                        }`}
                                    >
                                        Value
                                    </label>
                                    <input
                                        type="text"
                                        {...register("V", {
                                            required: true,
                                        })}
                                        placeholder="Value"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                                            errors.V
                                                ? "border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                                                : "bg-gray-50 dark:bg-gray-600 text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                                        }`}
                                    />
                                    {errors.V && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <span className="font-medium">
                                                Oops!
                                            </span>{" "}
                                            Value is mandatory
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-end space-x-4">
                                <button
                                    disabled={isSubmitting}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="text-gray-900 hover:text-white border border-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return <></>
}
