import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { Wrapper, GRID_WIDTH } from './AssignPage_Home';
import {
  UpperBar_Component,
  MiddleBar_Component1,
} from '../../components/assign/Assign_Bar';

function AssignPage_Select() {
  const navigate = useNavigate();
  const id_param = 1;
  //const id_param = useParams().id;
  // const URL = useLocation();

  const [festival, setFestival] = useState('');
  // console.log("URL : ",URL.pathname);

  return (
    <Wrapper>
      <UpperBar_Component />
      <MiddleBar_Component1 id_param={id_param} />
      <MainBox>
        <Link to={`/assign_notice/${id_param}`}>
          <PageBtn>
            <h1>공지관리 페이지</h1>
          </PageBtn>
        </Link>

        {/* <Link to={`/assign_rending/${id_param}`}>
            <PageBtn><h1>랜딩관리 페이지</h1></PageBtn>
          </Link> */}

        <Link to={`/assign_map/${id_param}`}>
          <PageBtn>
            <h1>지도관리 페이지</h1>
          </PageBtn>
        </Link>

        {/* <Link to={`/assign_performance/${id_param}`}>
            <PageBtn><h1>공연관리 페이지</h1></PageBtn>
          </Link> */}
      </MainBox>
    </Wrapper>
  );
}

export default AssignPage_Select;

export const MainBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  //grid에서 gap정하면 전체크기가 커져버림
`;
export const PageBtn = styled.div`
  position: relative;

  width: 400px;
  height: 300px;
  flex-shrink: 0;

  border-radius: 8px;
  background-color: #4f33f6;
  opacity: 0.8;

  &:hover {
    opacity: 0.6;
  }

  h1 {
    position: absolute;
    left: 32px;
    top: 32px;

    height: 32px;

    color: white;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 32px; /* 133.333% */
  }
`;
