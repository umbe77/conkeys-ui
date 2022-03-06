import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { At, Calendar, Checkbox, Hash, Key } from "tabler-icons-react"

export const ConfKeyTypeEdit = ({ type, value }) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext()

    const validateDateType = (v) =>
        new Date(v).toString() === "Invalid Date" ? "Value is not a Date" : true

    useEffect(() => {
        setValue("V", value)
    }, [type, value])
    switch (type) {
        case 0:
            return (
                <input
                    type="number"
                    {...register("V", {
                        required: "Value is Mandatory",
                        valueAsNumber: true,
                    })}
                    placeholder="Value"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.V
                            ? "border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                            : "bg-gray-50 dark:bg-gray-600 text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                    }`}
                />
            )
        case 1:
            return (
                <input
                    type="number"
                    step="0.0000001"
                    {...register("V", {
                        required: "Value is Mandatory",
                        valueAsNumber: true,
                    })}
                    placeholder="Value"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.V
                            ? "border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                            : "bg-gray-50 dark:bg-gray-600 text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                    }`}
                />
            )
        case 2:
            return (
                <input
                    type="text"
                    {...register("V", { required: "Value is Mandatory" })}
                    placeholder="Value"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.V
                            ? "border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                            : "bg-gray-50 dark:bg-gray-600 text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                    }`}
                />
            )
        case 3:
            return (
                <input
                    type="text"
                    {...register("V", {
                        required: "Value is Mandatory",
                        validate: validateDateType,
                    })}
                    placeholder="Value"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.V
                            ? "border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                            : "bg-gray-50 dark:bg-gray-600 text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                    }`}
                />
            )
        case 4:
            return (
                <input
                    type="checkbox"
                    {...register("V")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
            )
        case 5:
            return (
                <input
                    type="text"
                    {...register("V", { required: "Value is Mandatory" })}
                    placeholder="Value"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                        errors.V
                            ? "border-red-600 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                            : "bg-gray-50 dark:bg-gray-600 text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                    }`}
                />
            )
    }
}

export const ConfKeyType = ({ type }) => {
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
        default:
            return <></>
    }
}
