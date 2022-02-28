import { useEffect } from "react"

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (evt) => {
            if (!ref?.current || ref?.current.contains(evt.target)) {
                return
            }
            handler(evt)
        }

        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [ref, handler])
}
