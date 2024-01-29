import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const getAllStore = (type) => {
  console.log(type);
  return axios.get('/store?festivalId=1', { params: { type: type } });
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

export const assignMenuApi = (storeId, menus) => {
  menus.summary = '요약설명';
  return axios.post(`/menu`, menus, {
    params: {
      storeId: storeId,
    },
  });
};
export const assignApi = (props, category, imgs, thumbnail) => {
  if (thumbnail != '') props.thumbnail = thumbnail;
  if (imgs != '') props.images = imgs;

  const festivalId = 1;
  console.log(props);
  return axios.post(`/${category}`, props, {
    params: {
      festivalId: festivalId,
    },
  });
};

// export const assignStoreApi = () => {
//   const data = {
//     name: '주점2',
//     summary: '육회와 사케를 팔고 있어요',
//     isOperation: true,
//     operationHours: '16:00~22:00',
//     latitude: 37.550591791122294,
//     longitude: 127.07476720170447,
//     type: '주점',
//   };

//   const festivalId = 1;
//   return axios.post(`/store`, data, {
//     params: {
//       festivalId: festivalId,
//     },
//   });
// };

export const imageUploadApi = (imgInfo) => {
  const formData = new FormData();
  formData.append('image', imgInfo);
  formData.append('dirName', 'festival');

  return axios.post(`/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

//  NOH's
export const reviseApi = (props, category, imgs, thumbnail,id) => {
  if (thumbnail != '') props.thumbnail = thumbnail;
  if (imgs != '') props.images = imgs;

  const festivalId = 1;
  console.log(props);
  return axios.patch(`/${category}/${id}`, props);
};


export const getAllNotice = (festivalId) => {
  return axios.get(`/noticelist/${festivalId}/list`);
};
export const getDetailNotice = (festivalId, id) => {
  return axios.get(`/noticelist/${festivalId}/id`);
};
