import axios from 'axios';
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';

axios.defaults.baseURL = process.env.REACT_APP_API;





//components/map 에서 쓰이는 apis (시작)
export const getAllMapCategory = (type) => {
  console.log(type);
  return axios.get('/mapCategory?festivalId=1', { params: { type: type } });
};

export const getAllBooth = () => {
  return axios.get('/booth?festivalId=1');
};

export const getAllConcert = (festivalId) => {
  return axios.get(`/concert?festivalId=${festivalId}`);
};

export const getDetailmapCategory = (mapId) => {
  return axios.get(`/mapCategory/${mapId}`);
};
//components/map 에서 쓰이는 apis (끝)






export const getHome = () => {    //Home에 필요한 정보들 (팝업, 썸네일들)
  return axios.get('/home')
}
export const getAll = (festivalId, category, type) => {
  if (category === 'notice') {    // 공지사항/이벤트(게시글) 리스트
    return axios.get(`/notice/${festivalId}/list`,
      { params: { type: type } });
  } else if (category === 'mapCategory') {
    return axios.get(`/mapCategory?festivalId=${festivalId}`, {
      params: { type: type },
    });
  } else {
    return axios.get(`/${category}`, { params: { festivalId: festivalId } });
  }
};
export const getDetail = (category, id) => {
  return axios.get(`/${category}/${id}`);
};
export const deleteDetail = (category, id) => {
  return axios.delete(`/${category}/${id}`);
};

export const assignApi = (info, category, festivalId) => {
  console.log('info in assignApi : ', info);
  console.log(info.thumbnail);
  if (info.thumbnail == thumbnail_preview) info.thumbnail = '';

  if(category=='notice') 
    // 게시글인경우 type을 쿼리에 추가 X
    return axios.post(`/${category}`, info, {
      params: {
        festivalId: festivalId,
      },
    });

  else if (category=='lost' || category == 'urgent')
    return axios.post(`/admin/${category}`, info);

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
export const reviseApi = (info, category, id) => {
  console.log('info in reviseApi : ', info);

  if(category=='lost' || category == 'missing-person' || category == 'urgent')
    return axios.patch(`/admin/${category}/${id}`, info);
  else
    return axios.patch(`/${category}/${id}`, info);
};

export const reviseMenuApi = (menus) => {
  return axios.patch(`/menu/${menus.id}`, menus, {});
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
  return axios.post('/user/missing-person', info);
};

export const lostGet = () => {
  return axios.get('/user/lost-items');
};
