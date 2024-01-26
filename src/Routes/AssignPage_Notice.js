import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Flex } from 'asset/Style';

import styled from 'styled-components';

import Assign from 'components/assign/Assign';

import {
  FlexBox_Column, FlexBox_Row,
  GlobalStyles, StyledLink
} from './Info';
import {
  UpperBar_Component,
  MiddleBar_Component3
} from '../components/assign/Assign_Bar';

import { AssignBox, Assign_Blank } from './AssignPage_Home';
import Assign_List from '../components/assign/Assign_List';

import sample1 from '../images/BirthDay.svg';
import sample2 from '../images/Idol.svg';
import sample3 from '../images/BackGround.svg';


function AssignPage_Notice() {
  const id_param = useParams().id;

  const [category, setCategory] = useState("notice");
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
  const [cancle, setCancle] = useState(true);

  const [info, setInfo] = useState({});
  const [info_id, setInfo_id] = useState(
    {
      title:"크하핫",
      simpleExplanation:"우하핫",
      subtitle:"우히힣",
      content:"와 진짜 ㄹㅇㅋㅋ",

      thumbnail:sample1,
      images:[sample3,sample2]
    }
  );


  useEffect(()=>
  {
    console.log("cateogry (Assign_Notice):",category);
    if(category === 'notice')
      setInfo( {
        title:"",
        simpleExplanation:"",
        subtitle:"",
        content:"",

        thumbnail:"",
        images:[]
      });  

    else if(category==='event')
      setInfo( {
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
    
          thumbnail:"",
          images:[]
        });  
        
  },[category])
  useEffect(()=>
  {
    console.log("mode (Assign_Notice):",mode);
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
  },[mode,itemID])


  return (
    <Wrapper>

      <GlobalStyles />
      <UpperBar_Component />
      <MiddleBar_Component3 id_param={id_param} text="정보" />
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


