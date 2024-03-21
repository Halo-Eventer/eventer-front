import {useState,useEffect} from 'react'
import {Link, useNavigate, 
  useParams, useLocation} from 'react-router-dom';

import styled from 'styled-components';

import {Wrapper,GRID_WIDTH} from 'Routes/assign/AssignPage_Home';
import {UpperBar_Component,
  MiddleBar_Component1} from 'components/assign/Assign_Bar';



function AssignPage_Select() {
  const navigate=useNavigate();
  const id_param = 1;
  //const id_param = useParams().id;
  // const URL = useLocation();

  const [festival, setFestival]=useState("");
  // console.log("URL : ",URL.pathname);


  return (
   <Wrapper>
       <UpperBar_Component/>
        <MiddleBar_Component1 id_param={id_param}/>
        <MainBox>
          <Link to={`/assign_map/${id_param}`}>
            <PageBtn><h1>축제 지도</h1></PageBtn>
          </Link>

          <Link to={`/assign_post/${id_param}`}>
            <PageBtn><h1>공지사항/이벤트</h1></PageBtn>
          </Link>
          
          <Link to={`/assign_lost/${id_param}`}>
            <PageBtn><h1>분실물 리스트</h1></PageBtn>
          </Link>

          <Link to={`/assign_missing/${id_param}`}>
            <PageBtn><h1>실종자 현황 관리</h1></PageBtn>
          </Link>

          <Link to={`https://www.naver.com/`}>
            <PageBtn><h1>휠체어</h1></PageBtn>
          </Link>

          <Link to={`https://www.youtube.com/`}>
            <PageBtn><h1>배리어프리존</h1></PageBtn>
          </Link>

          <Link to={`/assign_urgent/${id_param}`}>
            <PageBtn><h1>긴급공지</h1></PageBtn>
          </Link>
          
        </MainBox>
   </Wrapper>
  );
}

export default AssignPage_Select;


export const MainBox = styled.div`
margin-top:64px;
margin-bottom:64px;

display:grid;
grid-template-columns:repeat(2,1fr);
grid-template-rows:repeat(4,1fr);
gap:32px;
//grid에서 gap정하면 전체크기가 커져버림
`;
export const PageBtn = styled.div`
position:relative;

width: 240px;
height: 64px;
flex-shrink: 0;

border-radius: 4px;
border: 1px solid #DADADA;
background: #FFF;

display:flex;
justify-content:center;
align-items:center;

&:hover{
  border: 1px solid #4F33F6;
}

h1{
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 700;
}
`;
