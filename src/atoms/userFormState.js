import { atom } from "recoil"

export const userFormModalState = atom({
    key: "userFormModalState",
    default: false,
})

export const selectedUserState = atom({
    key: "selectedUser",
    default: null,
})

export const setPasswordModalState = atom({
    key: "setPasswordModalState",
    default: false,
})
