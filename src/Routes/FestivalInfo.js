import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import {
  Wrapper,
  TopFixedDiv,
  Title,
  BkBtn,
  HomeBtn,
  LineDiv
} from './Home';

import line_up from '../images/LineUp.svg';
import { UpperBar } from './Home';

function FestivalInfo() {
  const navigate = useNavigate();

  const onClick_bkBtn = () => {
    navigate(-1);
    //그냥 뒤로가는 기능
  };

  return (
    <div>
      <TopFixedDiv>
        <UpperBar>
          <BkBtn onClick={onClick_bkBtn} />
          <Title>오늘의 공연</Title>
        </UpperBar>
      </TopFixedDiv>
      <WrapperSvg style={{marginTop:'48px'}}>
        <ImgForSvg src={line_up}>
            해당 브라우저에서 지원하지 않는 이미지입니다.
        </ImgForSvg>
      </WrapperSvg>
    </div>
  );
}

export default FestivalInfo;

export const WrapperSvg=styled.div`
position:relative;
background-color:black;

display:flex;
justify-content:center;
align-items:center;
`;

export const ImgForSvg=styled.iframe`
border:none;

width:390px; 
height:100vh;
top:0; 
left:0;
`;