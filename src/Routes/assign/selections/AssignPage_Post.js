import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import Assign from 'components/assign/Assign';

import {
  UpperBar_Component,
  MiddleBar_Component2,
} from 'components/assign/Assign_Bar';

import { AssignBox, Assign_Blank } from 'Routes/assign/AssignPage_Home';
import Assign_List from 'components/assign/Assign_List';

import {
  boardListState,
  cancleState,
  categoryState_assign,
  infoState,
  itemIDState,
  modeState,
  typeState,
} from 'recoils/atoms_assign';
import { useRecoilState } from 'recoil';
import { InitInfo } from 'utils/InitInfo';
import { postCategory } from 'constants/Const_Assign';
import fetchList from 'utils/fetchList';
import fetchDetail from 'utils/fetchDetail';

function AssignPage_Post() {
  //*****전역 recoil모음*****
  const [boardList, setBoardList] = useRecoilState(boardListState);
  const [type, setType] = useRecoilState(typeState);
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [mode, setMode] = useRecoilState(modeState);
  const [cancle, setCancle] = useRecoilState(cancleState);
  const [itemID, setItemID] = useRecoilState(itemIDState);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****

  const festivalId = useParams().id;

  const categoryList = postCategory;

  // const fetchDetail = () => {
  //   getDetail(category, itemID)
  //     .then((response) => {
  //       if (typeof response.data === 'object') {
  //         console.log('fetch Detail success', response.data);

  //         if (category === 'notice')
  //           setInfo({ ...response.data, simpleExplanation: SE });
  //         else setInfo(response.data);

  //       } else {
  //         console.log('fetch Detail no data ;(', response);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('fetch Detail error', error);
  //     });
  // };

  useEffect(() => {
    setCategory('notice');
    setType('NOTICE');
    setBoardList([]);
  }, []);

  useEffect(() => {
    // console.log('cateogry:', category);
    setCancle(true);
    setInfo(InitInfo(category, type));
    setMode('');
    // console.log('first useEffect');
    fetchList(festivalId, category, type, setBoardList);
  }, [category, type]);

  useEffect(() => {
    // console.log('mode:', mode);
    // console.log('secound useEFFect');
    if (mode == 'a') {
      fetchList(festivalId, category, type, setBoardList);
      setInfo(InitInfo(category, type));
      //객체나 배열의 setState는 무조건 [...] 또는 {...} 활용
      setCancle(false);
    } else if (mode == 'r') {
      fetchDetail(festivalId, category, itemID, setInfo);
      setCancle(false);
    } else if (mode == 'f') {
      fetchList(festivalId, category, type, setBoardList);
      setCancle(true);
      setMode('');
    }
  }, [mode, itemID]);

  // console.log("boardList, info:", boardList, info);

  return (
    <Wrapper>
      <UpperBar_Component />
      <MiddleBar_Component2 text="공지사항/이벤트" />
      <AssignBox>
        <Assign_List categoryList={categoryList} />

        {cancle ? <Assign_Blank /> : <Assign />}
      </AssignBox>
    </Wrapper>
  );
}
export default AssignPage_Post;

export const Wrapper = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const InputBox = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
`;
export const Input = styled.input`
  height: 30px;
`;
export const SemiTitle = styled.div`
  display: flex;
  height: 30px;
`;
export const Category = styled.select`
  width: 200px;
  height: 30px;
`;
export const PlusImage = styled.button`
  width: 25px;
  height: 25px;
  font-size: 25px;
  line-height: 12.5px; //글자 위 기준으로 height가 설정됨

  margin: 0;
  padding: 0;
`;
export const ImageBox = styled.div`
  width: 400px;
  p {
    align-self: flex-start;
  }
`;
export const Image = styled.img`
  width: 200px;
  height: 200px;
  border: 1px solid gray;
`;
