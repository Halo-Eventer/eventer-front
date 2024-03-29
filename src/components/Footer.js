import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterBox>
      <h1>WABA</h1>

      <Link to="www.waba.com">
        <h2>www.waba.com</h2>
      </Link>

      <Link to="@waba_official">
        <h2>@waba_official</h2>
      </Link>
    </FooterBox>
  );
}

export default Footer;

export const FooterBox = styled.div`
  width: 100%;
  @media screen and (min-width: 450px) {
    width: 358px;
  }

  background-color: #111;

  margin-top: 16px;

  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h1 {
    color: #999;
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: 24px; /* 150% */

    margin-bottom: 4px;
  }

  h2 {
    color: #777;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    text-decoration-line: underline;

    margin-bottom: 6px;
  }
`;
