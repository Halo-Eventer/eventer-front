import { useNavigate } from 'react-router-dom';
import { onClick_bkBtn } from '../../hooks/hooks';
import { BkBtn, Title, TopFixedDiv, UpperBar, Wrapper } from '../Home';
import styled from 'styled-components';
import { Flex } from '../../asset/Style';
import { useEffect, useState } from 'react';

function Lost_Home() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const data = [
    {
      id: 1,
      category: '가방',
      name: '뉴발란스 가방',
      date: '2024.02.13',
    },
    {
      id: 2,
      category: '시계',
      name: '롤렉스',
      date: '2024.02.13',
    },
    {
      id: 3,
      category: '자동차',
      name: '람보르기니',
      date: '2024.01.13',
    },
    {
      id: 4,
      category: '아파트',
      name: '반포자이',
      date: '2024.02.10',
    },
    {
      id: 5,
      category: '머리카락',
      name: '대머리',
      date: '2024.03.13',
    },
  ];
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
            console.log(e.category);
            return (
              <div onClick={() => navigate(`${e.id}`, { state: { props: e } })}>
                <Box>
                  <Tag>
                    <Category>{e.category}</Category>
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

  background: #fff;
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

  border-radius: 8px;
  background: #222;
  box-shadow: 0px 2px 8px -4px rgba(0, 0, 0, 0.24);

  /* body1 */
  font-family: Pretendard-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

export const Category = styled.div`
  color: #53cddd;
  font-family: Pretendard-Regular;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 146.667% */
`;

export const Name = styled.div`
  color: #fff;

  font-family: Pretendard-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;
