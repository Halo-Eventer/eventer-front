import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Assign from '../../components/assign/Assign';
import { Wrapper } from './AssignPage_Home';
import Assign_List from '../../components/assign/Assign_List';
import { AssignBox, Assign_Blank} from './AssignPage_Home';
import { getAll, getDetail } from '../../apis/apis';
import {
  MiddleBar_Component2,
  UpperBar_Component,
} from 'components/assign/Assign_Bar';
import { useRecoilState } from 'recoil';
import { cancleState, categoryState_assign, infoState, itemIDState, modeState } from 'recoils/atoms_assign';
import { InitInfo } from 'utils/InitInfo';

function AssignPage_Map() {
  //*****전역 recoil모음*****
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [mode, setMode] = useRecoilState(modeState);
  const [cancle, setCancle] = useRecoilState(cancleState);
  const [itemID, setItemID] = useRecoilState(itemIDState);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****


  const id_param = useParams().id;

  const [categoryList, setCategoryList] = useState({
    concert: '콘서트',
    booth: '관광지',
    store: [
      '관리자',
      '관광안내소',
      '편의점',
      '화장실',
      '쓰레기통',
      '흡연장',
      '주차장',
    ],
  });
  const [type, setType] = useState('');
  const [boardList, setBoardList] = useState([]);

  const [SE, setSE] = useState('');

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
    setCategory('concert');
  }, [])

  useEffect(() => {
    console.log('type (AssignPage_Map):', type);
  }, [type]);

  useEffect(() => {
    console.log('cateogry, type (Assign_Map):', category, type);
    setCancle(true);
    setMode('');
    setInfo(InitInfo(category, type));
    fetchList();
  }, [category, type]);

  useEffect(() => {
    console.log('mode (AssignPage_Map):', mode);
    if (mode == 'a') {
      setInfo(InitInfo(category, type));
      //객체나 배열의 setState는 무조건 [...] 또는 {...} 활용
      setCancle(false);
    } else if (mode == 'r') {
      setInfo(InitInfo(category, type));
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
      <UpperBar_Component />
      <MiddleBar_Component2 text="지도" id_param={id_param} />

      <AssignBox>
        <Assign_List
          categoryList={categoryList}
          setType={setType}
          boardList={boardList}
          setBoardList={setBoardList}
          setSE={setSE}
        />

        {cancle ? (
          <Assign_Blank />
        ) : (
          <Assign/>
        )}
      </AssignBox>
    </Wrapper>
  );
}

export default AssignPage_Map;
