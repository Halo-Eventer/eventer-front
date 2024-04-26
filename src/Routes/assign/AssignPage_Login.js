import { loginApi } from 'apis/apis_POST';
import { UpperBar_Component } from 'components/assign/Assign_Bar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function AssignPage_Login() {
  const [loginInfo, setLoginInfo] = useState({ userId: '', password: '' });
  const navigate = useNavigate();

  const handleInfo = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    loginApi(loginInfo)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/assign');
      })
      .catch((err) => {
        if (err.response.status === 400)
          alert('잘못된 아이디 혹은 비밀번호 입니다.');
      });
  };
  return (
    <LoginContainer>
      <UpperBar_Component />
      <LoginBox>
        <h1>관리자 로그인</h1>
        <InputBox
          onChange={handleInfo}
          name="userId"
          placeholder="아이디 입력"
        />
        <InputBox
          onChange={handleInfo}
          name="password"
          type="password"
          placeholder="비밀번호 입력"
        />
        <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
      </LoginBox>
    </LoginContainer>
  );
}
export default AssignPage_Login;

const LoginContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #fff;
  h1 {
    font-size: 24px;
    justify-self: start;
  }
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  margin: 180px auto;
  width: 320px;

  border: 1px solid var(--Line-Regular_Color, #e5e5ec);
  border-radius: 12px;

  :nth-child(2) {
    margin-top: 20px;
  }
`;
const InputBox = styled.input`
  padding-left: 12px;
  height: 36px;
  width: 240px;
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid var(--Line-Regular_Color, #e5e5ec);
  background: var(--Font-01_White, #fff);
`;

const LoginBtn = styled.button`
  margin-top: 12px;
  border-radius: 8px;
  height: 36px;
  width: 240px;
  background-color: black;
  color: white;
`;
