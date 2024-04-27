import { BkBtn, Title, Wrapper } from 'Routes/Home';
import { BoardSvg, ImgForSvg } from 'components/info/For_Iframe';

import lineUp from 'asset/images/LineUp.png';
import getImageSize from 'utils/getImageSize';
import { useEffect, useState } from 'react';
import { TopFixedBar, TopFixedBar_Blank } from 'components/info/TopFixedBar';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ConcertInfo() {
  const navigate = useNavigate();

  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    window.scrollTo(0, -200);
    getImageSize(lineUp)
      .then((response) => {
        setImgWidth(response.width);
        setImgHeight(response.height);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  console.log("imgWidth,imgHeight", imgWidth, imgHeight);

  return (
    <Wrapper>
      <TopFixedBar>
        <BkBtn style={{ left: '20px' }} onClick={() => navigate(-1)} />
        <Title>오늘의 공연</Title>
      </TopFixedBar>
      <TopFixedBar_Blank />
        {/* <ImgForSvg
          src={lineUp}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          scrolling="no"
        >
        </ImgForSvg> */}
        {imgHeight > 0
        ?
        <ImgBoard 
        src={lineUp}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        />
        :
        <TempText>
          이미지를 로딩 중입니다.
        </TempText>
        }
        
    </Wrapper>
  );
}

export default ConcertInfo;

const ImgBoard = styled.img`
width:${props=>props.imgWidth/4}px;
//png파일 4x로 저장
height:${props=>props.imgHeight/4}px;
`;

const TempText = styled.div`
color:white;
margin-top:10%;
`;
