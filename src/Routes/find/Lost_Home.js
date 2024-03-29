import { useNavigate } from 'react-router-dom';
import { onClick_bkBtn } from '../../hooks/hooks';
import { BkBtn, Title, TopFixedDiv, UpperBar, Wrapper } from '../Home';
import styled from 'styled-components';
import { Flex } from '../../asset/Style';
import { useEffect, useState } from 'react';
import { lostItemGet } from 'apis/apis_GET';

function Lost_Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('위로');
    window.scrollTo(0, -200);
    lostItemGet().then((res) => {
      setData(res.data);
      console.log(res.data);
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
            console.log(e);
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
        </Container>
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
  font-family: 'Pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

export const Category = styled.div`
  color: #53cddd;
  font-family: 'Pretendard';
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 146.667% */
`;

export const Name = styled.div`
  color: #fff;

  font-family: 'Pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;
