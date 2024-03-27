import { getDetailMapCategory } from "apis/apis_GET";


export function getDetailInfo(id, setClickInfo, activeCategory) {
  console.log(id, activeCategory);
  getDetailMapCategory(id)
    .then((res) => {
      console.log(res.data, '클릭 시');
      setClickInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
