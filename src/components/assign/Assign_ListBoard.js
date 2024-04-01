import { deleteDetail } from 'apis/apis_DELETE';
import { popUpApi } from 'apis/apis_PATCH';
import { bannerApi } from 'apis/apis_POST';
import { Flex } from 'asset/Style';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { boardListState, categoryState_assign, itemIDState, modeState, typeState } from 'recoils/atoms_assign';
import styled from 'styled-components';

function Assign_ListBoard({ upText }) {
  //*****전역 recoil모음*****
  const [boardList, setBoardList] = useRecoilState(boardListState);
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [type, setType] = useRecoilState(typeState);
  const [mode, setMode] = useRecoilState(modeState);
  const [itemID, setItemID] = useRecoilState(itemIDState);
  //*****전역 recoil모음*****

  const [upList, setUpList] = useState([]);
  const [notUpList, setNotUpList] = useState([]);
  const mainUpText = '[메인]';
  const popUpText = '[팝업]';



  const onClick_delete = (event) => {
    event.preventDefault();

    const id = event.currentTarget.id;
    let element = 
      notUpList[event.currentTarget.dataset.index] ||
      upList[event.currentTarget.dataset.index];
    let title;

    if (category === 'notice') title = element.title;
    else title = element.name;

    console.log('id, title, category, type: ', id, title, category, type);
    let tmp = window.confirm(`'"${title}"' 항목을 삭제하시겠습니까?`);

    if (tmp)
      deleteDetail(category, id)
        .then((response) => {
          if (typeof response.data === 'string') {
            alert(`'"${title}"' 항목이 성공적으로 삭제되었습니다.`);
            console.log(response.data);
            setMode('f');
          } else console.log('fail : ', response.data);
        })
        .catch((error) => {
          console.log('error : ', error);
        });
  };

  const onClick_revise = (event) => {
    event.preventDefault();

    setMode('r');
    setItemID(event.currentTarget.id);

    console.log(
      'event.currentTarget.datset.index',
      event.currentTarget.dataset.index
    );
    // props.setSE(
    //     boardList[event.currentTarget.dataset.index].simpleExplanation);
  };

  const onClick_upDown = (event) => {
    event.preventDefault();
    const id = Number(event.currentTarget.id);
    const value = event.currentTarget.dataset.value;
    let element = 
      notUpList[event.currentTarget.dataset.index] ||
      upList[event.currentTarget.dataset.index];
    let title;
    if (category === 'notice' || category === 'urgent') title = element.title;
    else title = element.name;

    let up;

    if (value == 'up') up = true;
    else up = false;

    console.log('category, id, value, popUp:', category, id, value, up);

    let tmp;

    if (category === 'notice')
      tmp = window.confirm(
        up
          ? `"${title}" 항목을 메인페이지에 등록하시겠습니까?`
          : `"${title}" 항목을 메인페이지에서 삭제하시겠습니까?`
      );
    else
      tmp = window.confirm(
        up
          ? `"${title}" 항목을 팝업창에 등록하시겠습니까?`
          : `"${title}" 항목을 팝업창에서 삭제하시겠습니까?`
      );

    if (tmp) {
      if (category === 'notice')
        bannerApi(id, up)
          .then((response) => {
            alert(response.data);
            setMode('f');
          })
          .catch((error) => {
            alert(error);
          });
      else
        popUpApi(category, id, up)
          .then((response) => {
            alert(response.data);
            setMode('f');
          })
          .catch((error) => {
            alert(error);
          });
    }
  };


  const onDragEnd = ({ draggableId, destination, source }) => {
    //첫 인자는 'result'고 'DropResult'인터페이스에 따름
    //디스트럭쳐링으로 destination, source 받음
    console.log("d,d,s:", draggableId, destination, source);
    if (!destination) return;

    setUpList(oldMains => {
      const copyMains = [...oldMains];
      copyMains.splice(source.index, 1);
      //1. 드래그 중인 항목 배열에서 삭제
      copyMains.splice(destination?.index, 0, upList[source.index]);
      //2. 그리고 목적지 인덱스에 추가(splice로 삭제 및 추가 기능도 가능);
      //draggableId인 이유는 draggableId가 단순 'id'가 아니라 항목(item) 그 자체
      return copyMains;
    })
    //setState에 화살표함수 사용(return을 이용, 화살표함수의 인자는 현재 state값)
  }


  useEffect(() => {
    let tmp_up = [];
    let tmp_down = [];
    if (typeof boardList === 'object') {
      tmp_up = boardList.filter((item) => {
        if (category === 'notice') return item.picked;
        else return item.popup;
      });

      tmp_down = boardList.filter((item) => {
        if (category === 'notice') return !item.picked;
        else return !item.popup;
      });

      setUpList([...tmp_up]);
      setNotUpList([...tmp_down]);
    }
  }, [boardList]);


  console.log("upList:", upList);
  return (
    <div style={{ flexDirection: 'column', alignItems: 'center' }}>
      {boardList.length > 0 && (
        <ListBoard category={category}>
          <DragDropContext onDragEnd={onDragEnd}>
            <UpBlock>
              <Droppable droppableId='MAIN'>
                {/* droppable(보드)과 draggable(항목) 구분 */}
                {(magic) => (
                  <UpBoard
                    ref={magic.innerRef}
                    {...magic.droppableProps}>
                    {/* droppableProps라는 객체 전달 (droppableProps는 Droppable의 타입정의에서 확인 가능)*/}
                    {upList.map((item, index) =>
                      <Draggable draggableId={item.id?.toString()} index={index} key={item.id?.toString()}>
                        {/* index, draggableId(string) 꼭 설정해줘야 함 (애니메이션 오류 발생)*/}
                        {(magic) => (
                          <UpElement ref={magic.innerRef}
                            {...magic.draggableProps}
                            {...magic.dragHandleProps}>
                            <Flex
                              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                              {...magic.dragHandleProps}>
                              <h1
                                onClick={onClick_revise}
                                id={item.id}
                                data-index={index}
                                {...magic.dragHandleProps}>
                                {category === 'notice' || category === 'urgent'
                                  ? item.title
                                  : item.name}
                                &nbsp;&nbsp;
                                {category === 'notice'
                                  ? item.picked && (
                                    <span {...magic.dragHandleProps} style={{ color: '#4F33F6' }}>{mainUpText}</span>
                                  )
                                  : item.popup && (
                                    <span {...magic.dragHandleProps} style={{ color: '#4F33F6' }}>{popUpText}</span>
                                  )}
                              </h1>

                              {category === 'notice' && (
                                <p {...magic.dragHandleProps}>
                                  {item.time.slice(0, 10) + ' ' + item.time.slice(11, 19)}
                                </p>
                              )}
                            </Flex>
                            <BtnDiv {...magic.dragHandleProps}>
                              {(category == 'notice' ||
                                category == 'missingPerson' ||
                                category == 'urgent') && (
                                  <Flex {...magic.dragHandleProps}>
                                    <h4
                                      id={item.id}
                                      onClick={onClick_upDown}
                                      data-value="down"
                                      data-index={index}
                                      {...magic.dragHandleProps}
                                    >
                                      {upText} 내리기
                                    </h4>
                                  </Flex>
                                )}
                              <h2
                                onClick={onClick_delete}
                                id={item.id}
                                data-index={index}
                                {...magic.dragHandleProps}>
                                삭제
                              </h2>
                            </BtnDiv>
                          </UpElement>
                          /* dragHandleProps라는 객체 전달 (dragHandleProps는 Draggable의 타입정의에서 확인 가능)*/
                        )}
                      </Draggable>
                      /* magic의 타입(인터페이스)는 DraggableProvided */
                    )}
                    {magic.placeholder}
                    {/* 드래그 앤 드롭 하는동안 높이가 변경 안되도록 도와줌 */}
                  </UpBoard>
                )}
                {/* children으로 함수 요구 */}
              </Droppable>
            </UpBlock>
          </DragDropContext>

          <HR up_length={upList.length}/>

          {notUpList.map((item, index) => (
            <BoardElement key={item.id.toString()}>
              <Flex
                style={{ flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <h1 onClick={onClick_revise} id={item.id} data-index={index}>
                  {category === 'notice' || category === 'urgent'
                    ? item.title
                    : item.name}
                  &nbsp;&nbsp;
                  {category === 'notice'
                    ? item.picked && (
                      <span style={{ color: '#4F33F6' }}>{mainUpText}</span>
                    )
                    : item.popup && (
                      <span style={{ color: '#4F33F6' }}>{popUpText}</span>
                    )}
                </h1>

                {category === 'notice' && (
                  <p>
                    {item.time.slice(0, 10) + ' ' + item.time.slice(11, 19)}
                  </p>
                )}
              </Flex>
              <BtnDiv>
                {(category == 'notice' ||
                  category == 'missingPerson' ||
                  category == 'urgent') && (
                    <Flex>
                      <h3
                        id={item.id}
                        onClick={onClick_upDown}
                        data-value="up"
                        data-index={index}
                      >
                        {upText} 올리기
                      </h3>
                    </Flex>
                  )}
                <h2 onClick={onClick_delete} id={item.id} data-index={index}>
                  삭제
                </h2>
              </BtnDiv>
            </BoardElement>
          ))}
        </ListBoard>
      )}
    </div>
  );

}

export default Assign_ListBoard;


const UpElement = styled.div``;
const UpBoard = styled(Flex)``;
const UpBlock = styled(Flex)``;
const BoardElement = styled.div``;
const ListBoard = styled.div`
min-height: 504px;

display: flex;
flex-direction: column;
justify-content: flex-start;
align-items:center;

gap:8px;

${UpBlock}{
  ${UpBoard}{
  flex-direction:column;
  gap:8px;

    ${UpElement}{
    background-color:#e0daff;

    border-radius:4px;
    padding:8px;

    width: 544px;
    height: 56px;
    flex-shrink: 0;

    /* border: 1px solid #ddd;
    border-radius:4px; */

    display: flex;
    justify-content: space-between;
    align-items: ${(props) =>
    props.category === 'notice' ? 'flex-end' : 'center'};

    h1 {
      margin: 0;
      padding: 0;

      color: #111;

      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px;

      cursor: pointer;
    }

    p {
      color: #888;
      font-size: 12px;
    }
    }
  }
}

${BoardElement} {
  width: 544px;
  height: 56px;
  flex-shrink: 0;

  background-color:rgb(240,240,240);

  border-radius:4px;

  display: flex;
  justify-content: space-between;
  align-items: ${(props) =>
  props.category === 'notice' ? 'flex-end' : 'center'};

  padding: 8px;

  h1 {
    margin: 0;
    padding: 0;

    color: #111;

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;

    cursor: pointer;
  }

  p {
    color: #888;
    font-size: 12px;
  }
  }
  `;
  const BtnDiv = styled(Flex)`
  gap: 4px;
  align-items: center;

  ${Flex} {
  cursor: pointer;
  gap: 4px;
  }

  h2 {
  margin: 0;

  width: 42px;

  color: #f00;
  text-align: center;

  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 160% */

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  }

  h3 {
  width: 72px;
  height: 24px;

  border-radius: 4px;
  background: #e0daff;

  color: #4f33f6;
  text-align: right;

  /* flag1 */

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */

  display: flex;
  justify-content: center;
  align-items: center;
  }

  h4 {
  width: 72px;
  height: 24px;

  border-radius: 4px;
  background: #f2f2f2;

  color: #111;
  text-align: right;

  /* flag1 */

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */

  display: flex;
  justify-content: center;
  align-items: center;
  }
`;

const HR = styled.div`
width: 540px;
height:1px;

background-color:#CCC;

${props=>props.up_length==0 && 'margin-top:-4px;'}
`;