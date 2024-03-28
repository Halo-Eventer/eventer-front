import { ApplyBtn } from 'Routes/find/Missing_Home';

import styled from 'styled-components';

function Missing_Popup({ popupList, prop, setPopupList, type }) {
  const closePopup = () => {
    const newPopupList = [...popupList]; // 기존 팝업 리스트 복사
    newPopupList.pop(); // 첫 번째 요소 삭제
    setPopupList(newPopupList); // 새로운 리스트로 상태 업데
  };
  return (
    <Wrapper>
      <Container>
        <Head type={type}>{type ? prop.title : '어린이를 찾습니다'}</Head>
        {type == 1 ? '' : <Img src={prop.thumbnail} />}
        <Content readOnly type={type}>
          {type
            ? prop.content
            : `${prop.missingLocation}에서 실종된 ${prop.name}(${prop.gender}, ${prop.age})를 찾습니다.
            
특이사항 : ${prop.content}`}
        </Content>
        <BtnBox>
          {type == 1 ? (
            ''
          ) : (
            <FindBtn
              onClick={() => (document.location.href = 'tel:01063920549')}
            >
              실종자 센터 연락하기
            </FindBtn>
          )}
          <CloseBtn onClick={closePopup}>창 닫기</CloseBtn>
        </BtnBox>
      </Container>
    </Wrapper>
  );
}

export default Missing_Popup;

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
`;
const Content = styled.textarea`
  margin-top: ${(props) => (props.type ? '16px' : '12px')};
  width: 278px;
  height: 320px;
  color: #fff;
  background: #333;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
  /* body2 */
  font-family: 'Pretendard';
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
  font-family: 'Pretendard';
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
