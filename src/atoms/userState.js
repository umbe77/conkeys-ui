import { atom } from "recoil"

const storage = window.sessionStorage

const sessionStorageUserEffect =
    (key) =>
    ({ setSelf, onSet }) => {
        const storageValue = storage.getItem(key)
        if (storageValue !== null) {
            setSelf(JSON.parse(storageValue))
        }

        onSet((newValue, _, isReset) => {
            isReset
                ? storage.removeItem(key)
                : storage.setItem(key, JSON.stringify(newValue))
        })
    }

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
    effects: [sessionStorageUserEffect("me")],
})
