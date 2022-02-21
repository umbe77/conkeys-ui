import { useCallback } from "react"

export const useValidation = () =>
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
