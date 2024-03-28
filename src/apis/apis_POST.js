import axios from 'axios';
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const assignApi = (info, category, festivalId) => {
    console.log('info in assignApi : ', info);
    console.log(info.thumbnail);
    if (info.thumbnail == thumbnail_preview) info.thumbnail = '';
  
    
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
    return axios.post(`/notice/banner`, '',
      {
        params: {
          noticeId: id,
          pick: pick,
        }
      });
  }
