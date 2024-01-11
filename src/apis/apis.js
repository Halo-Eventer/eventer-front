import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const getAllStore = () => {
  return axios.get('http://3.34.24.140:9998/store?festivalId=1');
};

export const assignStoreApi = () => {
  console.log(process.env.REACT_APP_API);
  const data = {
    name: '주점2',
    summary: '육회와 사케를 팔고 있어요',
    isOperation: true,
    operationHours: '16:00~22:00',
    latitude: 37.550591791122294,
    longitude: 127.07476720170447,
    type: '주점',
  };
  console.log(data);
  const festivalId = 1;
  return axios.post(`/store`, data, {
    params: {
      festivalId: festivalId,
    },
  });
};
