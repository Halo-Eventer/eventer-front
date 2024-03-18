import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Flex } from 'asset/Style';

import styled from 'styled-components';

import Assign from 'components/assign/Assign';

import {
  FlexBox_Column, 
  FlexBox_Row,
  StyledLink
} from '../Home';
import {
  UpperBar_Component,
  MiddleBar_Component2
} from '../../components/assign/Assign_Bar';

import { AssignBox, Assign_Blank, firstInfo} from './AssignPage_Home';
import Assign_List from '../../components/assign/Assign_List';

import {getAll, getDetail} from '../../apis/apis';



function AssignPage_Notice() {
  const id_param = useParams().id;

  const [category, setCategory] = useState("notice");
  const [categoryList, setCategoryList]= useState(
  {
      notice : "공지사항",
      //event : "이벤트",
  }
    );
  const [type, setType]=useState("");
  const [boardList,setBoardList] = useState([]);
  const [SE,setSE]=useState("");

  const [currentPage,setCurrentPage]=useState(1);
  const [pageNum,setPageNum]=useState(8);
  const [totalPages,setTotalPages]=useState(1);
  const [itemID, setItemID] = useState(1);

  const [mode,setMode]=useState("");
  const [cancle, setCancle] = useState(true);

  const [info, setInfo] = useState({});



  const fetchList = () => {
    const festivalId = id_param;
    getAll(festivalId,category,type)
    .then((response)=>{
      if(response.data.length>0){
        console.log("fetch List success",response.data);
        setBoardList(response.data);
      }else{
        console.log("fetch List no data ;(",response);
        setBoardList([]);
      }
    }).catch((error)=>{
      console.log('fetch List error',error);
    })
  }

  const fetchDetail=()=>{
    getDetail(category,itemID)
    .then((response)=>{
      if(typeof(response.data) === 'object'){
        console.log("fetch Detail success",response.data);

        if(category==='notice')
          setInfo({...response.data, simpleExplanation:SE})
        else
          setInfo(response.data);
      }else{
        console.log("fetch Detail no data ;(",response);
      }
    }).catch((error)=>{
      console.log('fetch Detail error',error);
    })
  }

  useEffect(()=>
  {
    console.log("cateogry (Assign_Notice):",category);
    setCancle(true);
    setInfo(firstInfo(category));
    setMode("");
    fetchList();
  },[category])

  useEffect(()=>
  {
    console.log("mode (AssignPage_Map):",mode);
    if(mode == 'a')
    {
      fetchList();
      setInfo(firstInfo(category));  
        //객체나 배열의 setState는 무조건 [...] 또는 {...} 활용
      setCancle(false);
    }
    else if(mode == 'r')
    {
      fetchDetail();
      setCancle(false);
    }
    else if (mode == 'f')
    {
      fetchList();
      setCancle(true);
      setMode("");
    }
  },[mode,itemID]);

  

  return (
    <Wrapper>
      <UpperBar_Component />
      <MiddleBar_Component2 id_param={id_param} text="정보" />
      <AssignBox>

        <Assign_List 
        category={category} setCategory={setCategory}
        categoryList = {categoryList} setType={setType}

        boardList={boardList} setBoardList={setBoardList}
        setSE={setSE}

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


