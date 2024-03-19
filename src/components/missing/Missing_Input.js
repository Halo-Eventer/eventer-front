import { useState } from 'react';
import styled from 'styled-components';

function Missing_Input(props) {
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    setActive(e.target.id);
  };
  return (
    <Container>
      <Title>
        {props.title}
        <Require>{props.require ? '(필수)' : ''}</Require>
      </Title>
      {props.btn ? (
        <BtnContainer>
          <GenderBtn active={active} id="1" onClick={handleClick}>
            남자
          </GenderBtn>
          <GenderBtn active={active} id="2" onClick={handleClick}>
            여자
          </GenderBtn>
        </BtnContainer>
      ) : (
        <Input placeholder={props.placeholder}></Input>
      )}
    </Container>
  );
}

export default Missing_Input;

const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.div`
  color: #999;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px; /* 142.857% */

  display: flex;
`;
const Input = styled.input`
  width: 358px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #222;
  color: #999;
  padding-left: 12px;
  border: none;
  :focus {
    outline: none !important;
    box-shadow: none !important;
  }
  ::placeholder {
    margin-left: 12px;
  }
`;

const Require = styled.div`
  color: #53cddd;
`;

const GenderBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  ${(props) =>
    props.active == props.id
      ? 'background: #53CDDD; color:black;'
      : 'background: #222222;'}
  border-radius: 12px;
`;

const BtnContainer = styled.div`
  margin-top: 6px;
  width: 128px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #222;

  display: flex;

  padding: 4px;
`;
