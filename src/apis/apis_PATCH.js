import axios from 'axios';
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';
import thumbnail_preview2 from 'asset/assign/thumbnail_preview2.png';
import thumbnail_preview_missing from 'asset/assign/thumbnail_preview_missing.png';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const reviseApi = (info, category, id) => {
  // console.log('info in reviseApi : ', info);

  if (
    category !== 'urgent' &&
    (info.thumbnail == thumbnail_preview ||
      info.thumbanil == thumbnail_preview2 ||
      info.thumbnail == thumbnail_preview_missing)
  )
    info.thumbnail = '';

  if (
    category == 'lostItem' ||
    category == 'missingPerson' ||
    category == 'urgent'
  )
    return axios.patch(`/admin/${category}/${id}`, info);
  else return axios.patch(`/${category}/${id}`, info);
};

export const reviseMenuApi = (menus) => {
  return axios.patch(`/menu/${menus.id}`, menus, {});
};

export const popUpApi = (category, id, check) => {
  //   console.log('category, id, check:', category, id, check);

  if (category === 'missingPerson')
    return axios.patch(`/admin/${category}/popup`, '', {
      params: {
        missingId: id,
        check: check,
      },
    });
  // patch나 post는 RequestBody없이 query 보내줄 거면 두 번째 인자를 비우거나
  else if (category === 'urgent')
    return axios.patch(
      `/admin/${category}/popup/?urgentId=${id}&check=${check}`
    );
  // url에 ?= 써서 보내줘야됨
};

export const bannerRankApi = (bannerList) => {
  return axios.patch('notice/banner', bannerList);
};
