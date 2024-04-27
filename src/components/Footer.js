import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterBox>
      <h1 style={{top:'20px',left:'16px'}}>목포해상 W쇼</h1>

      <h2 style={{top:'54px',left:'16px'}}>페스티맵</h2>
      <h3 style={{top:'90px',left:'16px'}}>주소: 58750 전라남도 목포시 미항로 115</h3>

      <h3 style={{top:'120px',left:'16px'}}>이메일: festimap@gmail.com</h3>

      <h3 style={{top:'188px',left:'16px'}}>ⓒ Copyright festimap. All Rights Reserved.</h3>
    </FooterBox>
  );
}

export default Footer;

export const FooterBox = styled.div`
  position:relative;

  width: 100%;
  @media screen and (min-width: 450px) {
    width: 358px;
  }
  height:246px;

  background-color: #111;

  margin-top: 16px;

  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h1 {
    position:absolute;

   color: #999;
font-size: 20px;
font-style: normal;
font-weight: 800;
line-height: 28px; /* 140% */
  }

  h2{
    position:absolute;

    color: #999;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 24px; /* 150% */
  }

  h3 {
    position:absolute;

    color: #777;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
  }
`;
