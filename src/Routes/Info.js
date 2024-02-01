import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import backSpace from '../images/BackSpace.svg';
import backGround from '../images/BackGround.svg';
import home from '../images/Home.png';
import happySejong from '../images/HappySejong.svg';
import idol from '../images/Idol.svg';

import { getAll } from '../apis/apis';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Info() {
  const navigate = useNavigate();

  const festivalId = 1;
  const [barPos, setBarPos] = useState('0');
  const [colorInfo, setColorInfo] = useState('white');
  const [colorMap, setColorMap] = useState('black');
  const [infoMap, setInfoMap] = useState(true);

  var settings = {
    dots: true, // 슬라이드 바닥에 점을 보이게 할 것인지 설정
    infinite: true, // 무한 반복되게 할 것인지 설정
    speed: 300, // 슬라이드하는데 걸리는 시간 설정
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 슬라이드 넘어갈 때마다 몇 개의 슬라이드를 넘길 것인지 설정
    autoplay: true, // 자동으로 슬라이드를 넘길 것인지 설정
  };
  const onClick_festivalInfo = () => {
    navigate('/festivalInfo');
  };
  const onClick_festivalNoti = () => {
    navigate('/festivalNotice');
  };
  const onClick_detailNoti = (event) => {
    event.preventDefault();
    const notiId = event.currentTarget.id;
    console.log('notiId : ', event.currentTarget.id);
    navigate(`/notice/${notiId}`);
  };
  const onClick_detailEvent = (event) => {
    event.preventDefault();
    const eventId = event.currentTarget.id;
    console.log('eventId : ', event.currentTarget.id);
    navigate(`/event/${eventId}`);
  };



  //임시 랜딩페이지 Fetch////임시 랜딩페이지 Fetch////임시 랜딩페이지 Fetch//
  const [eventList, setEventList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const fetchList = (category) => {
    let type = "";
    getAll(festivalId, category, type)
      .then((response) => {
        if (response.data) {
          console.log("fetch List success", response.data);
          if (category === 'notice')
            setNoticeList(response.data);
          else if (category === 'event')
            setEventList(response.data);
        } else {
          console.log("fetch List no data ;(", response);
          if (category === 'notice')
            setNoticeList([]);
          else if (category === 'event')
            setEventList([]);
        }
      }).catch((error) => {
        console.log('fetch List error', error);
      })
  }
  useEffect(() => {
    fetchList('notice');
    fetchList('event');
  }, []);
  //임시 랜딩페이지 Fetch////임시 랜딩페이지 Fetch////임시 랜딩페이지 Fetch//


  return (
    <Wrapper>
      <LineDiv>
      <GlobalStyles />
        <UpperBar>
          <img src={happySejong}></img>
        </UpperBar>
        <FlexBox_Row style={{ width: '100%' }}>
          <ImgBlock>
            <StyledSlider {...settings}>
              {noticeList.map((item, key) => {
                // if (key === 0 || key === 4)
                return (
                  <ImgBoard
                    cursor="pointer"
                    //이상하게 cursor만 그냥 style={{}}로 전달이 안 되는 듯 하다
                    onClick={onClick_detailNoti}
                    key={key}
                    id={item.id}
                    src={item.thumbnail}
                  />
                );
                // else if (key === 1)
                //   return (
                //     <ImgBoard
                //       cursor="pointer"
                //       //이상하게 cursor만 그냥 style={{}}로 전달이 안 되는 듯 하다
                //       onClick={onClick_festivalInfo}
                //       key={key}
                //       data-value={key}
                //       src={idol}
                //     />
                //   );
              })}

              {eventList.map((item, key) => {
                return (
                  <ImgBoard
                    cursor="pointer"
                    onClick={onClick_detailEvent}
                    key={key}
                    id={item.id}
                    src={item.thumbnail}
                  />
                );
              })}
            </StyledSlider>
          </ImgBlock>
        </FlexBox_Row>
        <SecondBlock>
          <InfoBox onClick={onClick_festivalInfo}>
            <h1>공연정보</h1>
            <h2>입장안내 / 티켓정보 / 공연일정</h2>
          </InfoBox>
          <NoticeBox onClick={onClick_festivalNoti}>
            <h1>공지사항</h1>
            <h2>이벤트/ 공지사항</h2>
          </NoticeBox>
        </SecondBlock>
        </LineDiv>
    </Wrapper>
  );
}
export default Info;
//settings도 export하려고 했는데 얘는 함수 내부여서 안 됨.
//무조건 전역자료들만 가능(객체라서 export가 중괄호 안에 안 들어갔다 이런게 아니라)

export const FlexBox_Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexBox_Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'CWDangamAsac-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/CWDangamAsac-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;
//스타일컴포넌트 전역스타일 (적용)


export const LineDiv = styled.div`
  @media screen and (min-width: 450px) {
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    z-index:-3;

    width: 392px;
    border-width:0 1px 0 1px;
    border-color:#ccc;
    border-style:solid;

    height:100vh;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height : 100vh;
  @media screen and (min-width: 450px) {
    width: 390px;
  }
  //CSS에서 @media 규칙 안의 screen은 미디어 유형을 지정하는 키워드


  background-image: url(${backGround}); //css에서 jsx변수 쓰고싶다면 {}뿐만 아니라 $까지 추가
  background-repeat: repeat;
  background-size: cover; // 이미지가 div를 완전히 채우도록 설정

  margin: 0;
  padding: 0;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
z-index:-3;

`;

export const StyledLink = styled(Link)`
text-decoration:none;
cursor:pointer;
`;



//for 가독성
export const TopFixedDiv = styled.div`
  position: fixed;
  width: 100%;
  @media screen and (min-width: 450px) {
    width: 390px;
  }
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
  margin: 0;
  padding: 0;
`;
export const UpperBar = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  flex-shrink: 0;

  background-color: #e63136;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BkBtn = styled.div`
  background-image: url(${backSpace});
  position: absolute;
  left: 20px;

  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
`;
export const HomeBtn = styled.div`
  position: absolute;
  right: 20px;
  bottom: 12px;
  background-image: url(${home});
  background-size: cover;

  width: 24px;
  height: 24px;
  cursor: pointer;
  margin: 0;
`;

export const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

//스타일 슬라이더 활용 (다음엔 다른거 써보자)
export const StyledSlider = styled(Slider)`
  .slick-dots {
    /* 여기에 원하는 스타일을 적용하세요. */
    z-index: 10;
    bottom: -18px;

    li {
      //버튼이 차지하는 공간 스타일
      width: 30px;
      height: 0px;
      margin: 0;
      button {
        //이외의 버튼
        color: rgb(250, 250, 250);
      }
      button:before {
        //눌렀던 버튼 스타일 (hover)
        color: rgb(150, 150, 150);
        font-size: 10px;
      }
    }
    li.slick-active button:before {
      //현재 보여지고 있는 슬라이드
      color: #e63136;
    }
  }
`;

export const ImgBlock = styled.div`
  width: 390px;
`;

export const ImgBoard = styled.img`
  object-fit:cover;
  object-position:center;
    //이미지 태그용 (<> background-position)
  width: 100%;
  flex-shrink: 0;

  z-index: 2;
  cursor: ${(props) => props.cursor};
`;

export const InfoBox = styled.div``;
export const NoticeBox = styled.div``;
export const SecondBlock = styled.div`
  width: 100%;

  margin-top: 32px;
  margin-bottom: 28px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  h1 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 4px;
  }
  h2 {
    font-size: 12px;
    font-weight: 500;
    margin: 0;
  }

  ${InfoBox} {
    width: 200px;
    height: 110px;
    flex-shrink: 0;

    margin-right: 10px;

    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);

    cursor: pointer;

    padding: 12px;
  }

  ${NoticeBox} {
    width: 110px;
    height: 110px;
    flex-shrink: 0;

    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);

    cursor: pointer;

    padding: 12px;
  }
`;




//For Detail_Event/Notice.js  //For Detail_Event/Notice.js  //For Detail_Event/Notice.js

export const MainBoard = styled.div`
width:390px;

margin-top:48px;

display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;

background-color:white;
`;


export const TextBoard = styled.div`
width:390px;

margin-top:32px;

display:flex;
justify-content:center;
align-items:flex-start;

div{
    width: 390px;
    flex-shrink: 0;

    padding:16px 12px 16px 12px;
    box-sizing:border-box;
    z-index:2;
    h1{
        color: #000;
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        margin-bottom:12px;
    }
    h2{
        color: #000;
        font-family: Pretendard;
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height:24px;
        margin-bottom:12px;
    }
    h3{
        color: #46515B;
        font-family: Pretendard;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;

        margin:0;
        padding:0;
    }
}
`;
//For Detail_Event/Notice.js  //For Detail_Event/Notice.js  //For Detail_Event/Notice.js