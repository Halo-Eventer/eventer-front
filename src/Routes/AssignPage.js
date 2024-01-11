import { assignStoreApi } from '../apis/apis';

function AssignPage() {
  const assignStore = () => {
    console.log('요청');
    assignStoreApi()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={assignStore}>상점 등록하기</button>
    </div>
  );
}

export default AssignPage;
