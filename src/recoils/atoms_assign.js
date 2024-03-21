import { atom } from 'recoil';

export const inAssignState=atom({
    key:"inAssignState",
    default:false
})

export const infoState = atom({
    key: "infoState",
    default: {}
});

export const categoryState_assign = atom({
    key: "categoryState_assign",
    default: ''
})

export const cancleState = atom({
    key: "cancleState",
    default: true
})

export const modeState = atom({
    key: "modeState",
    default: ''
})

export const itemIDState = atom({
    key: "itemIDState",
    default: 0
})



