import { deleteDetail } from 'apis/apis_DELETE';
import { popUpApi } from 'apis/apis_PATCH';
import { bannerApi } from 'apis/apis_POST';
import { Flex } from 'asset/Style';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { boardListState, categoryState_assign, itemIDState, modeState, typeState } from 'recoils/atoms_assign';
import styled from 'styled-components';
import Assign_UpList from './Assign_UpList';
import { getAll, getBannerRank } from 'apis/apis_GET';
import { useParams } from 'react-router-dom';

function Assign_ListBoard({ upText }) {
  const { id: festivalId } = useParams();

  //*****전역 recoil모음*****
  const [boardList, setBoardList] = useRecoilState(boardListState);
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [type, setType] = useRecoilState(typeState);
  const [mode, setMode] = useRecoilState(modeState);
  const [itemID, setItemID] = useRecoilState(itemIDState);
  //*****전역 recoil모음*****

  const [upList, setUpList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [rankList, setRankList] = useState([]);
  const [tmpList, setTmpList] = useState([]);

  const mainUpText = '메인';
  const popUpText = '팝업';


  const onClick_delete = (event) => {
    event.preventDefault();

    const id = event.currentTarget.id;
    let element =
      boardList[event.currentTarget.dataset.index] ||
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
      boardList[event.currentTarget.dataset.index] ||
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

  useEffect(() => {
    // 공지사항/이벤트일 경우 둘을 합쳐서 upList 제작 (배너에는 공지사항, 이벤트 둘다 들어가기 때문)
    console.log("첫번째 useEffect");
    if (category === 'notice') {
        getAll(festivalId, category, "NOTICE")
          .then(response => {
            setNoticeList(response.data.filter((item) => {
              return item.picked;
            }))
            console.log("NOTICE list:", response)
          })
          .catch(error => console.log(error))

        getAll(festivalId, category, "EVENT")
          .then(response => {
            setEventList(response.data.filter((item) => {
              return item.picked;
            }))
            console.log("EVENT list:", response)
          })
          .catch(error => console.log(error))
    }
  }, [boardList,mode]);


  useEffect(()=>{
    if (category === 'notice')
      setTmpList([...noticeList,...eventList])
    else {
      let tmp_up = [];
      tmp_up = boardList.filter((item) => {
        return item.popup;
      });
      console.log("tmp_up:", tmp_up);

      setUpList([...tmp_up].sort((a,b)=>b.id-a.id));
      //이게 역순(첫 번째에서 두 번째 뺴는게 정순)
    }
  },[noticeList,eventList,boardList])



  useEffect(() => { //RankList 통신 및 제작
    getBannerRank()
      .then(response => {
        setRankList(response.data.sort((a, b) => a.rank - b.rank));
        console.log("rankList:", response.data);
      })
      .catch(error => console.log(error));
  }, [boardList]);



  useEffect(() => { // 공지사항/이벤트 인 경우 upList를 배너 순서에 맞게 다시 정렬
    let tmp_sorted = [];

    if (category === 'notice') {

      const rankList_len = rankList.length;
      const tmpList_len = tmpList.length;

      for (let i = 0; i < rankList_len; i++) {
        for (let j = 0; j < tmpList_len; j++) {
          if (rankList[i].id === tmpList[j].id) {
            tmp_sorted.push(tmpList[j]);
            break;
          }
        }
      }
      setUpList(tmp_sorted);
    }

  }, [rankList,tmpList,boardList])

  /* useEffect들끼리 state인자 잘 살펴볼 것 (setState종류와 인자 종류)
  1. 맨 아래 useEffect는 rankList -> setUpList 구조임
  2. 때문에 첫 번째 useEffect에서 setRankList와 setUpList가 같이 있으면 안 됨. useEffect를 따로 둘 것
    ([upList]=>{setUpList}의 무한루프를 피해야하는데 setRankList, setUpList 이 둘이 같이 있다면
      무한루프 상황을 맞이할 수 밖에 없음)
  */

  console.log("upList, rankList", upList,rankList);
  return (
    <div style={{ flexDirection: 'column', alignItems: 'center' }}>

      <Assign_UpList
        upText={upText}
        upList={upList}
        setUpList={setUpList}

        onClick_delete={onClick_delete}
        onClick_revise={onClick_revise}
        onClick_upDown={onClick_upDown}
      />

      <HR up_length={upList.length} />

      <DownListBoard category={category}>
        {boardList?.map((item, index) => (
          <BoardElement key={item.id.toString()} id={item.id} onClick={onClick_revise}>
            <Flex
              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <h1 data-index={index}>
                {category === 'notice' || category === 'urgent'
                  ? item.title
                  : item.name}
                &nbsp;&nbsp;
                {category === 'notice'
                  ? item.picked && (
                    <span style={{ color: '#4F33F6' }}>[{mainUpText}]</span>
                  )
                  : item.popup && (
                    <span style={{ color: '#4F33F6' }}>[{popUpText}]</span>
                  )}
              </h1>

              {category === 'notice' && (
                <p>
                  {item.time.slice(0, 10) + ' ' + item.time.slice(11, 19)}
                </p>
              )}
            </Flex>
            <BtnDiv>
              {category == 'notice'
                &&
                (!item.picked
                  &&
                  <h3
                    id={item.id}
                    onClick={onClick_upDown}
                    data-value="up"
                    data-index={index}
                  >
                    {upText} 올리기
                  </h3>
                )}

              {(category == 'missingPerson' ||
                category == 'urgent')
                &&
                (!item.popup
                  &&
                  <h3
                    id={item.id}
                    onClick={onClick_upDown}
                    data-value="up"
                    data-index={index}
                  >
                    {upText} 올리기
                  </h3>
                )}
              <h2 onClick={onClick_delete} id={item.id} data-index={index}>
                삭제
              </h2>
            </BtnDiv>
          </BoardElement>
        ))}
      </DownListBoard>
    </div>
  );

}

export default Assign_ListBoard;


const BoardElement = styled.div``;
const DownListBoard = styled.div`
min-height: 504px;

display: flex;
flex-direction: column;
justify-content: flex-start;
align-items:center;

gap:8px;



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

  padding: 8px 12px;

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

const HR = styled.div`
width: 540px;
height:1px;

background-color:#CCC;

margin:8px;
`;
