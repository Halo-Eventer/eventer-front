import { atom, selector } from "recoil";


export const festivalIdState = atom({
    key:"festivalIdState",
    default:1
})

export const categoryState = atom({
    key: "categoryState",
    default: "notice"
});
