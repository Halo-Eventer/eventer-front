import { useNavigate } from 'react-router-dom';
import { onClick_bkBtn } from '../../hooks/hooks';
import { BkBtn, Title, TopFixedDiv, UpperBar, Wrapper } from '../Home';
import styled from 'styled-components';
import { Flex } from '../../asset/Style';
import { useEffect, useState } from 'react';
import { lostItemGet } from 'apis/apis_GET';
import xButton from 'asset/images/XButton.svg';

function Lost_Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showPopUp, setShowPopUp] = useState(true);

  const onClick_close = () => {
    setShowPopUp(false);
  }

  useEffect(() => {
    window.scrollTo(0, -200);
    lostItemGet().then((res) => {
      setData(res.data);
      // console.log(res.data);
    });
  }, []);

  return (
    <>
      <Wrapper>
        <TopFixedDiv>
          <UpperBar>
            <BkBtn onClick={onClick_bkBtn(navigate)}></BkBtn>
            <Title>분실물 리스트</Title>
          </UpperBar>
        </TopFixedDiv>

        <Container>
          {data.map((e) => {
            return (
              <div onClick={() => navigate(`${e.id}`, { state: { props: e } })}>
                <Box image={e.thumbnail}>
                  <Tag>
                    <Category>{e.type}</Category>
                    <Name>{e.name}</Name>
                  </Tag>
                </Box>
              </div>
            );
          })}
           <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              <div>
                <Box image={xButton}>
                  <Tag>
                    <Category>타입</Category>
                    <Name>이름</Name>
                  </Tag>
                </Box>
              </div>
              
        </Container>

        {showPopUp
        &&
        <PopUpBar>
        <h1>분실물 습득·분실 시 종합안내센터로 방문해주세요.
          <br/>상세 위치는 공연장 지도를 참고해주세요.</h1>
        <h2><span>문의 전화번호</span> : 061-244-8729</h2>
        <img onClick={onClick_close} src={xButton}/>
      </PopUpBar>
        }
       
      </Wrapper>
    </>
  );
}

export default Lost_Home;

const Box = styled.div`
  width: 173px;
  height: 186px;
  flex-shrink: 0;
  border-radius: 9px;

  background: url(${(props) => props.image});
  background-size: 173px 186px;

  box-shadow: 0px 2px 8px -4px rgba(0, 0, 0, 0.24);
  color: #fff;
  margin-top: 12px;

  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const Container = styled.div`
  margin-top: 60px;
  width: 358px;
  display: flex;
  flex-wrap: wrap;

  > div:nth-child(2n) {
    // > : 자식선택자로 바로 아래 자식 요소 선택 시 사용
    margin-left: 12px;
  }
`;

const Tag = styled.div`
  width: 173px;
  height: 66px;
  flex-shrink: 0;
  background: #222;

  padding: 8px 0 0 16px;

  color: #fff;

  border-radius: 0px 0px 8px 8px;
  background: #222;
  box-shadow: 0px 2px 8px -4px rgba(0, 0, 0, 0.24);

  /* body1 */

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

export const Category = styled.div`
  color: #53cddd;

  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 146.667% */
`;

export const Name = styled.div`
  color: #fff;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

export const PopUpBar = styled.div`
position:fixed;
bottom:16px;

width: 358px;
height: 88px;
flex-shrink: 0;
border-radius: 8px;
background: #222;
border : 1px solid #555;

display :flex;
flex-direction:column;
gap:4px;
padding:12px 16px;
h1{
  color: #FFF;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
h2{
  color: #FFF;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  span{
    font-weight:600;
  }
}
img{
  position:absolute;
  top:12px;
  right:12px;
  cursor:pointer;
}
`;