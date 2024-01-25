import { getAllByPlaceholderText } from '@testing-library/react';
import {
  getAllAmenity,
  getAllBooth,
  getAllEvent,
  getAllStore,
} from '../apis/apis';

export function getMarker(activeCategory, setData) {
  if (activeCategory == 1) {
    getAllEvent()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 2) {
    getAllStore('푸드트럭')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 3) {
    getAllStore('주점')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 4) {
    getAllBooth()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 5) {
    getAllAmenity()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  }
}

export default getMarker;
