import { useEffect, useState } from "react"

export const useObservable = (observable$, initialValue) => {
    const [value, setValue] = useState(initialValue)
    const setNextValue = (newVal) => {
        observable$.next(newVal)
    }
    useEffect(() => {
        observable$.subscribe((msg) => {
            setValue(msg)
        })

        return () => observable$.unsubscribe()
    }, [observable$, setValue])

    return [value, setNextValue]
}
