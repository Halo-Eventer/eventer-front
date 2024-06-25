import axios from 'axios';
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers.withCredentials = true;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 응답을 받으면 로그인 페이지로 리디렉트
      window.location.href = '/assign_login';
    }
    return Promise.reject(error);
  }
);
//components/map 에서 쓰이는 apis (시작)
export const getAllMapCategory = (type) => {
  // console.log(type);
  return axios.get('/mapCategory?festivalId=1', { params: { type: type } });
};

export const getAllBooth = () => {
  return axios.get('/booth?festivalId=1');
};

export const getAllConcert = (festivalId) => {
  return axios.get(`/concert?festivalId=${festivalId}`);
};

export const getDetailMapCategory = (mapId) => {
  return axios.get(`/mapCategory/${mapId}`);
};
//components/map 에서 쓰이는 apis (끝)

export const getHome = () => {
  //Home에 필요한 정보들 (팝업, 썸네일들)
  return axios.get('/home');
};

export const getAll = (festivalId, category, type) => {
  if (category === 'notice') {
    // 공지사항/이벤트(게시글) 리스트
    return axios.get(`/notice/${festivalId}`, { params: { type: type } });
  } else if (category === 'mapCategory') {
    return axios.get(`/mapCategory`, {
      params: {
        festivalId: festivalId,
        type: type,
      },
    });
  } else if (category === 'lostItem' || category === 'missingPerson') {
    return axios.get(`/user/${category}`);
  } else if (category === 'urgent') {
    return axios.get('/admin/urgent');
  } else {
    return axios.get(`/${category}`, {
      params: { festivalId: festivalId },
    });
  }
};

export const getDetail = (festivalId, category, id) => {
  if (category === 'notice') return axios.get(`notice/${festivalId}/${id}`);
  else if (category === 'lostItem' || category === 'missingPerson')
    return axios.get(`user/${category}/${id}`);
  else if (category === 'urgent') return axios.get(`admin/urgent/${id}`);
  else return axios.get(`/${category}/${id}`);
};

export const lostItemGet = () => {
  return axios.get('/user/lostItem');
};

export const getBannerRank = () => {
  return axios.get('/notice/banner');
};

export const getInquiryDetail = (id) => {
  return axios.get(`/admin/inquiry/${id}`);
};

export const getInquiry = () => {
  return axios.get('/inquiry');
};
