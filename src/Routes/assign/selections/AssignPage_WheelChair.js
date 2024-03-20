import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import Assign from 'components/assign/Assign';

import {
  UpperBar_Component,
  MiddleBar_Component2,
} from 'components/assign/Assign_Bar';

import { AssignBox, Assign_Blank} from 'Routes/assign/AssignPage_Home';
import Assign_List from 'components/assign/Assign_List';

import {getAll, getDetail} from 'apis/apis';
import { cancleState, categoryState_assign, infoState, itemIDState, modeState } from 'recoils/atoms_assign';
import { useRecoilState } from 'recoil';
import { InitInfo } from 'utils/InitInfo';
import { postCategory, wheelChairCategory } from 'constants/Const_Assign';



function AssignPage_WheelChair() {


  //*****전역 recoil모음*****
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [mode,setMode]=useRecoilState(modeState);
  const [cancle, setCancle] = useRecoilState(cancleState);
  const [itemID, setItemID] = useRecoilState(itemIDState);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****

  const id_param = useParams().id;

  const [categoryList, setCategoryList]= useState(wheelChairCategory);
  const [type, setType]=useState("");
  const [boardList,setBoardList] = useState([]);
  const [SE,setSE]=useState("");

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

          if (category === 'notice')
            setInfo({ ...response.data, simpleExplanation: SE });
          else setInfo(response.data);
        } else {
          console.log('fetch Detail no data ;(', response);
        }
      })
      .catch((error) => {
        console.log('fetch Detail error', error);
      });
  };

  useEffect(()=>{
    setCategory('notice');
  },[])
  useEffect(()=>
  {
    console.log("cateogry (Assign_Notice):",category);
    setCancle(true);
    setInfo(InitInfo(category));
    setMode("");
    fetchList();
  }, [category]);

  useEffect(() => {
    console.log('mode (AssignPage_Map):', mode);
    if (mode == 'a') {
      fetchList();
      setInfo(InitInfo(category));  
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
    <Wrapper>
      <UpperBar_Component />
      <MiddleBar_Component2 id_param={id_param} text="휠체어" />
      <AssignBox>
        
        <Assign_List 
        categoryList = {categoryList} 
        setType={setType}
        boardList={boardList} 
        setBoardList={setBoardList}
        setSE={setSE}/>

        {cancle 
        ? <Assign_Blank/>
        : <Assign/>
        }

      </AssignBox>
    </Wrapper>
  );
}
export default AssignPage_WheelChair;

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
