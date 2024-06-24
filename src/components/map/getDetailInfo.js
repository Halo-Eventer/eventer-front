import { getDetailMapCategory } from 'apis/apis_get';

export function getDetailInfo(id, setClickInfo, activeCategory) {
  getDetailMapCategory(id)
    .then((res) => {
      // console.log(res.data, '클릭 시');
      setClickInfo(res.data);
    })
    .catch((err) => {
      // console.log(err);
    });
}
