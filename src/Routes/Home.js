import { useState, useEffect } from 'react';

import styled from 'styled-components';

import backGround from '../images/BackGround.svg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Info from './Info';
import NolzaMap from './NolzaMap';

function Home() {
  const [barPos, setBarPos] = useState('0');
  const [colorInfo, setColorInfo] = useState('white');
  const [colorMap, setColorMap] = useState('black');
  const [infoMap, setInfoMap] = useState(true);
  const [showChangeBlock, setShowChangeBlock] = useState(true);

  const onClick_info = () => {
    setBarPos('0');
    setColorInfo('white');
    setColorMap('black');

    setInfoMap(true);
  };
  const onClick_map = () => {
    setBarPos('179px');

    setColorInfo('black');
    setColorMap('white');

    setInfoMap(false);
  };
  return (
    <div>
      <Wrapper_Home>
        {infoMap ? (
          <Info></Info>
        ) : (
          <NolzaMap setShowChangeBlock={setShowChangeBlock}></NolzaMap>
        )}
      </Wrapper_Home>
      {showChangeBlock && (
        <ChangeBlock>
          <ChangeBox>
            <ChangeBar barPos={barPos}></ChangeBar>
            <ChangeBtn onClick={onClick_info} color={colorInfo}>
              축제정보
            </ChangeBtn>
            <ChangeBtn onClick={onClick_map} color={colorMap}>
              축제지도
            </ChangeBtn>
          </ChangeBox>
        </ChangeBlock>
      )}
    </div>
  );
}
export default Home;
export { FlexBox_Row, FlexBox_Column };

const FlexBox_Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBox_Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper_Home = styled.div`
  background-image: url(${backGround}); //css에서 jsx변수 쓰고싶다면 {}뿐만 아니라 $까지 추가
  background-repeat: repeat;
  background-size: cover; // 이미지가 div를 완전히 채우도록 설정

  //페이지 내부 요소가 뷰포트 높이를 안 넘어가면 이렇게,
  //넘어간다면 height설정 x 그냥 요소자체 높이로만 해결
  //(height없이 width만 적혀져 있는)

  margin: 0;
  padding: 0;

  display: block;
`;

const ChangeBar = styled.div`
  transform: translateX(${(props) => props.barPos}); //최종 목적지
`;
const ChangeBtn = styled.button`
  color: ${(props) => props.color};
  //해당 태그의 props는 선언시에만 활용할 수 있음. 밑에서 재정의 할 때는 활용 불가.
  //선언중인 상위컴포넌트의 props만 사용 가능
`;
const ChangeBox = styled.div``;
const ChangeBlock = styled.div`
  width: 100vw;
  background-color: rgb(255, 255, 255, 0);
  position: fixed;
  bottom: 5vh;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  ${ChangeBox} {
    position: relative;

    width: 358px;
    height: 56px;
    flex-shrink: 0;

    border-radius: 28px;
    background: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.24);

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    ${ChangeBtn} {
      width: 179px;
      height: 48px;
      flex-shrink: 0;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 150% */
      border: none;
      border-radius: 10%;
      background-color: rgba(255, 255, 255, 0);
      cursor: pointer;

      z-index: 2;
    }
    ${ChangeBar} {
      position: absolute;
      left: 4px;
      /* left : ${(props) =>
        props.barPos
          ? `4px;`
          : `28px;`}; => 이런식으로 불린값 전달하는건 스타일컴포넌트에서 불가능, 
            오로지 속성값만 전달 가능. ||나 &&를 쓰는 건 속성값을 전달 못 받은 경우 기본값을 정하는 것 뿐.*/

      //jsx모드의 css속성값은 '문자열'이므로 직접적인 속성값은 반드시 '따옴표' 필수
      transition: transform 0.2s ease-out;

      width: 171px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 24px;
      background: #e63136;
    }
  }
`;
