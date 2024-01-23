import styled from 'styled-components';
import { assignApi } from '../../apis/apis';
import { Flex } from 'asset/Style';

function AssignBtn(props) {
  console.log(props);
  const assignMarker = () => {
    assignApi(
      props.info,
      props.category,
      props.img,
      props.thumbnail,
      props.menus
    )
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.data);
      });
  };
  return (
    <Flex>
      <Button cancle={true}>취소하기</Button>
      <Button onClick={assignMarker}>추가하기</Button>
    </Flex>
  );
}

export default AssignBtn;

const Button = styled.button`
  width: 172px;
  height: 48px;
  border-radius: 4px;
  background: #4f33f6;

  color: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  line-height: 32px; /* 213.333% */
  &:hover {
    cursor: pointer;
  }
  border: 0;

  ${(props) => {
    return props.cancle
      ? 'color: #111; background: #F2F2F2;'
      : 'margin-left: 8px';
  }}
`;
