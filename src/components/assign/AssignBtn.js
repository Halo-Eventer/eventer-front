import styled from 'styled-components';
import { Flex } from 'asset/Style';
import { useRecoilState } from 'recoil';
import {
  cancleState,
  categoryState_assign,
  infoState,
  itemIDState,
  modeState,
  typeState,
} from 'recoils/atoms_assign';
import { assignApi, assignMenuApi } from 'apis/apis_POST';
import { reviseApi, reviseMenuApi } from 'apis/apis_PATCH';

function AssignBtn() {
  const festivalId = 1;

  //*****전역 recoil모음*****
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [type, setType] = useRecoilState(typeState);
  const [mode, setMode] = useRecoilState(modeState);
  const [cancle, setCancle] = useRecoilState(cancleState);
  const [itemID, setItemID] = useRecoilState(itemIDState);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****

  

  const assignPost = () => {
    console.log('info:', info);

    let tmp = window.confirm('추가하시겠습니까?');

    if (tmp)
      assignApi(info, category, festivalId)
        .then((response) => {
          if (typeof response.data === 'string') {
            console.log('response.data, type : ', response.data, type);
            alert('해당 항목이 성공적으로 추가되었습니다');
            setMode('f');
          } else console.log('no response.data ;(');
        })
        .catch((error) => {
          console.log('postData error : ', error);
        });
  };

  const assignMarker = () => {
    console.log('info:', info);

    let tmp = window.confirm('추가하시겠습니까?');

    if (tmp)
      assignApi(info, category, festivalId)
        .then((res) => {
          if (res.data.mapId) {
            // console.log('일단 가게등록은 성공', res.data.mapId, info.menus);
            // assignMenuApi(res.data.mapId, info.menus)
            //   .then((res) => {
            //     console.log('res.data(menu) : ', res.data);
            //     alert('해당 항목이 성공적으로 추가되었습니다.');
            //     setMode('f');
            //   })
            //   .catch((err) => {
            //     alert('메뉴를 다시 추가해주십시오.');
            //   });
            alert(`${info.title}이 성공적으로 추가되었습니다.`);
          } else {
            console.log('res.data(not menu) : ', res.data);
            alert('해당 항목이 성공적으로 추가되었습니다.');
            setMode('f');
          }
        })
        .catch((err) => {
          console.log('등록 실패');
          alert(err.data);
        });
  };

  const revisePost = (id) => {
    console.log(info);
    let tmp = window.confirm('수정하시겠습니까?');

    if (tmp)
      reviseApi(info, category, id)
        .then((response) => {
          if (typeof response.data === 'object') {
            console.log('response : ', response);
            alert('해당 항목이 성공적으로 수정되었습니다.');
            setMode('f');
          } else console.log('no response.data ;(');
        })
        .catch((error) => {
          console.log('patchData error : ', error);
        });
  };
  const reviseMarker = (id) => {
    console.log(info);
    let tmp = window.confirm('수정하시겠습니까?');
    id = Number(id);
    //path의 id 자료형은 Number로 할 것 (자료형 안 맞으면 백에서 undefined로 처리됨.)
    //태그에서 target해서 받아오는 값들은 string

    if (tmp)
      reviseApi(info, category, id)
        .then((res) => {
          if (res.data.mapId) {
            console.log(res.data.mapId);
            reviseMenuApi(info.menus)
              .then((res) => {
                alert('해당 항목이 성공적으로 수정되었습니다.');
                setMode('f');
              })
              .catch((err) => {
                alert('메뉴를 다시 수정해주십시오.');
              });
          } else {
            alert('수정되었습니다.');
            console.log('revise succenss', res.data);
            setMode('f');
          }
        })
        .catch((err) => {
          alert(err.data);
        });
  };

  const onClick_cancle = () => {
    setCancle(true);
    setMode('');
  };

  return (
    <Flex>
      <Button onClick={onClick_cancle} cancle={true}>
        취소하기
      </Button>

      {mode == 'a' ? (
        category == 'notice' ? (
          <Button onClick={assignPost}>추가하기</Button>
        ) : (
          <Button onClick={assignMarker}>추가하기</Button>
        )
      ) : category == 'notice' ? (
        <Button onClick={() => revisePost(itemID)}>수정하기</Button>
      ) : (
        //onClick함수에 인자넣는 함수를 넣을 때 화살표함수로 넣을 것
        <Button onClick={() => reviseMarker(itemID)}>수정하기</Button>
      )}
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
