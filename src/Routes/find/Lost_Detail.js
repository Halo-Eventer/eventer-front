import { useLocation, useNavigate } from 'react-router-dom';
import { onClick_bkBtn } from 'hooks/hooks';
import { BkBtn, Title, TopFixedDiv, UpperBar, Wrapper } from 'Routes/Home';
import styled from 'styled-components';

function Lost_Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.props;

  return (
    <>
      <Wrapper>
        <TopFixedDiv>
          <UpperBar>
            <BkBtn onClick={onClick_bkBtn(navigate)}></BkBtn>
            <Title>분실물 리스트</Title>
          </UpperBar>
        </TopFixedDiv>

        <Img src={data.thumbnail}></Img>
        <Tag>
          <Category>{data.type}</Category>
          <Name style={{ marginTop: '2px' }}>{data.name}</Name>
          <Date style={{ marginTop: '4px' }}>발견날짜:{data.findDate}</Date>
        </Tag>

        <Btn onClick={() => (document.location.href = 'tel:0612448729')}>
          분실물 센터 연락하기
        </Btn>
        <Tel>연락처: 061-244-8729</Tel>
      </Wrapper>
    </>
  );
}
export default Lost_Detail;
const Category = styled.div`
  color: #53cddd;

  /* body1 */

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;
const Name = styled.div`
  color: #fff;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 140% */
`;
const Img = styled.img`
  margin-top: 64px;
  width: 358px;
  height: 358px;
  flex-shrink: 0;
  border-radius: 12px 12px 0px 0px;
  background: #fff;
`;

const Tag = styled.div`
  width: 358px;
  height: 114px;
  border-radius: 8px;
  background: #222;
  box-shadow: 0px 2px 8px -4px rgba(0, 0, 0, 0.24);

  padding: 16px 16px;
`;

const Date = styled.div`
  color: #ddd;

  /* body3 */

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const Btn = styled.button`
  margin-top: 32px;

  width: 358px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #53cddd;

  color: #000;
  text-align: center;

  /* headline2 */
  font-family: 'NanumSquareNeo-Variable';
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: 24px; /* 150% */
`;

const Tel = styled.div`
  color: #777;
  text-align: center;
  margin-top: 4px;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;
