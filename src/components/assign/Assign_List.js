import { useState, useEffect } from 'react';
import styled from 'styled-components';

import dropDown2 from 'asset/images/DropDown2.svg';
import plus from 'asset/images/Plus.svg';

import { useRecoilState } from 'recoil';
import {
  boardListState,
  categoryState_assign,
  itemIDState,
  modeState,
  typeState,
} from 'recoils/atoms_assign';
import { Flex } from 'asset/Style';
import { festivalId } from 'Routes/Home';
import fetchList from 'utils/fetchList';
import { popUpApi } from 'apis/apis_PATCH';
import { bannerApi } from 'apis/apis_POST';
import { deleteDetail } from 'apis/apis_DELETE';

function Assign_List(props) {
  //*****전역 recoil모음*****
  const [boardList, setBoardList] = useRecoilState(boardListState);
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [type, setType] = useRecoilState(typeState);
  const [mode, setMode] = useRecoilState(modeState);
  const [itemID, setItemID] = useRecoilState(itemIDState);
  //*****전역 recoil모음*****

  const [selectedDrop, setSelectedDrop] = useState('');
  const [categoryEntries, setCategoryEntries] = useState([]);
  const [showList, setShowList] = useState(false);

  const onClick_dropDown = () => {
    setShowList((prev) => !prev);
  };

  const onClick_drops = (event) => {
    event.preventDefault();
    const index = event.currentTarget.value;
    setCategory(categoryEntries[index][0]);

    if (typeof categoryEntries[index][1] == 'object') {
      const index2 = event.currentTarget.id;
      console.log('index, index2 :', index, index2);
      //            console.log("type : ",categoryEntries[index][1][index2]);
      setType(categoryEntries[index][1][index2].eng);
    } else setType('');

    setSelectedDrop(event.currentTarget.textContent);

    setShowList(false);
  };

  const onClick_add = (event) => {
    event.preventDefault();
    setMode('a');
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

  const onClick_delete = (event) => {
    event.preventDefault();

    const id = event.currentTarget.id;
    let ref = boardList[event.currentTarget.dataset.value];
    let title;
    if (category === 'notice') title = ref.title;
    else title = ref.name;

    console.log('id, title : ', id, title);
    let tmp = window.confirm(`'${title}' 항목을 삭제하시겠습니까?`);

    if (tmp)
      deleteDetail(category, id)
        .then((response) => {
          if (typeof response.data === 'string') {
            alert(`'${title}' 항목이 성공적으로 삭제되었습니다.`);
            console.log(response.data);
            setMode('f');
          } else console.log('fail : ', response.data);
        })
        .catch((error) => {
          console.log('error : ', error);
        });
  };

  useEffect(() => {
    setCategoryEntries(Object.entries(props.categoryList));
  }, []);

  useEffect(() => {
    if (category == 'notice')
      //for 게시글
      setSelectedDrop('공지사항');
    else if (categoryEntries[0] !== undefined)
      //그 외
      setSelectedDrop(categoryEntries[0][1]);
  }, [categoryEntries]);

  console.log('boardList:', boardList);
  console.log('category, type : ', category, type);

  return (
    <Wrapper>
      {(category == 'notice' || categoryEntries?.length > 1) && (
        <DropDown>
          <DropDownBar onClick={onClick_dropDown}>
            <h1>{selectedDrop}</h1>
            <img src={dropDown2}></img>
          </DropDownBar>
          {showList && (
            <DropDownlist>
              {categoryEntries.map((item, index) => {
                if (typeof item[1] === 'object') {
                  //'category'가 객체인 경우 (marker, notice 등)
                  return item[1].map((item2, index2) => {
                    if (item2 != selectedDrop)
                      return (
                        <button
                          key={index2}
                          id={index2}
                          value={index}
                          onClick={onClick_drops}
                        >
                          {item2.kor}
                        </button>
                      );
                  });
                  //return (컴포넌트 배열) => 컴포넌트들 렌더링해줌
                }
                if (item[1] != selectedDrop)
                  return (
                    <button key={index} value={index} onClick={onClick_drops}>
                      {item[1]}
                    </button>
                  );
              })}
            </DropDownlist>
          )}
        </DropDown>
      )}

      <AddBar onClick={onClick_add}>
        <img src={plus} />
        <h1>{selectedDrop} 추가</h1>
      </AddBar>
      {boardList.length > 0 && (
        <ListBoard>
          {boardList.map((item, index) => (
            <div key={index}>
              <h1 onClick={onClick_revise} id={item.id} data-index={index}>
                {category === 'notice' ? item.title : item.name}
              </h1>
              <h2 onClick={onClick_delete} id={item.id} data-value={index}>
                삭제
              </h2>
            </div>
          ))}
        </ListBoard>
      )}
    </Wrapper>
  );
}

export default Assign_List;

const Wrapper = styled.div`
  position: relative;

  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const DropDown = styled.div`
  width: 544px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const DropDownBar = styled.div`
  width: 100%;
  height: 48px;
  flex-shrink: 0;

  border-radius: 4px;
  border: 1px solid #eee;

  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  h1 {
    height: 24px;
    margin: 0;
    padding: 0;

    color: #111;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 160% */
  }
  img {
    width: 24px;
    height: 24px;
  }
`;

const DropDownlist = styled.ol`
  position: absolute;
  top: 48px;

  width: 100%;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  button {
    width: 100%;
    height: 48px;
    flex-shrink: 0;

    border-radius: 4px;
    border: 1px solid #eee;
    background-color: white;

    color: #111;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;

    cursor: pointer;
    z-index: 2;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px;
  }
`;

const AddBar = styled.div`
  width: 544px;
  height: 48px;
  flex-shrink: 0;

  border-radius: 4px;
  background: #f2f2f2;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 4px;

  cursor: pointer;

  h1 {
    height: 32px;

    color: #111;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 188.235% */
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const ListBoard = styled.div`
  height: ${(n) => 48 * n.pagenum}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  div {
    width: 544px;
    height: 48px;
    flex-shrink: 0;

    background-color: white;
    border: none;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 4px;
    h1 {
      margin: 0;
      padding: 0;

      height: 32px;

      color: #111;
      font-family: Pretendard;
      font-size: 17px;
      font-style: normal;
      font-weight: 500;
      line-height: 32px; /* 188.235% */

      cursor: pointer;
    }

    h2 {
      margin: 0;

      height: 32px;

      color: #f00;
      text-align: center;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 160% */

      padding: 4px 8px;
      justify-content: center;
      align-items: center;

      cursor: pointer;
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
`;
