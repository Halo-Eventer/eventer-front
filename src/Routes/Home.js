import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import backSpace from 'asset/images/BackSpace.svg';
//import home from '../images/Home.png';
import logo from 'asset/images/Logo.svg';
import instagram from 'asset/images/instagram.svg';
import facebook from 'asset/images/facebook.svg';

import marker from 'asset/images/Marker.png';
import festival from 'asset/images/Festival.png';
import survey from 'asset/images/Survey.png';
import disabled from 'asset/images/Disabled.png';
import lost from 'asset/images/Lost.png';
import missing from 'asset/images/Missing.png';

import { getAll, getHome } from '../apis/apis';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from 'components/Footer';
import Missing_Popup from 'components/popup/Missing_Popup';

export const festivalId = 1;

function Home() {
  const navigate = useNavigate();

  const [currentNum, setCurrentNum] = useState(1);

  var settings = {
    dots: false, // 슬라이드 바닥에 점을 보이게 할 것인지 설정
    infinite: true, // 무한 반복되게 할 것인지 설정
    speed: 300, // 슬라이드하는데 걸리는 시간 설정
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 슬라이드 넘어갈 때마다 몇 개의 슬라이드를 넘길 것인지 설정
    autoplay: true, // 자동으로 슬라이드를 넘길 것인지 설정
    afterChange: (current) => {
      //event처럼 이미 current자리는 현재 슬라이드 번호에 대한 인자임
      setCurrentNum(current + 1);
    }, //현재 슬라이드 위치에 따른 변화 get가능
  };
  const onClick_detailPost = (event) => {
    event.preventDefault();
    const postId = event.currentTarget.id;
    console.log('postId : ', event.currentTarget.id);
    navigate(`/post/${postId}`);
  };

  //랜딩페이지 필요정보 Fetch //랜딩페이지 필요정보 Fetch //랜딩페이지 필요정보 Fetch
  const [homeList, setHomeList]=useState({});
  const [bannerList, setBannerList] = useState([]);
  const fetchHome = () => {
    getHome()
      .then(response => {
        setHomeList(response.date)
        console.log("homeList:", response.data);
      })
      .catch(error => { console.log("fetchHome error:", error) })
  }



  useEffect(() => {
    fetchHome();
  }, []);
  //랜딩페이지 필요정보 Fetch //랜딩페이지 필요정보 Fetch //랜딩페이지 필요정보 Fetch//



  //배너 리스트 set
  useEffect(()=>{
    setBannerList(homeList?.banner);
  },[homeList])
  //배너 리스트 set


  const [popupList, setPopupList] = useState([]);
  useEffect(() => {
    // 팝업 띄울 정보 받아오기
    setPopupList([
      { type: 0, name: '실종자 찾는 팝업' },
      { type: 1, name: '긴급공지 팝업' },
    ]);
  }, []);



  console.log(popupList);
  console.log("bannerList:",bannerList);
  return (
    <Wrapper>
      {popupList.length == 0 ? '' : <Overlay />}
      {popupList?.map((e) => {
        console.log(e.type);

        return (
          <Missing_Popup
            prop={e}
            popupList={popupList}
            setPopupList={setPopupList}
          />
        );
      })}

      <Board>
        <UpperBar>
          <img src={logo}></img>
          <FlexBox_Row style={{ gap: '12px' }}>
            <a href="https://www.instagram.com/mokpowshow/" target="_blank">
              {/* 새 탭 여는 법 */}
              <img src={instagram}></img>
            </a>

            <a
              href="https://www.facebook.com/wshowmokpo/?locale=ko_KR"
              target="_blank"
            >
              <img src={facebook}></img>
            </a>
          </FlexBox_Row>
        </UpperBar>


        <FlexBox_Row style={{ width: '100%' }}>
          {bannerList?.length > 0
            &&
            <ImgBlock>

              <Index>
                {currentNum}/{bannerList?.length}
              </Index>

              <StyledSlider {...settings}>
                {bannerList.map((item, key) => {
                  // if (key === 0 || key === 4)
                  return (
                    <ImgBoard
                      cursor="pointer"
                      //이상하게 cursor만 그냥 style={{}}로 전달이 안 되는 듯 하다
                      onClick={onClick_detailPost}
                      key={key}
                      id={item.id}
                      src={item.thumbnail}
                    />
                  );
                })}
              </StyledSlider>
            </ImgBlock>
          }
        </FlexBox_Row>

        <SecondBlock>
          <BigBox>
            <Link to="/map">
              <h1>
                <FlexBox_Row>
                  <Imoji src={marker} />
                  <p>공연장 지도</p>
                </FlexBox_Row>

                <button>주변시설 확인</button>
              </h1>
            </Link>
            <hr />
            <Link to="/concertInfo">
              <h1>
                <FlexBox_Row>
                  <Imoji src={festival} />
                  <p>오늘의 공연</p>
                </FlexBox_Row>

                <button>공연일정 보기</button>
              </h1>
            </Link>
          </BigBox>

          <SurveyBox>
            <h1>축제 만족도 조사</h1>
            <h2>축제 피드백해줘! 멘트써줘! 경품을 줘야하나</h2>
            <Imoji src={survey}></Imoji>
          </SurveyBox>

          <ETCBox>
            <ETC>
              <Imoji src={disabled} />
              <h1>장애인 지원</h1>
              <h2>휠체어, 배리어프리존</h2>
            </ETC>

            <ETC onClick={() => navigate('/missing')}>
              <Imoji src={missing} />
              <h1>실종자 찾기</h1>
              <h2>실종자 공지 신청하기</h2>
            </ETC>

            <ETC onClick={() => navigate('/lost')}>
              <Imoji src={lost} />
              <h1>분실물 찾기</h1>
              <h2>분실물 리스트 확인</h2>
            </ETC>
          </ETCBox>

          <Link to="/post/notice">
            <SmallBox>
              <h1>공지사항 / 이벤트</h1>
            </SmallBox>
          </Link>

          <Footer />
        </SecondBlock>
      </Board>
    </Wrapper>
  );
}
export default Home;
//settings도 export하려고 했는데 얘는 함수 내부여서 안 됨.
//무조건 전역자료들만 가능(객체라서 export가 중괄호 안에 안 들어갔다 이런게 아니라)

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
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

