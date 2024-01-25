import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import Assign from 'components/assign/Assign';
import Assign_Info_Add from '../components/assign_info/Assign_Info_Add';
import Assign_Info_Revise from '../components/assign_info/Assign_Info_Revise';

import {
  FlexBox_Column, FlexBox_Row,
  GlobalStyles, StyledLink
} from './Info';
import {
  UpperBar_Component,
  MiddleBar_Component3
} from '../components/assign/Assign_Bar';
import Assign_List from '../components/assign/Assign_List';




function AssignPage_Notice() {
  const id_param = useParams().id;

  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList]= useState(
  {
      notice : "공지사항",
      event : "이벤트",
  }
    );
  const [type, setType]=useState("");
  const [boardList,setBoardList] = useState(["대동제 총정리1", "대동제 총정리2", "대동제 총정리3"]);
  const [currentPage,setCurrentPage]=useState(1);
  const [pageNum,setPageNum]=useState(8);
  const [totalPages,setTotalPages]=useState(4);
  const [itemID, setItemID] = useState(1);
  const [mode,setMode]=useState("");

  const handleInfo = (event) => {
    event.preventDefault();
    setCategory(event.target.value);
  };


  return (
    <Wrapper>

      <GlobalStyles />
      <UpperBar_Component />
      <MiddleBar_Component3
        id_param={id_param}
        text="정보" />
      <FlexBox_Row>

        <Assign_List 
        category={category} setCategory={setCategory}
        categoryList = {categoryList} setType={setType}
        boardList={boardList} setBoardList={setBoardList}
        currentPage={currentPage} setCurrentPage={setCurrentPage}
        pageNum={pageNum} totalPages={totalPages}
        itemid = {itemID} setItemID={setItemID}
        setMode = {setMode}/>

        <Assign category="event"/>

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

      </FlexBox_Row>

    </Wrapper>
  );
}
export default AssignPage_Notice;
export const Wrapper = styled.div`
width:100vw;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`;
export const InputBox = styled.div`
  width: 400px;
  display:flex;
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
width:25px;
height:25px;
font-size:25px;
line-height:12.5px; //글자 위 기준으로 height가 설정됨

margin:0;
padding:0;
`;
export const ImageBox = styled.div`
width:400px;
p{
align-self:flex-start;
}
`;
export const Image = styled.img`
width:200px;
height:200px;
border:1px solid gray;
`;


