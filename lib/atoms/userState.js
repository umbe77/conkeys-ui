import { atom } from "recoil"

export const userState = atom({
    key: "userState",
    default: {
        userName: "",
        name: "",
        lastName: "",
        email: "",
        isLogged: false,
        token: "",
    },
})
