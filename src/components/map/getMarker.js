import { getAllByPlaceholderText } from '@testing-library/react';
import { getAllBooth, getAllStore } from '../../apis/apis';

export function getMarker(activeCategory, setData) {
  if (activeCategory == 1) {
    getAllStore('관리자')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 2) {
    getAllStore('관광안내소')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 3) {
    getAllStore('편의점')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 4) {
    getAllStore('화장실')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 5) {
    getAllStore('쓰레기통')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 6) {
    getAllStore('흡연장')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 7) {
    getAllStore('주차장')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 8) {
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
