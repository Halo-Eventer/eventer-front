import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Assign from '../components/assign/Assign';
import { Wrapper } from './AssignPage_Home';
import { GlobalStyles } from './Info';

import Assign_List from '../components/assign/Assign_List';
import { AssignBox, Assign_Blank, firstInfo } from './AssignPage_Home';

import { getAll, getDetail } from '../apis/apis';

import {
  MiddleBar_Component3,
  UpperBar_Component,
} from 'components/assign/Assign_Bar';

function AssignPage_Map() {
  const id_param = useParams().id;

  const [category, setCategory] = useState('concert');
  const [categoryList, setCategoryList] = useState({
    concert: '콘서트',
    booth: '부스',
    amenity: '편의시설',
    store: ['주점', '푸드트럭'],
  });
  const [type, setType] = useState('');
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [itemID, setItemID] = useState(1);

  const [mode, setMode] = useState('');
  const [cancle, setCancle] = useState(true);

  const [info, setInfo] = useState({});

  useEffect(() => {
    console.log('type (AssignPage_Map):', type);
  }, [type]);

  const fetchList = () => {
    const festivalId = id_param;
    getAll(festivalId, category, type)
      .then((response) => {
        if (response.data.length > 0) {
          console.log('fetch List success', response.data);
          setBoardList(response.data);
        } else {
          console.log('fetch List no data ;(', response);
          setBoardList([]);
        }
      })
      .catch((error) => {
        console.log('fetch List error', error);
      });
  };

  const fetchDetail = () => {
    getDetail(category, itemID)
      .then((response) => {
        if (typeof response.data === 'object') {
          console.log('fetch Detail success', response.data);
          setInfo(response.data);
        } else {
          console.log('fetch Detail no data ;(', response);
        }
      })
      .catch((error) => {
        console.log('fetch Detail error', error);
      });
  };

  useEffect(() => {
    console.log('cateogry (Assign_Notice):', category);
    setCancle(true);
    setMode('');
    setInfo(firstInfo(category));
    fetchList();
  }, [category]);

  useEffect(() => {
    console.log('mode (AssignPage_Map):', mode);
    if (mode == 'a') {
      setInfo(firstInfo(category));
      //객체나 배열의 setState는 무조건 [...] 또는 {...} 활용
      setCancle(false);
    } else if (mode == 'r') {
      fetchDetail();
      setCancle(false);
    } else if (mode == 'f') {
      fetchList();
      setCancle(true);
      setMode('');
    }
  }, [mode, itemID]);

  return (
    <Wrapper style={{ height: 'auto' }}>
      <GlobalStyles />
      <UpperBar_Component />
      <MiddleBar_Component3 text="지도" id_param={id_param} />

      <AssignBox>
        <Assign_List
          category={category}
          setCategory={setCategory}
          categoryList={categoryList}
          setType={setType}
          boardList={boardList}
          setBoardList={setBoardList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageNum={pageNum}
          totalPages={totalPages}
          itemid={itemID}
          setItemID={setItemID}
          setMode={setMode}
          setCancle={setCancle}
        />

        {cancle ? (
          <Assign_Blank />
        ) : (
          <Assign
            category={category}
            cancle={cancle}
            mode={mode}
            setMode={setMode}
            type={type}
            itemID={itemID}
            info={info}
            setInfo={setInfo}
            setCancle={setCancle}
          />
        )}
      </AssignBox>

      {/* <FlexBox_Column>

          <InputBox>
            <SemiTitle>카테고리</SemiTitle>
            <Category name="category" onChange={handleInfo}>
              <option value="notice">공지사항</option>
              <option value="event">이벤트</option>
            </Category>
          </InputBox>
          <Assign_Info_Add category={category} />
          // <Assign_Info_Revise category={category}/> 

        </FlexBox_Column> */}
    </Wrapper>
  );
}

export default AssignPage_Map;
