import { useState } from "react"

const useStorage = (key, initialValue, storage) => {
    const [storageValue, setStorageValue] = useState(() => {
        try {
            const item = storage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (err) {
            return initialValue
        }
    })

    const setValue = (value) => {
        const valueToStore =
            value instanceof Function ? value(storageValue) : value
        setStorageValue(value)
        storage.setItem(key, JSON.stringify(valueToStore))
    }

    return [storageValue, setValue]
}

export const useSessionStorage = (key, initialValue) => {
    return useStorage(key, initialValue, window.sessionStorage)
}

export const useLocalStorage = (key, initialValue) => {
    return useStorage(key, initialValue, window.localStorage)
}
