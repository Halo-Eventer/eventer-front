import axios from 'axios';
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';
import thumbnail_preview2 from 'asset/assign/thumbnail_preview2.png';
import thumbnail_preview_missing from 'asset/assign/thumbnail_preview_missing.png';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const assignApi = (info, category, festivalId) => {
  if (
    category !== 'urgent' &&
    (info.thumbnail == thumbnail_preview ||
      info.thumbanil == thumbnail_preview2 ||
      info.thumbnail == thumbnail_preview_missing)
  ) {
    // delete info.thumbnail;

    //info라고 해서 다 같은 info가 아님
    /* 인자로 그냥 let이나 단순 const 변수를 받은 거면 그냥 객체의 값을
    변경할 수 있지만, 그게 아닌 state로 온거라면 하위 함수에서도 변경 불가 
    state는 속성을 직접 삭제, 변경이 불가. 반드시 setState필요(주의)
    
    그래서 상위 함수에서 info를 그대로 안 갖고 오고 
    매개변수 let info_forApi = {...info};를 통해서 받아옴
    (그냥 let info_forApi = info해도 안 됨. 이러면 info_forApi도 state가 관리함*/
    info.thumbnail = '';
  }

  // console.log('info in assignApi : ', info);

  if (category == 'notice')
    // 게시글인경우 type을 쿼리에 추가 X
    return axios.post(`/${category}`, info, {
      params: {
        festivalId: festivalId,
      },
    });
  else if (category == 'lostItem' || category == 'urgent')
    return axios.post(`/admin/${category}`, info);
  else if (category == 'missingPerson')
    return axios.post(`/user/${category}`, info);
  else
    return axios.post(`/${category}`, info, {
      params: {
        festivalId: festivalId,
        type: info.type,
      },
    });
};
export const assignMenuApi = (mapId, menus) => {
  return axios.post(`/menu`, menus, {
    params: {
      mapId: mapId,
    },
  });
};
export const imageUploadApi = (imgInfo) => {
  const formData = new FormData();
  formData.append('image', imgInfo);
  formData.append('dirName', 'festival');

  return axios.post(`/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const missingPost = (info) => {
  return axios.post('/user/missingPerson', info);
};

export const bannerApi = (id, pick) => {
  return axios.post(`/notice/banner`, '', {
    params: {
      noticeId: id,
      pick: pick,
    },
  });
};
