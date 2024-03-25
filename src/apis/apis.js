import axios from 'axios';
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';

axios.defaults.baseURL = process.env.REACT_APP_API;

//components/map 에서 쓰이는 apis (시작)
export const getAllStore = (type) => {
  console.log(type);
  return axios.get('/store?festivalId=1', { params: { type: type } });
};

export const getAllBooth = () => {
  return axios.get('/booth?festivalId=1');
};

export const getAllConcert = (festivalId) => {
  return axios.get(`/concert?festivalId=${festivalId}`);
};

export const getDetailStore = (storeId) => {
  return axios.get(`/store/${storeId}`);
};
//components/map 에서 쓰이는 apis (끝)


export const getAll = (festivalId, category, type) => {
  if (category === 'notice') {
    return axios.get(`/notice/${festivalId}/list`);
  } else if (category === 'store') {
    return axios.get(`/store?festivalId=${festivalId}`, {
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

export const assignMenuApi = (storeId, menus) => {
  return axios.post(`/menu`, menus, {
    params: {
      storeId: storeId,
    },
  });
};
export const assignApi = (info, category, festivalId) => {
  console.log('info in assignApi : ', info);
  console.log(info.thumbnail);
  if (info.thumbnail == thumbnail_preview) info.thumbnail = '';
  return axios.post(`/${category}`, info, {
    params: {
      festivalId: festivalId,
      type: info.type,
    },
  });
};
export const reviseApi = (info, category, id) => {
  console.log('info in reviseApi : ', info);
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
