import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRecoilState, useRecoilValue } from "recoil"
import {
    userFormModalState,
    selectedUserState,
} from "../lib/atoms/userFormState"
import { userState } from "../lib/atoms/userState"

export default function UserFrom() {
    const [userFormOpen, setUserFormOpen] = useRecoilState(userFormModalState)
    const [isNewUser, setIsNewUser] = useState(true)
    const { token } = useRecoilValue(userState)
    const [selectedUserName, setSelectedUserName] =
        useRecoilState(selectedUserState)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async ({ userName, name, lastName, email, isAdmin }) => {
        let method = "PUT"
        if (isNewUser) {
            method = "POST"
        }
        await fetch(`/api/users/${encodeURIComponent(userName)}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({ userName, name, lastName, email, isAdmin }),
        })
        closeModal()
    }

    const closeModal = () => {
        setUserFormOpen(false)
        reset()
    }

    useEffect(() => {
        const get = async () => {
            const user = await fetch(
                `/api/users/${encodeURIComponent(selectedUserName)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json",
                    },
                }
            ).then((res) => res.json())
            Object.entries(user).map(([k, v]) => setValue(k, v))
        }
        if (selectedUserName !== null) {
            get()
            setIsNewUser(false)
        }
    }, [selectedUserName, token])

    if (userFormOpen) {
        return (
            <div
                className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0
				bg-black bg-opacity-50 flex"
                onClick={() => closeModal()}
            >
                <div className="relative px-4 w-full max-w-md h-full md:h-auto">
                    <div
                        className="relative bg-white rounded-lg shadow dark:bg-gray-700"
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
                        >
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                User Editor
                            </h3>
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    {...register("userName", {
                                        required: true,
                                    })}
                                    className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0  peer ${
                                        errors.userName
                                            ? "border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-400"
                                            : "text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                                    }`}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="userName"
                                    className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                                        errors.userName
                                            ? "text-red-700 dark:text-red-500 peer-focus:text-red-700 peer-focus:dark:text-red-500"
                                            : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                    }`}
                                >
                                    User Name
                                </label>
                                {errors.userName && (
                                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span class="font-medium">Oops!</span>{" "}
                                        Username is mandatory
                                    </p>
                                )}
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    {...register("name")}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    First Name
                                </label>
                            </div>

                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="lastName"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Last Name
                                </label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email
                                </label>
                            </div>

                            <div className="relative z-0 mb-6 w-full group">
                                <div className="flex items-center h-5">
                                    <input
                                        {...register("isAdmin")}
                                        type="checkbox"
                                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                    ></input>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="isAdmin"
                                            className="font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Is Admin
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end space-x-4">
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save
                                </button>
                                <button
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
