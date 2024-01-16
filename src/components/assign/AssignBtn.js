import styled from 'styled-components';
import { assignApi } from '../../apis/apis';

function AssignBtn(props) {
  const assignMarker = () => {
    assignApi(props.info, props.category, props.img, props.thumbnail)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <Button onClick={assignMarker}>마커 등록하기</Button>;
}

export default AssignBtn;

const Button = styled.button`
  margin-top: 20px;
  width: 400px;
  height: 40px;
`;
