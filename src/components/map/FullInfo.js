import styled, { css, keyframes } from 'styled-components';
import InfoBox from '../InfoBox';
import { VectorBox } from './ClickInfo';
import Up from '../../asset/up.svg';
import timeTable from '../../asset/timeTable.png';
function FullInfo(props) {
  const handleClose = () => {
    props.setClose(true);
    setTimeout(() => {
      props.setPopup(false);
      props.setFull(false);
    }, 500);
  };

  return (
    <FullInfoContainer popup={props.popup} close={props.close}>
      <VectorBox onClick={handleClose}>
        <img src={Up} style={{ rotate: '180deg' }}></img>
      </VectorBox>
      <FullInfoBox>
        <InfoBox
          setFull={props.setFull}
          setPopup={props.setPopup}
          setClose={props.setClose}
        />
      </FullInfoBox>
      <WhiteLine />
      <DetailBox>
        <DetailTitle>1일차 공연순서</DetailTitle>
        <DetailSemi>무대 관람 구역 입장 17:30</DetailSemi>
        <img src={timeTable} style={{ marginTop: '12px' }}></img>
      </DetailBox>
    </FullInfoContainer>
  );
}

export default FullInfo;

const slideDown = keyframes`
 from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100vh);
    }
`;
const slideUp = keyframes`
  from {
      transform: translateY(100vh);
    }
    to {
      transform: translateY(0);
    }
`;
const WhiteLine = styled.div`
  background: #fff;
  height: 1px;
  width: 100vw;
`;
const FullInfoBox = styled.div`
  width: 350px;
  margin: 10px auto 20px;
`;
const FullInfoContainer = styled.div`
  position: absolute;
  bottom: 0px;

  border-radius: 12px 12px 0px 0px;
  background: #fcf2eb;
  margin-top: 20px;
  width: 100vw;
  height: 90vh;
  z-index: 110;
  animation: slideDown 1s;
  animation: slideUp 0.5s;

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
const DetailTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
`;
const DetailSemi = styled.div`
  margin-top: 4px;
  color: #333;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
`;
const DetailBox = styled.div`
  width: 350px;
  margin: 35px auto;
`;
