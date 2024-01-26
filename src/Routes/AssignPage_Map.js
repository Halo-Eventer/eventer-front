import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Assign from '../components/assign/Assign';
import { Wrapper } from './AssignPage_Home';
import { GlobalStyles } from './Info';


import Assign_List from '../components/assign/Assign_List';

import { AssignBox, Assign_Blank } from './AssignPage_Home';

import sample1 from '../images/BirthDay.svg';
import sample2 from '../images/Idol.svg';
import sample3 from '../images/BackGround.svg';

import {
  MiddleBar_Component3,
  UpperBar_Component,
} from 'components/assign/Assign_Bar';

function AssignPage_Map() {
  const id_param = useParams().id;

  const [category, setCategory] = useState("booth");
  const [categoryList, setCategoryList] = useState(
    {
      booth: "부스",
      amenity: "편의시설",
      store: ["주점", "푸드트럭"],
    }
  );
  const [type, setType] = useState("");
  const [boardList, setBoardList] = useState(["대동제 총정리1", "대동제 총정리2", "대동제 총정리3"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(8);
  const [totalPages, setTotalPages] = useState(4);
  const [itemID, setItemID] = useState(1);

  const [mode, setMode] = useState("");
  const [cancle, setCancle] = useState(true);

  const [info, setInfo] = useState(
    {
      tag:"",
      name:"",
      summary:"",
      subtitle:"",
      content:"",
      latitude:0,
      longitude:0,
      location:"",
      isOperation:true,
      operationHours:"",
      type:"",
      menus:"",

      thumbnail:"",
      images:[]
    }
  );
  const [info_id, setInfo_id] = useState(
    {
      tag:"",
      name:"대 동 제",
      summary:"대 동 제 가 자 잇",
      subtitle:"",
      content:"",
      latitude:0,
      longitude:0,
      location:"",
      isOperation:true,
      operationHours:"",
      type:"",
      menus:"",

      thumbnail:sample2,
      images:[sample1,sample3]
    }
  );



  useEffect(() => 
  {
    console.log("type (AssignPage_Map):", type)
  }, [type]);

  useEffect(()=>
  {
    console.log("mode (AssignPage_Map):",mode);
    if(mode == 'a'){
      let tmp = info;
      Object.keys(tmp).forEach(key => {
        if(key=='images')
          tmp[key]=[];
        else
          tmp[key] = "";
      });
      setInfo({...tmp});  
        //객체나 배열의 setState는 무조건 [...] 또는 {...} 활용
      setCancle(false);
    }
    else if(mode == 'r'){
      setInfo({...info_id});
      setCancle(false);
    }else if(mode == 'd'){
      setCancle(false);
    }
  },[mode,itemID]);



  return (
    <Wrapper style={{ height: 'auto' }}>
      <GlobalStyles />
      <UpperBar_Component />
      <MiddleBar_Component3 text="지도" id_param={id_param} />

      <AssignBox>

        <Assign_List 
        category={category} setCategory={setCategory}
        categoryList = {categoryList} setType={setType}
        boardList={boardList} setBoardList={setBoardList}
        currentPage={currentPage} setCurrentPage={setCurrentPage}
        pageNum={pageNum} totalPages={totalPages}
        itemid = {itemID} setItemID={setItemID}
        setMode = {setMode} setCancle={setCancle}/>

        {cancle 
        ?
        <Assign_Blank/>
        :
        <Assign 
        category={category}
        cancle = {cancle}

        mode = {mode}
        setMode = {setMode}
        
        itemID = {itemID}

        info={info}
        setInfo={setInfo}

        setCancle = {setCancle}/>
        }
        
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