export const LineDiv = styled.div`
  @media screen and (min-width: 450px) {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);

    width: 392px;
    border-width: 0 1px 0 1px;
    border-color: #ccc;
    border-style: solid;

    background-color: transparent;

    height: 100vh;

    /* z-index:-1;
    //stacking(absolute, relative, fixed)일때만 z-index속성값이 해당되는거임.  */
  }
`;

//Wrapper는 무조건 100vw, 나머지 가운데정렬할 요소들은 크게크게 그냥 Wrapper안에다 div하나 더 깔 것
//Linediv같이 fixed요소를 추가할 게 있으면 애매해지기 때문. Wrapper자체가 absolute를 하면 안 되기 때문
export const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  //최소높이를 설정하고, 이를 넘어갈 시 자동으로 늘리게 해주는 개꿀 속성

  background-color: black;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const UpperBar = styled.div`
  position: relative;
  height: 48px;
  width: 100%;
  @media screen and (min-width: 450px) {
    width: 390px;
  }
  flex-shrink: 0;

  background-color: black;
  background-size: cover;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 16px;
`;

export const Board = styled.div`
  @media screen and (min-width: 450px) {
    width: 390px;
    background-color: transparent;
  }
`;

export const BoardSet_Width = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  @media screen and (min-width: 450px) {
    width: 390px;
  }
`;

//for 가독성
export const TopFixedDiv = styled.div`
  position: fixed;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
  margin: 0;
  padding: 0;

  background-color: black;

  display: flex;
  justify-content: center;

  z-index: 3;
`;
export const BkBtn = styled.div`
  background-image: url(${backSpace});
  position: absolute;

  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
`;
export const HomeBtn = styled.div`
  position: absolute;
  right: 20px;
  bottom: 12px;
  background-size: cover;

  width: 24px;
  height: 24px;
  cursor: pointer;
  margin: 0;
`;
// background-image: url(${home}); */

export const Title = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  color: #fff;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 17px;
  font-style: normal;
  font-weight: 700;

  line-height: 32px;
`;

//스타일 슬라이더 활용 (다음엔 다른거 써보자)
export const StyledSlider = styled(Slider)`
  background-color: #000;
  border-radius: 12px;
  .slick-dots {
    /* 여기에 원하는 스타일을 적용하세요. */
    z-index: 10;
    bottom: -18px;
    li {
      display: none;

      //버튼이 차지하는 공간 스타일
      width: 30px;
      height: 0px;
      margin: 0;
      button {
        //이외의 버튼
        color: white;
      }
      button:before {
        //눌렀던 버튼 스타일 (hover)
        color: white;
        font-size: 10px;
        opacity: 0.5;
      }
    }
    li.slick-active button:before {
      //현재 보여지고 있는 슬라이드
      color: rgba(255, 255, 255);
      opacity: 1;
    }
  }
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }
`;

