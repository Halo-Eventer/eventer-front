import { mapForm_blank, postForm_blank, storeForm_blank } from "constants/Const_Assign";

export const InitInfo = (category, type) => {
    let tmp;
    console.log('category, type in firstInfo : ', category, type);
    
    if (category === 'notice')
        tmp = postForm_blank;
    else if (category === 'store')
        tmp = storeForm_blank;
    else
        tmp = mapForm_blank;

    return tmp;
};