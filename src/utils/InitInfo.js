import { lostForm_blank, mapCategoryForm_blank, mapForm_blank, missingForm_blank, postForm_blank, urgentForm_blank } from "constants/Const_Assign";

export const InitInfo = (category, type) => {
    let tmp;
    console.log('category, type in firstInfo : ', category, type);

    if (category === 'notice')
        tmp = postForm_blank;
    else if (category === 'store')
        tmp = mapCategoryForm_blank
    else if (category === 'lost')
        tmp = lostForm_blank;
    else if (category === 'missing-person')
        tmp = missingForm_blank;
    else if (category === 'urgent')
        tmp = urgentForm_blank;
    else
        tmp = mapForm_blank;

    return tmp;
};