import { lostItemForm_blank, mapCategoryForm_blank, mapForm_blank, missingForm_blank, missingPersonForm_blank, postForm_blank, urgentForm_blank } from "constants/const_assign";

export const InitInfo = (category, type) => {
    let tmp;
    console.log('category, type in firstInfo : ', category, type);

    if (category === 'notice')
        tmp = postForm_blank;
    else if (category === 'store')
        tmp = mapCategoryForm_blank
    else if (category === 'lost')
        tmp = lostItemForm_blank;
    else if (category === 'missingPerson')
        tmp = missingPersonForm_blank;
    else if (category === 'urgent')
        tmp = urgentForm_blank;
    else
        tmp = mapForm_blank;

    return {...tmp, type:type};
};