import styled, { css, keyframes } from 'styled-components';
import InfoBox from '../InfoBox';
import { VectorBox } from './ClickInfo';
import Up from '../../asset/up.svg';

function FullInfo(props) {
  const data = props.data;
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
          data={props.data}
          setFull={props.setFull}
          setPopup={props.setPopup}
          setClose={props.setClose}
        />
      </FullInfoBox>
      <WhiteLine />
      <DetailBox>
        <DetailImgContainer>
          {props.activeCategory == '2' || props.activeCategory == '3'
            ? data.menus?.map((e, i) => {
                return (
                  <div>
                    <MenuImg src={e.image} style={{ marginTop: '12px' }} />
                    <MenuTxt>{e.name}</MenuTxt>
                    <MenuTxt>{e.price.toLocaleString()}원</MenuTxt>
                  </div>
                );
              })
            : data.images?.map((e) => {
                return (
                  <div>
                    <DetailImg
                      src={e}
                      style={{ marginTop: '12px' }}
                    ></DetailImg>
                  </div>
                );
              })}
        </DetailImgContainer>
        <Content>{data.content}</Content>
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
const DetailImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
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
          ${slideDown} ease-in-out 0.6s
        `
      : css`
          ${slideUp} ease-in-out 0.6s
        `;
  }};
`;
const DetailImg = styled.img`
  width: 350px;
`;
const MenuImg = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 12px;

  flex-shrink: 0;
`;
const MenuTxt = styled.div`
  color: #000;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px; /* 160% */
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
  height: 70vh;
  margin: 35px auto;
  overflow-y: scroll;
  scrollbar-width: none;
`;
const Content = styled.div`
  white-space: pre-wrap;
`;
