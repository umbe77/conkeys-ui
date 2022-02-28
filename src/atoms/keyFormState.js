import { atom } from "recoil"

export const keyFormModalOpenState = atom({
    key: "keyFormModalOpenState",
    default: false,
})

export const selectedKeyState = atom({
    key: "selectedKey",
    default: null,
})
