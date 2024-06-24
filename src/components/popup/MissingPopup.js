import { ApplyBtn } from 'Routes/find/MissingHome';
import { Flex } from 'asset/Style';
import { useState } from 'react';

import styled from 'styled-components';

function MissingPopup({ popupList, prop, setPopupList, type }) {
  const [fullImgPopUp, setFullImgPopUp] = useState(false);

  const closePopup = () => {
    const newPopupList = [...popupList]; // 기존 팝업 리스트 복사
    newPopupList.pop(); // 첫 번째 요소 삭제
    setPopupList(newPopupList); // 새로운 리스트로 상태 업데
  };

  return (
    <Wrapper>
      {fullImgPopUp && (
        <FullImgDiv>
          <button
            onClick={() => {
              setFullImgPopUp(false);
            }}
          >
            X
          </button>
          <img src={prop.thumbnail}></img>
        </FullImgDiv>
      )}
      <Container>
        <Head type={type}>{type ? prop.title : '실종자를 찾습니다'}</Head>
        {type
          ? 
          ''
          :
          <Flex style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Img
              onClick={() => {
                setFullImgPopUp(true);
              }}
              src={prop.thumbnail}
            />
            <p
              onClick={() => {
                setFullImgPopUp(true);
              }}
            >
              이미지 확대하기
            </p>
          </Flex>
        }

        <Content readOnly type={type}>
          {type
            ?
            prop.content
            : `${prop.missingLocation}에서 실종된
${prop.name}(${prop.gender}, ${prop.age}세) 를 찾습니다.
            
특이사항 : ${prop.content}`}
        </Content>
        <BtnBox>
          {type
            ?
            ''
            :
            <FindBtn
              onClick={() => (document.location.href = 'tel:0612448729')}
            >
              실종자 센터 연락하기
            </FindBtn>
          }
          <CloseBtn onClick={closePopup}>창 닫기</CloseBtn>
        </BtnBox>
      </Container>
    </Wrapper>
  );
}

export default MissingPopup;

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

export const Container = styled.div`
  position: absolute;
  z-index: 1001;
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 326px;
  height: 492px;
  flex-shrink: 0;

  border-radius: 12px;
  background: #333;

  p {
    color: #888;
    font-size: 12px;
    margin-top: 4px;

    cursor: pointer;
  }
`;
export const Head = styled.div`
  margin-top: 20px;
  color: ${(props) => (props.type ? 'red' : '#fff')};
  text-align: center;

  font-family: 'NanumSquareNeo-Variable';

  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 28px; /* 140% */
`;
const Img = styled.img`
  margin-top: 12px;
  width: 182px;
  height: 182px;
  flex-shrink: 0;
  border-radius: 4px;

  cursor: pointer;
`;
const FullImgDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #555;
  border-radius: 12px;

  z-index: 1002;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    position: absolute;
    left: 12px;
    top: 12px;

    background-color: #aaa;

    border-radius: 4px;
    color: #fff;
    font-size: 12px;

    padding: 4px 8px;
  }

  img {
    border-radius: 12px;
    max-width: 100vw;
    max-height: 100vh;
  }
`;
const Content = styled.textarea`
  margin-top: ${(props) => (props.type ? '16px' : '12px')};
  width: 278px;
  height: ${(props)=>props.type ? '360px' : '100px'};

  overflow: auto;

  color: #fff;
  background: #333;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
  /* body2 */

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 146.667% */
`;
const BtnBox = styled.div`
  position: absolute;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FindBtn = styled.button`
  margin-top: 16px;
  width: 294px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #53cddd;
  color: #111;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;
export const CloseBtn = styled(FindBtn)`
  margin-top: 8px;
  background: #777;
  color: #fff;
`;
