import { getAllByPlaceholderText } from '@testing-library/react';
import { getAllBooth, getAllMapCategory } from 'apis/apis_GET';

export function getMarker(activeCategory, setData) {
  if (activeCategory == 1) {
    getAllMapCategory('MANAGER')
      .then((res) => {
        //console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 2) {
    getAllMapCategory('INFO')
      .then((res) => {
        //console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 3) {
    getAllMapCategory('SHOP')
      .then((res) => {
        //console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 4) {
    getAllMapCategory('TOILET')
      .then((res) => {
        //console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 5) {
    getAllMapCategory('SMOKING')
      .then((res) => {
        //console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 6) {
    getAllMapCategory('PARKING')
      .then((res) => {
        //console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  } else if (activeCategory == 7) {
    getAllBooth()
      .then((res) => {
        //console.log(res);
        setData(res.data);
      })
      .then((err) => {
        // alert('생성된 마커가 존재하지 않습니다.');
      });
  }
}

export default getMarker;
