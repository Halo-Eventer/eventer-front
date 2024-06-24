import styled, { useTheme } from 'styled-components';
import { TopFixedBar } from './TopFixedBar';

import { useNavigate } from 'react-router-dom';
import bkBtn2 from 'asset/images/BackSpace.svg';
import {
  Flex,
  Title,
} from 'Routes/Home';

function TopFixedBarPostDetail({titleText}) {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <TopFixedBlock>
      <StyledTopFixedBar>
        <img onClick={() => navigate(-1)} src={bkBtn2} />
        <Title>{titleText}</Title>
      </StyledTopFixedBar>
    </TopFixedBlock>
  );
}

export default TopFixedBarPostDetail;

export const TopFixedBlock = styled(Flex)`
  width: 100%;
  @media screen and (min-width: 450px) {
    width: 390px;
  }
  position: fixed;
  left:50%;
  transform:translateX(-50%);
  flex-direction: column;

  z-index:10;
`;

export const StyledTopFixedBar = styled(TopFixedBar)`
  position: relative;
  background-color: black;

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: white;
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    font-family: 'NanumSquareNeo';
  }
  img{
    margin-left:16px;
    cursor:pointer;
  }
`;
