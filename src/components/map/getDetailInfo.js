import { getDetailmapCategory } from '../../apis/apis';

export function getDetailInfo(id, setClickInfo, activeCategory) {
  console.log(id, activeCategory);
  getDetailmapCategory(id)
    .then((res) => {
      console.log(res.data, '클릭 시');
      setClickInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
