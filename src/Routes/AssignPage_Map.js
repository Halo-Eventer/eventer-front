import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Assign from '../components/assign/Assign';
import { Wrapper } from './AssignPage_Home';
import { GlobalStyles } from './Info';
import { Flex } from 'asset/Style';

import Assign_List from '../components/assign/Assign_List';

import styled from 'styled-components';
import {
  MiddleBar_Component3,
  UpperBar_Component,
} from 'components/assign/Assign_Bar';

function AssignPage_Map() {
  const id_param = useParams().id;

  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList]= useState(
    {
        booth : "부스",
        amenity: "편의시설",
        store : ["주점", "푸드트럭"],
    }
  );
  const [type, setType]=useState("");
  const [boardList, setBoardList] = useState(["대동제 총정리1", "대동제 총정리2", "대동제 총정리3"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(8);
  const [totalPages, setTotalPages] = useState(4);
  const [itemID, setItemID] = useState(1);
  const [mode, setMode] = useState("");


  useEffect(()=>{
    console.log("type (AssignPage_Map):",type)
  },[type]);
  return (
    <Wrapper style={{height:'auto'}}>
      <GlobalStyles />
      <UpperBar_Component />
      <MiddleBar_Component3 text="지도" id_param={id_param} />

      <AssignBox>
      <Assign_List 
        category={category} setCategory={setCategory}
        categoryList = {categoryList} type={type} setType={setType}
        boardList={boardList} setBoardList={setBoardList}
        currentPage={currentPage} setCurrentPage={setCurrentPage}
        pageNum={pageNum} totalPages={totalPages}
        itemid = {itemID} setItemID={setItemID}
        setMode = {setMode}/>

        {/* 임시 카테고리 설정 레이아웃 */}
        <Assign category="store"/>
      </AssignBox>
    </Wrapper>
  );
}

export default AssignPage_Map;


const AssignBox = styled(Flex)`
  margin-top: 32px;
`;
