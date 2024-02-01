import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Flex } from 'asset/Style';
import { FlexBox_Column, FlexBox_Row, GlobalStyles, StyledLink } from './Info';

import {UpperBar_Component,
  MiddleBar_Component1} from '../components/assign/Assign_Bar';


import dropDown from '../images/DropDown.svg';
import dropDown2 from '../images/DropDown2.svg';
import next from '../images/Next.svg';
import thumbnail_preview from 'asset/assign/input_thumbnail.png';
export { dropDown, dropDown2, next };


export const firstInfo = (category) => {
  let tmp;
  console.log("category in firstInfo",category);
  if(category === 'notice')
    {
      tmp =  {
        title:"",
        simpleExplanation:"",
        subtitle:"",
        content:"",

        thumbnail:thumbnail_preview,
        images:[]
      };  
    }
    else if(category==='store')
    {
      tmp = {
          id:"",
          name:"",
          summary:"",
          subtitle:"",
          latitude:0,
          longitude:0,
          location:"",
          isOperation:true,
          operationHours:"",
          type:"",
    
          thumbnail:thumbnail_preview,
          menus:[]
        };  
    }else
    {
      tmp = {
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
  
        thumbnail:thumbnail_preview,
        images:[]
      };  
    }

    return tmp;
}


function AssignPage_Home() {
  const navigate = useNavigate();

  const [festival, setFestival] = useState('세종대학교');
  const [rotate, setRotate] = useState('0deg');

  // const [widthUpperSelect, setWidthUpperSelect] = useState(0);
  // const ref_upperSelect = useRef();

  // useEffect(()=>{
  //   if(ref_upperSelect.current)
  //     setWidthUpperSelect(ref_upperSelect.current.getBoundingClientRect());
  // },[]);

  // <FestivalSelectBox ref={ref_upperSelect}>
  //useRef 사용법

  const onClick_home = () => {
    navigate(`/assign_home`);
  };

  const onChange_select = (event) => {
    event.preventDefault();
    setFestival(event.currentTarget.value);
  };
  const onBlur_select = (event) => {
    event.preventDefault();
    setRotate('0deg');
  };
  const onClick_select = (event) => {
    event.preventDefault();
    setRotate('90deg');
  };
  //select태그에서 사용하기 (포커스처리인 onBlur 활용)
  //(뭘 선택하자마자 애니메이션 발생하게 하는건 힘듬. 그냥 select자체의 포커스 여부에만 집중해야함)

  const onClick_submit = () => {
    const festivalID = 1;
    navigate(`/assign_select/${festivalID}`);
  };

  return (
    <Wrapper>
      <GlobalStyles />
      <UpperBar_Component />
      <MiddleBar_Component1 />
      <FestivalSelect_MainBox>
        <h1 color="#4F33F6">대학교 선택</h1>
        <FestivalSelectBox rotate={rotate}>
          <select
            onChange={onChange_select}
            onBlur={onBlur_select}
            onClick={onClick_select}
            value={festival}
          >
            <option value="세종대학교">세종대학교</option>
            <option value="Test1">Test1</option>
            <option value="Test2">Test2</option>
          </select>
          <img src={dropDown} />
        </FestivalSelectBox>
        <button onClick={onClick_submit}>선택 완료</button>
      </FestivalSelect_MainBox>
    </Wrapper>
  );
}
export default AssignPage_Home;









export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

//======================================상단바 : 시작

export const GRID_WIDTH = 1120;
export const UPPER_SELECTBOX = 145;
//selectbox 활용방식(너비 100% + padding + z-index + 드롭다운 이미지는 absolute)

export const Logo = styled.div`
  @font-face {
    font-family: 'YClover-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/YClover-Bold.woff2')
      format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-${GRID_WIDTH / 2}px, -50%);
  //grid에 맞게 추가하는 법 (백틱 + 포매팅 활용)

  width: 66px;

  cursor: pointer;

  color: #111;
  font-family: 'YClover-Bold';
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 145.455%;
`;

export const FestivalSelectBox = styled.div`
  width: 145px;
  height: 32px;

  border-radius: 4px;
  border: 1px solid #ccc;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  select {
    width: 100%;

    appearance: none; /* 이것은 모든 브라우저에서 기본 화살표를 제거합니다. */
    -webkit-appearance: none; /* 이것은 Safari와 같은 웹킷 기반 브라우저에서 필요합니다. */
    -moz-appearance: none; /* 이것은 Firefox에서 필요합니다. */

    background-color: transparent;
    border: none;
    z-index: 2;

    color: #111;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
  }
  img {
    position: absolute;
    transform: rotate(${(props) => props.rotate});
    transition: transform 0.2s ease-out;
  }
`;

export const UpperBar = styled.div`
  position: relative;

  width: 100vw;
  height: 64px;

  border-bottom: 1px solid #eee;
  background: #fff;

  ${FestivalSelectBox} {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(${GRID_WIDTH / 2 - UPPER_SELECTBOX}px, -50%);
    //right:0px; (왼쪽 상단 꼭지점 기준이 아니라 그냥 오른쪽에 딱 붙여줌)

    width: ${UPPER_SELECTBOX}px;
    padding: 4px;

    select {
      color: black;
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: 160%;
    }
    img {
      right: 4px;
      width: 16px;
      height: 16px;
    }
  }
`;
//======================================상단바 : 끝

//======================================중간바 : 시작
export const H1 = styled.h1`
  color: ${(props) => props.color || 'black'};
  font-weight: ${(props) => props.fontWeight || '600'};
`;
export const MiddleBar = styled.div`
  position: relative;

  width: 100vw;
  height: 64px;
  border-bottom: 1px solid #eee;
  background: #fff;

  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-${GRID_WIDTH / 2}px, -50%);

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;

    ${H1} {
      margin-right: 4px;

      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      line-height: 24px; /* 150% */
      padding: 4px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 16px;
      height: 16px;
    }
  }
`;
//=================중간바 : 끝

//=================메인박스 (대학교 선택, 대학선택 select, 버튼 등) : 시작
export const FestivalSelect_MainBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 256px;

  display: flex;
  flex-direction: column;
  justify-content: column;
  align-items: center;

  h1 {
    width: 100%;
    padding: 0;
    margin: 0 0 16px 0;

    color: #111;
    text-align: center;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: 150%;
  }
  ${FestivalSelectBox} {
    width: 256px;
    height: 64px;
    flex-shrink: 0;
    margin-bottom: 8px;
    padding: 20px;
    select {
      width: 184px;
      font-size: 17px;
      line-height: 141.176%;
    }
    img {
      right: 16px;
      width: 32px;
      height: 32px;
    }
  }
  button {
    width: 256px;
    height: 64px;
    flex-shrink: 0;

    border: none;
    border-radius: 4px;
    background: #4f33f6;

    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
//=================메인박스 (대학교 선택, 대학선택 select, 버튼 등) : 끝

export const Assign_Blank = styled.div`
width: 352px;
height: 724px;
flex-shrink: 0;

border-radius: 4px;
border: 1px solid #EEE;
background: linear-gradient(159deg, #F6F6F6 0%, rgba(244, 244, 244, 0.00) 48%, #F6F6F6 100%);

display:flex;
justify-content:center;
align-items:center;
`;

export const AssignBox = styled(Flex)`
  align-items:flex-start;
  gap:32px;

  margin-top: 32px;
`;








