import { useCallback } from "react"

export const useConfirmPwdValidation = () =>
    useCallback((values) => {
        const { newPassword, confirmPassword } = values
        if (newPassword !== confirmPassword) {
            return {
                values: {},
                errors: {
                    confirmPassword: {
                        type: "validation",
                        message: "Password not match",
                    },
                },
            }
        }
        return {
            values,
            errors: {},
        }
    })

export const useDateValidation = () =>
    useCallback((values) => {
        const { T, V } = values
        if (T === 3 && new Date(V).toString() === "Invalid Date") {
            return {
                values: {},
                errors: {
                    [filed]: {
                        type: "validation",
                        message: "Date should be in ISO format",
                    },
                },
            }
        }
        return {
            values,
            errors: {},
        }
    })
