import {
  getDetailAmenity,
  getDetailBooth,
  getDetailEvent,
  getDetailStore,
} from '../../apis/apis';

export function getDetailInfo(id, setClickInfo, activeCategory) {
  console.log(id, activeCategory);
  getDetailStore(id)
    .then((res) => {
      console.log(res.data, '클릭 시');
      setClickInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  // if (activeCategory == 1)
  //   getDetailEvent(id)
  //     .then((res) => {
  //       console.log(res.data, '클릭 시');
  //       setClickInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // else if (activeCategory == 2) {
  //   getDetailStore(id)
  //     .then((res) => {
  //       console.log(res.data, '클릭 시');
  //       setClickInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // } else if (activeCategory == 3) {
  //   getDetailStore(id)
  //     .then((res) => {
  //       console.log(res.data, '클릭 시');
  //       setClickInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // } else if (activeCategory == 4) {
  //   getDetailBooth(id)
  //     .then((res) => {
  //       console.log(res.data, '클릭 시');
  //       setClickInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // } else if (activeCategory == 5) {
  //   getDetailAmenity(id)
  //     .then((res) => {
  //       console.log(res.data, '편의시설');
  //       setClickInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
