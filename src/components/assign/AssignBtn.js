import styled from 'styled-components';
import { assignApi, assignMenuApi, reviseApi, reviseMenuApi } from '../../apis/apis';
import { Flex } from 'asset/Style';

function AssignBtn(props) {
  const festivalId = 1;

  const assignBoard = () => {
    console.log(props.info);
    let tmp = window.confirm("추가하시겠습니까?");

    if (tmp)
      assignApi(props.info, props.category, festivalId)
        .then((response) => {
          if (typeof(response.data)==='string') {
            console.log("response.data : ", response.data);
            alert("해당 항목이 성공적으로 추가되었습니다");
            props.setMode("f");
          }
          else
            console.log("no response.data ;(");
        })
        .catch((error) => {
          console.log('postData error : ', error);
        })
  }
  const assignMarker = () => {
    console.log(props.info);
    let tmp = window.confirm("추가하시겠습니까?");

    if (tmp)
      assignApi(props.info, props.category, festivalId)
        .then((res) => {
          if (res.data.storeId) {
            console.log("일단 가게등록은 성공",res.data.storeId, props.info.menus);
            assignMenuApi(res.data.storeId, props.info.menus)
              .then((res) => {
                console.log("res.data(menu) : ", res.data);
                alert('해당 항목이 성공적으로 추가되었습니다.');
                props.setMode("f");
              })
              .catch((err) => {
                alert('메뉴를 다시 추가해주십시오.');
              });
          } else {
            console.log("res.data(not menu) : ", res.data);
            alert('해당 항목이 성공적으로 추가되었습니다.');
            props.setMode("f");
          }
        })
        .catch((err) => {
          console.log("등록 실패");
          alert(err.data);
        });
  };

  const reviseBoard = (id) => {
    console.log(props.info);
    let tmp = window.confirm("수정하시겠습니까?");

    if (tmp)
      reviseApi(props.info, props.category, id)
        .then((response) => {
          if (typeof(response.data) === 'object') {
            console.log("response.data : ", response.data);
            alert("해당 항목이 성공적으로 수정되었습니다.");
            props.setMode("f");
          }
          else
            console.log("no response.data ;(");
        })
        .catch((error) => {
          console.log('patchData error : ', error);
        })
  }
  const reviseMarker = (id) => {
    console.log(props.info);
    let tmp = window.confirm("수정하시겠습니까?");
    id = Number(id) 
      //path의 id 자료형은 Number로 할 것 (자료형 안 맞으면 백에서 undefined로 처리됨.)
      //일단 태그에서 target해서 받아오는 값들은 웬만하면 string
    if (tmp)
      reviseApi(props.info, props.category, id)
        .then((res) => {
          if (res.data.storeId) {
            console.log(res.data.storeId);
            reviseMenuApi(props.info.menus)
              .then((res) => {
                alert('해당 항목이 성공적으로 수정되었습니다.');
                props.setMode("f");
              })
              .catch((err) => {
                alert('메뉴를 다시 수정해주십시오.');
              });
          } else {
            alert('수정되었습니다.');
            console.log('revise succenss', res.data);
            props.setMode("f");
          }
        })
        .catch((err) => {
          alert(err.data);
        });
  };

  const onClick_cancle = () => {
    props.setCancle(true);
    props.setMode("");
  }

  return (
    <Flex>
      <Button onClick={onClick_cancle} cancle={true}>취소하기</Button>

      {props.mode == 'a'
        ?
        props.category == 'notice'
          ?
          <Button onClick={assignBoard}>추가하기</Button>
          :
          <Button onClick={assignMarker}>추가하기</Button>
        :
        props.category == 'notice'
          ?
          <Button onClick={() => reviseBoard(props.itemID)}>수정하기</Button>
          //onClick함수에 인자넣는 함수를 넣을 때 화살표함수로 넣을 것
          :
          <Button onClick={() => reviseMarker(props.itemID)}>수정하기</Button>
      }
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
