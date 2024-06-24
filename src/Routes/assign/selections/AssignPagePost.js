import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import Assign from 'components/assign/Assign';

import {
  UpperBarComponent,
  MiddleBarComponent2,
} from 'components/assign/AssignBar';

import { AssignBox, AssignBlank } from 'Routes/assign/AssignPageHome';
import AssignList from 'components/assign/AssignList';

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
import { postCategory } from 'constants/constAssign';
import fetchList from 'utils/fetchList';
import fetchDetail from 'utils/fetchDetail';

function AssignPagePost() {
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
      <UpperBarComponent />
      <MiddleBarComponent2 text="공지사항/이벤트" />
      <AssignBox>
        <AssignList categoryList={categoryList} />

        {cancle ? <AssignBlank /> : <Assign />}
      </AssignBox>
    </Wrapper>
  );
}
export default AssignPagePost;


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
