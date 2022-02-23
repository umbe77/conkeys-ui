import { ChevronDownIcon } from "@heroicons/react/outline"
import { ConfKeyType } from "."
import { useForm } from "react-hook-form"
import { useRecoilState } from "recoil"
import { keyFormModalOpenState } from "../atoms"

export const KeyForm = () => {
    const [formOpen, setFormOpen] = useRecoilState(keyFormModalOpenState)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = () => {}

    const closeModal = () => {
        setFormOpen(false)
        reset()
    }

    if (formOpen) {
        return (
            <div
                className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center h-modal pt-24 md:h-full md:inset-0
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
                            autoComplete="off"
                        >
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Key Editor
                            </h3>
                            <div className="gird grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input
                                            type="text"
                                            {...register("key", {
                                                required: true,
                                            })}
                                            className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0  peer ${
                                                errors.key
                                                    ? "border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                                                    : "text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                                            }`}
                                            placeholder=" "
                                        />
                                        <label
                                            htmlFor="key"
                                            className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                                                errors.key
                                                    ? "text-red-600 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500"
                                                    : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                                            }`}
                                        >
                                            Key Name
                                        </label>
                                        {errors.userName && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                <span className="font-medium">
                                                    Oops!
                                                </span>{" "}
                                                Key is mandatory
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <div className="relative z-0 mb-6 w-full group">
                                            <button
                                                type="button"
                                                className="inline-flex items-center text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                                            >
                                                <span class="flex items-center">
                                                    <div class="w-6 h-6 p-1 inline-flex items-center justify-center rounded-full group-hover:bg-purple-700 bg-slate-400 dark:bg-slate-600 text-blue-100">
                                                        <ConfKeyType type={2} />
                                                    </div>
                                                    <span class="ml-3 block truncate">
                                                        tipo
                                                    </span>
                                                </span>
                                                <ChevronDownIcon className="h-3 w-3 ml-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return <></>
}
