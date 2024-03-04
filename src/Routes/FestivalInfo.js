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
      <Wrapper style={{height:'auto'}}>
          <img src={line_up} />
      </Wrapper>
    </div>
  );
}

export default FestivalInfo;
