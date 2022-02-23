import { At, Calendar, Checkbox, Hash, Key } from "tabler-icons-react"

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
    }
}
