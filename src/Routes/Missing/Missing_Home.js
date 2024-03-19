import { BkBtn, Title, TopFixedDiv, UpperBar, Wrapper } from 'Routes/Home';
import Missing_Input from 'components/missing/Missing_Input';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Missing_Home() {
  const navigate = useNavigate();
  const onClick_bkBtn = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <TopFixedDiv>
        <UpperBar>
          <BkBtn onClick={onClick_bkBtn}></BkBtn>
          <Title>실종자 찾기 신청</Title>
        </UpperBar>
      </TopFixedDiv>
      <MissingInfoContainer>
        <MissingTitle>실종자 정보</MissingTitle>
        <Missing_Input
          require={true}
          title="실종자 이름"
          placeholder="이름 입력"
        />
        <Missing_Input
          require={true}
          title="실종자 나이"
          placeholder="나이 입력(숫자만)"
        />
        <Missing_Input require={true} title="실종자 성별" btn={true} />
      </MissingInfoContainer>
    </Wrapper>
  );
}

export default Missing_Home;

const MissingTitle = styled.div`
  color: #fafafa;

  /* logo */
  font-family: 'NanumSquare Neo OTF';
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  line-height: 32px; /* 133.333% */

  align-self: flex-start;
`;
const MissingInfoContainer = styled.div`
  margin-top: 80px;
`;
