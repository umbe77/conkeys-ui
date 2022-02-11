import { atom } from "recoil"

export const userState = atom({
    key: "userState",
    default: {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        isLogged: false,
        token: "",
    },
})
