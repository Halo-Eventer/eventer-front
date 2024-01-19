import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const getAllStore = () => {
  return axios.get('/store?festivalId=1');
};

export const getAllEvent = () => {
  return axios.get('/event?festivalId=1');
};
export const getAllBooth = () => {
  return axios.get('/booth?festivalId=1');
};
export const getAllAmenity = () => {
  return axios.get('/amenity?festivalId=1');
};

export const getDetailStore = (storeId) => {
  return axios.get(`/store/${storeId}`);
};
export const getDetailEvent = (id) => {
  return axios.get(`/event/${id}`);
};
export const getDetailBooth = (id) => {
  return axios.get(`/booth/${id}`);
};
export const getDetailAmenity = (id) => {
  return axios.get(`/amenity/${id}`);
};

export const assignApi = (props, category, imgs, thumbnail) => {
  if (thumbnail != []) props.thumbnail = thumbnail;
  if (imgs != []) props.images = imgs;
  const festivalId = 1;

  return axios.post(`/${category}`, props, {
    params: {
      festivalId: festivalId,
    },
  });
};
export const assignStoreApi = () => {
  const data = {
    name: '주점2',
    summary: '육회와 사케를 팔고 있어요',
    isOperation: true,
    operationHours: '16:00~22:00',
    latitude: 37.550591791122294,
    longitude: 127.07476720170447,
    type: '주점',
  };

  const festivalId = 1;
  return axios.post(`/store`, data, {
    params: {
      festivalId: festivalId,
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
