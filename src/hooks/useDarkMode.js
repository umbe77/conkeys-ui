import { useEffect, useState } from "react"

export const useDarkMode = () => {
    const [theme, setTheme] = useState(window.localStorage.getItem("theme"))
    const setCurrentTheme = (newTheme) => {
        setTheme(newTheme)
    }
    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("dark", "light")
        root.classList.add(theme)
        window.localStorage.setItem("theme", theme)
    }, [theme])
    return [theme, setCurrentTheme]
}
