import styled, { css, keyframes } from 'styled-components';
import Img from '../../asset/showImg.png';
import FullInfo from './FullInfo';
import Up from '../../asset/up.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import InfoBox from '../InfoBox';
function ClickInfo(props) {
  const navigate = useNavigate();
  const [full, setFull] = useState(false);
  const [close, setClose] = useState(false);
  const setPopup = props.setPopup;
  useEffect(() => {
    setClose(false);
  }, [props.popup]);
  const handleFull = () => {
    setFull((prev) => !prev);
  };

  return full ? (
    <FullInfo
      popup={props.popup}
      close={close}
      setPopup={setPopup}
      setFull={setFull}
      setClose={setClose}
    />
  ) : (
    <Container popup={props.popup} close={close}>
      <VectorBox onClick={handleFull}>
        <img src={Up}></img>
      </VectorBox>
      <InfoContainer style={{ width: '350px' }}>
        <InfoBox setFull={setFull} setPopup={setPopup} setClose={setClose} />
        <DetailImg src={Img}></DetailImg>
      </InfoContainer>
    </Container>
  );
}

export default ClickInfo;

export const VectorBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  height: 10px;
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
export const Container = styled.div`
  position: absolute;
  bottom: 0px;
  z-index: 110;
  border-radius: 12px 12px 0px 0px;
  background: #fcf2eb;
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.08);
  width: 100vw;
  height: 244px;
  z-index: 10;
  display: ${(props) => {
    return props.popup ? '' : 'none';
  }};
  animation: ${(props) => {
    return props.close
      ? css`
          ${slideDown} ease-in-out 0.5s
        `
      : css`
          ${slideUp} ease-in-out 0.5s
        `;
  }};
`;
const InfoContainer = styled.div`
  width: 350px;
  margin: 0 auto;
`;

const DetailImg = styled.img`
  width: 350px;
`;
