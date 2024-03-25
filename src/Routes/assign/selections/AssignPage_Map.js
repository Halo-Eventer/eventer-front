import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Assign from 'components/assign/Assign';
import { Wrapper } from 'Routes/assign/AssignPage_Home';
import Assign_List from 'components/assign/Assign_List';
import { AssignBox, Assign_Blank } from 'Routes/assign/AssignPage_Home';
import {
  MiddleBar_Component2,
  UpperBar_Component,
} from 'components/assign/Assign_Bar';
import {
  boardListState,
  cancleState,
  categoryState_assign,
  infoState,
  itemIDState,
  modeState,
  typeState
} from 'recoils/atoms_assign';
import { InitInfo } from 'utils/InitInfo';
import { mapCategory } from 'constants/Const_Assign';
import fetchDetail from 'utils/fetchDetail';
import fetchList from 'utils/fetchList';



function AssignPage_Map() {
  //*****전역 recoil모음*****
  const [boardList, setBoardList]=useRecoilState(boardListState);
  const [type, setType]=useRecoilState(typeState);
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [mode, setMode] = useRecoilState(modeState);
  const [cancle, setCancle] = useRecoilState(cancleState);
  const [itemID, setItemID] = useRecoilState(itemIDState);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****


  const festivalId = useParams().id;

  const [categoryList, setCategoryList] = useState(mapCategory);

  useEffect(() => {
    setCategory('concert');
    setType('');
    setBoardList([]);
  }, [])

  useEffect(() => {
    console.log('type:', type);
  }, [type]);

  useEffect(() => {
    console.log('cateogry, type:', category, type);
    setCancle(true);
    setMode('');
    setInfo(InitInfo(category, type));
    fetchList(festivalId, category, type, setBoardList);
  }, [category, type]);

  useEffect(() => {
    console.log('mode:', mode);
    if (mode == 'a') {
      setInfo(InitInfo(category, type));
      //객체나 배열의 setState는 무조건 [...] 또는 {...} 활용
      setCancle(false);
    } else if (mode == 'r') {
      setInfo(InitInfo(category, type));
      fetchDetail(category,itemID,setInfo);
      setCancle(false);
    } else if (mode == 'f') {
      fetchList(festivalId, category,type,setBoardList);
      setCancle(true);
      setMode('');
    }
  }, [mode, itemID]);

  return (
    <Wrapper style={{ height: 'auto' }}>
      <UpperBar_Component />
      <MiddleBar_Component2 text="축제 지도"/>

      <AssignBox>

        <Assign_List categoryList={categoryList}/>

        {cancle ? (
          <Assign_Blank />
        ) : (
          <Assign />
        )}
      </AssignBox>
    </Wrapper>
  );
}

export default AssignPage_Map;
