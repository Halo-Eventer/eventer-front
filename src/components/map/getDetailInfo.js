import { getDetailStore } from '../../apis/apis';

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
}
