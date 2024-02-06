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
export const getAllNotice = (festivalId) => {
  return axios.get(`/notice/${festivalId}/list`);
};
export const getAllConcert = (festivalId)=>{
  return axios.get(`/concert?festivalId=${festivalId}`);
}


export const getDetailConcert = (id)=>{
    return axios.get(`/concert/${id}`);
}
export const getDetailNotice = (id) => {
  return axios.get(`/notice/${id}`);
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

export const getAll = (festivalId, category, type) => {
  if (category === 'notice') {
    return axios.get(`/notice/${festivalId}/list`);
  } else if (category === 'store') {
    return axios.get(`/store?festivalId=${festivalId}`, { params: { type: type } });
  } else {
    return axios.get(`/${category}`, { params: { festivalId: festivalId } });
  }
}
export const getDetail = (category,id) => {
  return axios.get(`/${category}/${id}`);
}
export const deleteDetail = (category,id) => {
  return axios.delete(`/${category}/${id}`);
}

export const assignMenuApi = (storeId, menus) => {
  menus.summary = '요약설명';
  return axios.post(`/menu`, menus, {
    params: {
      storeId: storeId,
    },
  });
};
export const assignApi = (info, category, festivalId) => {
  console.log("info in assignApi : ",info);
  return axios.post(`/${category}`, info, {
    params: {
      festivalId: festivalId,
      type:info.type
    },
  });
};
export const reviseApi = (info, category, id) => {
  console.log("info in reviseApi : ",info);
  return axios.patch(`/${category}/${id}`, info);
};
export const reviseMenuApi = (menus) => {
  menus.summary = '요약설명';
  return axios.patch(`/menu/${menus.id}`, menus, {
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



