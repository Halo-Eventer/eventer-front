import axios from 'axios';
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';

axios.defaults.baseURL = process.env.REACT_APP_API;


export const deleteDetail = (category, id) => {

    if (category == 'lost' ||
      category == 'missing-person' ||
      category == 'urgent')
      return axios.delete(`/admin/${category}/${id}`);
  
    else
      return axios.delete(`/${category}/${id}`);
  };
  // DELETE DELETE DELETE(끝)
  