import { getAllStore } from '../apis/apis';

export function getMarker(activeCategory, setData) {
  if (activeCategory == 3) {
    getAllStore()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }
  return <div></div>;
}

export default getMarker;
