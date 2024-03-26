import { getAllByPlaceholderText } from '@testing-library/react';
import { getAllBooth, getAllMapCategory } from '../../apis/apis';

export function getMarker(activeCategory, setData) {
  if (activeCategory == 1) {
    getAllMapCategory('관리자')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 2) {
    getAllMapCategory('관광안내소')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 3) {
    getAllMapCategory('편의점')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 4) {
    getAllMapCategory('화장실')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 5) {
    getAllMapCategory('흡연장')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 6) {
    getAllMapCategory('주차장')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 7) {
    getAllBooth()
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
