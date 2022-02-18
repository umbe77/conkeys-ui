import UserForm from "../components/UserForm"
import {
    LockClosedIcon,
    PencilAltIcon,
    SearchIcon,
    UserAddIcon,
} from "@heroicons/react/outline"
import { Square, SquareCheck } from "tabler-icons-react"
import { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../lib/atoms/userState"
import {
    selectedUserState,
    userFormModalState,
} from "../lib/atoms/userFormState"

export default function Users() {
    const { token } = useRecoilValue(userState)
    const [search, setSearch] = useState("")
    const setSelectedUser = useSetRecoilState(selectedUserState)
    const setModalOpen = useSetRecoilState(userFormModalState)
    const [users, setUsers] = useState([])

    const onSearch = (e) => {
        setSearch(e.target.vale)
    }

    const openModal = (userName) => {
        setSelectedUser(userName)
        setModalOpen(true)
    }

    useEffect(() => {
        const get = async () => {
            const usrs = await fetch("/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
            }).then((res) => res.json())
            setUsers(usrs)
        }
        get()
    }, [])

    return (
        <>
            <div className="container mx-auto scrollbar-hide">
                <div className="mx-auto">
                    <div className="flex flex-wrap flex-row mb-1 sm:mb-0 justify-between w-full">
                        <h2 className="text-2xl leading-tight md:pr-0 text-gray-900 dark:text-white">
                            USERS
                        </h2>
                        <div className="flex space-x-2 text-end">
                            <button
                                className="inline-flex justify-center items-center space-x-2 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-base px-5 text-center mr-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                                onClick={() => openModal(null)}
                            >
                                <UserAddIcon className="h-5 w-5" />
                                <span>Add User</span>
                            </button>
                            <div className="relative mr-3 md:mr-0 md:block">
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
                    <div className="max-w-full h-screen overflow-x-auto shadow rounded-lg bg-gray-50 dark:bg-gray-800 p-8">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                            <thead className="bg-gray-100 dark:bg-gray-700">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                    >
                                                        UserName
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                    >
                                                        First Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                    >
                                                        Last Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                    >
                                                        Email
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                                    >
                                                        Is Admin
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                {users?.map(
                                                    ({
                                                        userName,
                                                        name,
                                                        lastName,
                                                        email,
                                                        isAdmin,
                                                    }) => (
                                                        <tr
                                                            key={userName}
                                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {userName}
                                                            </td>
                                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {name}
                                                            </td>
                                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {lastName}
                                                            </td>
                                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {email}
                                                            </td>
                                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {isAdmin ? (
                                                                    <SquareCheck className="w-6 h-6" />
                                                                ) : (
                                                                    <Square className="w-6 h-6" />
                                                                )}
                                                            </td>
                                                            <td className="flex space-x-4 items-center justify-center mt-4 px-6 text-sm font-medium whitespace-nowrap">
                                                                <a
                                                                    href="#"
                                                                    className="inline-flex space-x-2 justify-center items-center text-purple-600 dark:text-purple-500 hover:underline"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault()
                                                                        openModal(
                                                                            userName
                                                                        )
                                                                    }}
                                                                >
                                                                    <PencilAltIcon className="h-5 w-5" />
                                                                    <span>
                                                                        Edit
                                                                    </span>
                                                                </a>
                                                                <a
                                                                    href="#"
                                                                    className="inline-flex space-x-2 justify-center items-center text-purple-600 dark:text-purple-500 hover:underline"
                                                                >
                                                                    <LockClosedIcon className="h-5 w-5" />
                                                                    <span>
                                                                        Set
                                                                        Password
                                                                    </span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UserForm />
        </>
    )
}
