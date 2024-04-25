import { Link, useNavigate } from 'react-router-dom';
import {
  UpperBar,
  MiddleBar,
  Logo,
  H1,
  GRID_WIDTH,
} from '../../Routes/assign/AssignPage_Home';
import next from 'asset/images/Next.svg';
import styled from 'styled-components';

export function UpperBar_Component() {
  const navigate = useNavigate('');
  const handleLogout = () => {
    localStorage.setItem('token', '');
    navigate('/login');
  };
  const handleAuth = () => {
    if (!localStorage.getItem('token')) {
      alert('어드민 로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else navigate('/assign');
  };
  return (
    <UpperBar>
      <div onClick={handleAuth}>
        <Logo>WABA</Logo>
      </div>
      <Link to="/login">
        {localStorage.getItem('token') ? (
          <LoginBox onClick={handleLogout} style={{ right: 0 }}>
            로그아웃
          </LoginBox>
        ) : (
          <LoginBox onClick={() => navigate('/login')} style={{ right: 0 }}>
            로그인
          </LoginBox>
        )}
      </Link>
    </UpperBar>
  );
}
export function MiddleBar_Component1() {
  return (
    <MiddleBar>
      <div>
        <Link to="/assign">
          <H1 color="#4F33F6" fontWeight="bold">
            페이지 선택
          </H1>
        </Link>
      </div>
    </MiddleBar>
  );
}
export function MiddleBar_Component2(props) {
  return (
    <MiddleBar>
      <div>
        <Link to="/assign">
          <H1>페이지 선택</H1>
        </Link>
        <img src={next} />
        <H1 color="#4F33F6" fontWeight="bold">
          {props.text}
        </H1>
      </div>
    </MiddleBar>
  );
}

const LoginBox = styled.div`
  font-family: 'NanumSquareNeo';
  color: var(--Font-02_black, #111);
  font-size: 16px;
  font-weight: 900;
  line-height: 24px; /* 150% */
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-${1120 / 2}px, -50%);
`;
