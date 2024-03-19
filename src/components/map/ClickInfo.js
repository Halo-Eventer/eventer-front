import styled, { css, keyframes } from 'styled-components';
import FullInfo from './FullInfo';
import Up from '../../asset/up.svg';
import { useEffect, useRef, useState } from 'react';
import InfoBox from './InfoBox';
function ClickInfo(props) {
  const [full, setFull] = useState(false);
  const [close, setClose] = useState(false);
  const setPopup = props.setPopup;
  useEffect(() => {
    setFull(false);
  }, [props.activeCategory]);
  // useEffect(() => {
  //   getDetailInfo(props.data.id, setClickInfo, props.activeCategory);
  // }, [props.data]);
  //clickInfo를 상위 컴포넌트에서 가져오면 됨.
  useEffect(() => {
    setClose(false);
  }, [props.popup]);

  const handleFull = () => {
    setFull((prev) => !prev);
  };

  return full ? (
    <FullInfo
      data={props.clickInfo}
      popup={props.popup}
      close={close}
      setPopup={setPopup}
      setFull={setFull}
      setClose={setClose}
      activeCategory={props.activeCategory}
    />
  ) : (
    <Container
      isOpen={props.data.id == props.openId}
      popup={props.popup}
      close={close}
    >
      <VectorBox onClick={handleFull}>
        <img src={Up}></img>
      </VectorBox>
      <InfoContainer>
        <InfoBox
          marker={props.marker}
          data={props.clickInfo}
          setFull={setFull}
          setPopup={setPopup}
          setClose={setClose}
          activeCategory={props.activeCategory}
        />
      </InfoContainer>
      {/* <ImgContainer>
        <DetailImg src={props.clickInfo.thumbnail}></DetailImg>
      </ImgContainer> */}
      <More onClick={handleFull}>자세히 보기</More>
    </Container>
  );
}

export default ClickInfo;

export const Container = styled.div`
  position: absolute;
  bottom: 0px;
  z-index: 110;
  border-radius: 12px 12px 0px 0px;
  background: #fff;
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.12);
  width: 100vw;
  height: 172px;
  z-index: 10;
  display: ${(props) => {
    return props.popup == true && props.isOpen == true ? 'flex' : 'none';
  }};
  animation: ${(props) => {
    return props.close
      ? css`
          ${slideDown} ease-in-out 0.6s
        `
      : css`
          ${slideUp} ease-in-out 0.6s
        `;
  }};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const VectorBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  height: 10px;

  cursor: pointer;
`;
const slideDown = keyframes`
  from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(250px);
    }
`;
const slideUp = keyframes`
from {
      transform: translateY(240px);
    }
    to {
      transform: translate(0);
    }
`;

const InfoContainer = styled.div`
  width: 350px;
  margin: 0 auto;
`;

const ImgContainer = styled.div`
  overflow: auto;
`;
const DetailImg = styled.img`
  width: 350px;
  border-radius: 12px;
`;
const More = styled.button`
  margin-top: 16px;
  margin-bottom: 12px;

  border-radius: 8px;
  background: #e5f5f7;
  width: 358px;
  height: 40px;
  flex-shrink: 0;

  color: #07b0c7;
  text-align: center;
  font-family: Pretendard-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 150% */
`;
