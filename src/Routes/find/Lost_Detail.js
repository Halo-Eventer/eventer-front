import { useLocation, useNavigate } from 'react-router-dom';
import { onClick_bkBtn } from '../../hooks/hooks';
import { BkBtn, Title, TopFixedDiv, UpperBar, Wrapper } from '../Home';
import styled from 'styled-components';
import { Category, Name } from './Lost_Home';
function Lost_Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.props;
  console.log(data);
  return (
    <>
      <Wrapper>
        <TopFixedDiv>
          <UpperBar>
            <BkBtn onClick={onClick_bkBtn(navigate)}></BkBtn>
            <Title>분실물 리스트</Title>
          </UpperBar>
        </TopFixedDiv>

        <Img></Img>
        <Tag>
          <Category>{data.category}</Category>
          <Name style={{ marginTop: '2px' }}>{data.name}</Name>
          <Date style={{ marginTop: '4px' }}>발견날짜:{data.date}</Date>
        </Tag>

        <Btn>전화걸기</Btn>
      </Wrapper>
    </>
  );
}
export default Lost_Detail;
const Img = styled.div`
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
  font-family: Pretendard-Regular;
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
  font-family: 'NanumSquare Neo OTF';
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: 24px; /* 150% */
`;
