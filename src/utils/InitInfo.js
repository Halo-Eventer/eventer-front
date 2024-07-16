import {
    lostItemFormBlank,
    mapCategoryFormBlank,
    mapFormBlank,
    missingPersonFormBlank,
    postFormBlank,
    urgentFormBlank,
} from 'constants/const_assign';

export const InitInfo = (category, type) => {
    let tmp;
    console.log('category, type in firstInfo : ', category, type);

    if (category === 'notice') tmp = postFormBlank;
    else if (category === 'store') tmp = mapCategoryFormBlank;
    else if (category === 'lost') tmp = lostItemFormBlank;
    else if (category === 'missingPerson') tmp = missingPersonFormBlank;
    else if (category === 'urgent') tmp = urgentFormBlank;
    else tmp = mapFormBlank;

    return { ...tmp, type: type };
};
