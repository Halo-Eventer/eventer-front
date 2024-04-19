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
import { popUpApi } from 'apis/apis_PATCH';
import { bannerApi } from 'apis/apis_POST';
import { deleteDetail } from 'apis/apis_DELETE';
import Assign_ListBoard from './Assign_ListBoard';

function Assign_List(props) {
  //*****전역 recoil모음*****
  const [boardList, setBoardList] = useRecoilState(boardListState);
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [type, setType] = useRecoilState(typeState);
  const [mode, setMode] = useRecoilState(modeState);
  //*****전역 recoil모음*****

  const [selectedDrop, setSelectedDrop] = useState('');
  const [categoryEntries, setCategoryEntries] = useState([]);
  const [showList, setShowList] = useState(false);
  const [upText, setUpText] = useState('');

  const onClick_dropDown = () => {
    setShowList((prev) => !prev);
  };

  const onClick_drops = (event) => {
    event.preventDefault();
    const index = event.currentTarget.value;
    setCategory(categoryEntries[index][0]);

    if (typeof categoryEntries[index][1] == 'object') {
      const index2 = event.currentTarget.id;
      // console.log('index, index2 :', index, index2);
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

  useEffect(() => {
    if (category === 'notice') {
      setUpText('메인');
    } else setUpText('팝업');
  }, [category]);

  // console.log('boardList:', boardList);
  // console.log('category, type : ', category, type);

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

      <Assign_ListBoard upText={upText} />
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
`;

const DropDown = styled.div`
  width: 544px;

  margin-bottom: 8px;

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

  width: 544px;

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
  background: #ddd;

  margin-bottom: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  cursor: pointer;

  h1 {
    height: 32px;

    color: #111;

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

const BoardElement = styled.div``;
const ListBoard = styled.div`
  min-height: 504px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${(props) => props.category === 'notice' && 'gap:12px;'}

  ${BoardElement} {
    width: 544px;
    height: 48px;
    flex-shrink: 0;

    /* border: 1px solid #ddd;
    border-radius:4px; */

    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: ${(props) =>
      props.category === 'notice' ? 'flex-end' : 'center'};

    padding: 4px;

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
