import axios from 'axios';
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';

axios.defaults.baseURL = process.env.REACT_APP_API;


export const reviseApi = (info, category, id) => {
    console.log('info in reviseApi : ', info);

    if (category == 'lost' ||
        category == 'missing-person' ||
        category == 'urgent')
        return axios.patch(`/admin/${category}/${id}`, info);

    else
        return axios.patch(`/${category}/${id}`, info);
};


export const reviseMenuApi = (menus) => {
    return axios.patch(`/menu/${menus.id}`, menus, {});
};


export const popUpApi = (category, id, check) => {
    console.log('category, id, check:', category, id, check);

    if (category === 'missing-person')
        return axios.patch(`/admin/${category}/popup`, '',
            {
                params: {
                    missingId: id,
                    check: check,
                }
            });

    else if (category === 'urgent')
        return axios.patch(`/admin/${category}/popup/?urgentId=${id}&check=${check}`);
    // patch나 post는 RequestBody없이 query 보내줄 거면 두 번째 인자를 비우거나
    // url에 ?= 써서 보내줘야됨
}
