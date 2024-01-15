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
        console.log(err);
      });
  } else if (activeCategory == 2) {
    getAllStore()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  } else if (activeCategory == 3) {
    getAllStore()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  } else if (activeCategory == 4) {
    getAllBooth()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  } else if (activeCategory == 5) {
    getAllAmenity()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }
}

export default getMarker;
