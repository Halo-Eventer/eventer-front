import { getAll, getBannerRank } from 'apis/apis_GET';
import { bannerRankApi } from 'apis/apis_PATCH';
import { Flex } from 'asset/Style';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { boardListState, categoryState_assign, modeState } from 'recoils/atoms_assign';
import styled from 'styled-components';

function Assign_UpList({
  upText,
  upList,
  setUpList,
  onClick_delete,
  onClick_revise,
  onClick_upDown }) {

  //*****전역 recoil모음*****
  const [category, setCategory] = useRecoilState(categoryState_assign);
  //*****전역 recoil모음*****


  const mainUpText = '메인';
  const popUpText = '팝업';

  const [revisable, setRevisable] = useState(false);


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

    setRevisable(true);
  }

  const onClick_rank = () => {
    let rank = 1;
    let bannerList = [];
    let upList_len = upList.length;

    for (let i = 0; i < upList_len; i++) {
      let { id } = upList[i];
      bannerList.push({ noticeId: id, rank: rank });
      rank++;
    }

    console.log("bannerList:", bannerList);

    let tmp = window.confirm("메인페이지 순서를 수정하시겠습니까?")

    if (tmp) {
      bannerRankApi(bannerList)
        .then(response => {
          alert("수정되었습니다.");
          console.log(response);
          setRevisable(false);
        })
        .catch(error => alert(error));
    }
  }


  return (
    <UpListBoard category={category}>
      {category === 'notice'
        ?
        <Tip>
          <h1>
            메인페이지 등록 후 마우스로 드래그하여 해당 항목들의 순서를 정할 수 있습니다.
            <br />
            메인페이지에 등록 가능한 게시글 수는 최대 10개입니다.
          </h1>
          <RankBtn
            revisable={revisable}
            onClick={onClick_rank}
            disabled={!revisable}>
            순서 수정하기
          </RankBtn>
        </Tip>
        :
        <Tip>
          <h2>
            팝업창은 가장 최근에 작성한 글이 먼저 표시됩니다.
          </h2>
        </Tip>
      }
      {category === 'notice'
        ?
        <DragDropContext onDragEnd={onDragEnd}>
          <UpBlock>
            <Droppable droppableId='MAIN'>
              {/* droppable(보드)과 draggable(항목) 구분 */}
              {(magic) => (
                <UpBoard
                  ref={magic.innerRef}
                  {...magic.droppableProps}>
                  {/* droppableProps라는 객체 전달 (droppableProps는 Droppable의 타입정의에서 확인 가능)*/}
                  {upList?.map((item, index) =>
                    <Draggable draggableId={item.id?.toString()} index={index} key={item.id?.toString()}>
                      {/* index, draggableId(string) 꼭 설정해줘야 함 (애니메이션 오류 발생)*/}
                      {(magic) => (
                        <UpElement ref={magic.innerRef}
                          {...magic.draggableProps}
                          {...magic.dragHandleProps}
                          id={item.id}
                          onClick={onClick_revise}>

                          <Flex
                            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                            {...magic.dragHandleProps}>
                            <h1

                              data-index={index}
                              {...magic.dragHandleProps}>
                              {category === 'notice' || category === 'urgent'
                                ? item.title
                                : item.name}
                              &nbsp;&nbsp;
                              {category === 'notice'
                                ? item.picked && (
                                  <span {...magic.dragHandleProps} style={{ color: '#4F33F6' }}>
                                    [
                                    {mainUpText}
                                    ]
                                  </span>
                                )
                                : item.popup && (
                                  <span {...magic.dragHandleProps} style={{ color: '#4F33F6' }}>
                                    [
                                    {popUpText}
                                    ]
                                  </span>
                                )}
                            </h1>

                            {category === 'notice' && (
                              <p {...magic.dragHandleProps}>
                                {item.time.slice(0, 10) + ' ' + item.time.slice(11, 19)}
                              </p>
                            )}
                          </Flex>
                          <BtnDiv {...magic.dragHandleProps}>
                            <span
                              {...magic.dragHandleProps}
                              style={{ color: '#4F33F6', marginRight: '4px' }}>
                              #{index + 1}
                            </span>

                            {(category == 'notice' ||
                              category == 'missingPerson' ||
                              category == 'urgent') && (
                                <h4
                                  id={item.id}
                                  onClick={onClick_upDown}
                                  data-value="down"
                                  data-index={index}
                                  {...magic.dragHandleProps}
                                >
                                  {upText} 내리기
                                </h4>
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

        :
        <UpBlock>
          <UpBoard>
            {upList?.map((item, index) =>
              <UpElement key={item.id} id={item.id} onClick={onClick_revise}>
                <Flex
                  style={{ flexDirection: 'column', alignItems: 'flex-start' }}>

                  <h1


                    data-index={index}>
                    {category === 'notice' || category === 'urgent'
                      ? item.title
                      : item.name}
                    &nbsp;&nbsp;
                    {category === 'notice'
                      ? item.picked && (
                        <span style={{ color: '#4F33F6' }}>
                          [
                          {mainUpText}
                          ]
                        </span>
                      )
                      : item.popup && (
                        <span style={{ color: '#4F33F6' }}>
                          [
                          {popUpText}
                          ]
                        </span>
                      )}
                  </h1>

                  {category === 'notice' && (
                    <p>
                      {item.time.slice(0, 10) + ' ' + item.time.slice(11, 19)}
                    </p>
                  )}
                </Flex>
                <BtnDiv>
                  <span
                    style={{ color: '#4F33F6', marginRight: '4px' }}>
                    #{index + 1}
                  </span>
                  
                  {(category == 'notice' ||
                    category == 'missingPerson' ||
                    category == 'urgent') && (
                      <h4
                        id={item.id}
                        onClick={onClick_upDown}
                        data-value="down"
                        data-index={index}>
                        {upText} 내리기
                      </h4>
                    )}
                  
                  <h2
                    onClick={onClick_delete}
                    id={item.id}
                    data-index={index}>
                    삭제
                  </h2>
                </BtnDiv>
              </UpElement>
              /* dragHandleProps라는 객체 전달 (dragHandleProps는 Draggable의 타입정의에서 확인 가능)*/
            )}
          </UpBoard>
          {/* children으로 함수 요구 */}
        </UpBlock>
      }

    </UpListBoard>
  );

}

export default Assign_UpList;


const UpElement = styled.div``;
const UpBoard = styled(Flex)``;
const UpBlock = styled(Flex)``;
const UpListBoard = styled.div`

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
    padding:8px 12px;
    

    width: 544px;
    height: 56px;
    flex-shrink: 0;

    /* border: 1px solid #ddd;
    border-radius:4px; */

    display: flex;
    justify-content: space-between;
    align-items: ${(props) =>
    props.category === 'notice' ? 'flex-end' : 'center'};

    cursor:pointer;
    h1 {
      margin: 0;
      padding: 0;

      color: #111;

      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;

      cursor: pointer;
    }

    p {
      color: #888;
      font-size: 12px;
    }
    }
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

  cursor:pointer;
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

const Tip = styled(Flex)`
position:relative;

width:544px;
margin:8px;

justify-content:space-between;
align-items:center;

h1{
margin-left:12px;

font-size:12px;
font-weight:400;
}

h2{
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);

font-size:12px;
font-weight:400;
}
`;

const RankBtn = styled.button`
width:100px;
height:25px;
font-family:Pretendard;

${props => props.revisable
    ?
    'background-color:#4f33f6; cursor:pointer;'
    :
    'background-color:#DDD; cursor:auto;'}

border-radius:4px;
color : white;

margin-right:16px;

`;
//반드시 대문자로 시작해야함(컴포넌트라서)

const HR = styled.div`
width: 540px;
height:1px;

background-color:#CCC;

${props => props.up_length == 0 && 'margin-top:-6px;'}
`;