export const ImgBlock = styled.div`
  position: relative;

  width: 358px;
  background-color: #000;
  margin-bottom: 6px;
`;
export const Index = styled(Flex)`
  position: absolute;
  top: 8px;
  right: 8px;

  width: 48px;
  height: 28px;
  flex-shrink: 0;

  border-radius: 12px;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(2px);

  z-index: 20;

  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
`;
export const ImgBoard = styled.img`
  object-fit: fill;
  object-position: center;
  //이미지 태그용 (<> background-position)
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background-color: #000;

  border-radius: 12px;

  z-index: 2;
  cursor: ${(props) => props.cursor};
`;

export const BigBox = styled.div``;
export const SmallBox = styled.div``;
export const Imoji = styled.img`
  width: 36px;
  height: 36px;
  flex-shrink: 0;

  border-radius: 4px;

  margin-right: 12px;
`;
export const SecondBlock = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  color: white;

  ${BigBox} {
    width: 358px;
    height: 152px;
    flex-shrink: 0;

    border-radius: 12px;
    background: #222;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);

    padding: 20px 16px;

    hr {
      width: 326px;
      height: 0px;
      flex-shrink: 0;

      stroke-width: 1px;
      stroke: #999;

      margin: 20px 0px;
    }

    h1 {
      color: #fff;
      /* headline1 */
      font-size: 18px;
      font-style: normal;
      font-weight: 900;
      line-height: 26px; /* 144.444% */

      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        color: #fff;
        font-family: 'Pretendard';
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px; /* 142.857% */

        border-radius: 8px;
        border: 1px solid #ccc;

        display: inline-flex;
        padding: 8px 12px;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;

        z-index: 5;
      }
    }
  }

  ${SmallBox} {
    width: 358px;
    height: 48px;
    flex-shrink: 0;

    border-radius: 12px;
    background: #222;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);

    padding: 12px;

    h1 {
      color: #fff;

      /* headline2 */
      font-family: 'NanumSquare Neo OTF';
      font-size: 16px;
      font-style: normal;
      font-weight: 900;
      line-height: 24px; /* 150% */

      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        color: #ddd;
        font-family: 'Pretendard';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
      }
    }
  }
`;

//For Detail_Event/Notice.js  //For Detail_Event/Notice.js  //For Detail_Event/Notice.js

export const MainBoard = styled.div`
  width: 390px;

  margin-top: 48px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #000;
`;

export const TextBoard = styled.div`
  width: 390px;

  margin-top: 32px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  div {
    width: 390px;
    flex-shrink: 0;

    background-color: #000;
    padding: 16px 12px 16px 12px;
    box-sizing: border-box;
    z-index: 2;
    h1 {
      color: #fff;
      font-family: 'Pretendard';
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      margin-bottom: 12px;
    }
    h2 {
      color: #fff;
      font-family: 'Pretendard';
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      margin-bottom: 12px;
    }
    h3 {
      color: #fff;
      font-family: 'Pretendard';
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;

      margin: 0;
      padding: 0;
    }
    hr {
      margin-top: 12px;
      margin-bottom: 16px;
    }
  }
`;
//For Detail_Event/Notice.js  //For Detail_Event/Notice.js  //For Detail_Event/Notice.js

//신버전 추가
//신버전 추가
//신버전 추가
export const SurveyBox = styled.button`
  position: relative;

  width: 358px;
  height: 80px;
  flex-shrink: 0;

  border-radius: 8px;
  border: 1px solid #999;
  background: #000;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 16px;

  h1 {
    color: #ddd;

    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: 24px; /* 150% */
  }
  h2 {
    color: #ddd;

    font-family: 'Pretendard';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
  }
  ${Imoji} {
    position: absolute;
    top: 50%;
    right: 16px; /*SurveyBox의 padding까지 계산*/
    transform: translateY(-50%);
  }
`;

export const ETC = styled.button``;
export const ETCBox = styled(Flex)`
  width: 358px;
  height: 126px;

  overflow-x: auto;

  justify-content: flex-start;
  gap: 8px;

  ${ETC} {
    width: 148px;
    height: 126px;
    flex-shrink: 0;

    border-radius: 12px;
    background: #222;
    box-shadow: 0px 2px 8px -4px rgba(0, 0, 0, 0.24);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 16px;

    h1 {
      margin-top: 8px;

      color: #fff;
      /* headline1 */
      font-size: 18px;
      font-style: normal;
      font-weight: 900;
      line-height: 26px; /* 144.444% */
    }

    h2 {
      color: #ddd;
      width: 148px;
      display: flex;
      justify-content: flex-start;

      justify-content: start;
      align-items: center;

      /* body3 */
      font-family: 'Pretendard';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
    }
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
