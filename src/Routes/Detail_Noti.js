import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import styled from 'styled-components';

import {GlobalStyles, Wrapper, TopFixedDiv,
    UpperBar,Title, BkBtn, HomeBtn,
    ImgBlock, StyledSlider,ImgBoard} from './Info';

import {notiList} from '../components/info/DataBase';

import * as axios from 'axios';


function Detail_Noti(){
    const navigate = useNavigate();
    const id_param = useParams().id;

    var settings = {
        dots: true,  // 슬라이드 바닥에 점을 보이게 할 것인지 설정
        infinite: true,  // 무한 반복되게 할 것인지 설정
        speed: 500,  // 슬라이드하는데 걸리는 시간 설정
        slidesToShow: 1,  // 한 번에 보여줄 슬라이드 개수
        slidesToScroll: 1,  // 슬라이드 넘어갈 때마다 몇 개의 슬라이드를 넘길 것인지 설정
        autoplay: true,  // 자동으로 슬라이드를 넘길 것인지 설정
    };
    // const [text1,setText1] = useState('고독한 생일파티');
    // const [text2,setText2] = useState(`🍰2023 세종대학교 대동제 “해피세종데이” 프로그램 <2023 집현전 고전특강: 고독한 생일파티> 안내🍰`);
    // const [text3,setText3] = useState(`새로운 바람, 밝은 달💨🌕안녕하세요,
    // 세종대학교 제36대 총학생회 풍월[風;月] 입니다.
    // 세종대학교 대동제 “해피세종데이”와 함께 고독한 생일파티를 즐겨보세요!
    
    // <집현전 고전특강>이란?기존에 한정되어 있던 고전독서 인증 수단의 결핍을 해소하고, 시험이 아닌 특강 수강 및 소감문 작성을 통해 고전독서 인증의 부담을 덜어드리기 위해 준비된 프로그램입니다.
    
    // 또한 4월 월별 설문조사 결과를 바탕으로, 집현전 고전특강의 인증 분야는 ‘과학사상'이며, 해당분야 도서 중 응시횟수는 많지만 합격률이 낮은 도서인 ‘부분과 전체'를 대상 도서로 선정하였습니다.
    
    // *자세한 내용은 해당 게시글 및 카드뉴스 참고해주세요.
    
    // 행사명 | 2023 집현전 고전특강 : 고독한 생일파티
    // 일정 | 2023.05.19 (금) 15:00 ~ 17:00
    // 장소 | 세종대학교 학생회관 지하 1층 대공연장
    // 인증 도서 | 과학사상 영역 <부분과 전체>
    // 강연자 | 이희원 교수 (대양휴머니티칼리지 학장, 물리천문학과 교수)
    // 강연 주제 | 하이젠베르크와 의료천체핵물리학 - CNO 순환 반응과 PET
    // 참여인원 | 선착순 200명
    // 신청방법 |05.09 (화) 20:00 - 05.10 (수) 10:00: 두드림을 통한 온라인 신청(선착순 200명)
    
    // * 프로필 링크트리 링크 참고
    // 05.11 (목): 참여대상자(200명)에 한하여 안내문자 발송* 정원 200명 초과 시 대기자로 신청가능 (취소자 및 참가조건 미달에 따라, 대기자 순서대로 참여승인될 수 있음)
    
    // 📞 문의사항- 두드림 홈페이지 참고`);
    // const [urlList,setUrlList]=useState([]);

    const [detailedList, setDetailedList]=
    useState(notiList[id_param]);

    const onClick_bkBtn = () => {
        navigate(-1);
        //그냥 뒤로가는 기능
    }

    return(
        <div>
            <TopFixedDiv>
                <UpperBar>
                    <BkBtn onClick={onClick_bkBtn}></BkBtn>
                    <Link to="/" style={{textDecoration:'none'}}>
                        <HomeBtn/>
                    </Link>
                    <Title>공지사항 / 이벤트</Title>
                </UpperBar>
            </TopFixedDiv>
            <Wrapper>
                <GlobalStyles/>
                <MainBoard style={{marginTop:'48px'}}>
                    <ImgBlock>
                        <StyledSlider {...settings}>
                            {detailedList.images.map((item,key)=>
                            <ImgBoard key={key} src={item}></ImgBoard>)}

                            {/* <ImgBoard src={barItem}></ImgBoard>
                            <ImgBoard src={birthDay2}></ImgBoard>
                            <ImgBoard src={birthDay3}></ImgBoard>
                            <ImgBoard src={birthDay4}></ImgBoard> */}
                        </StyledSlider>
                    </ImgBlock>
                    <TextBoard>
                        <div>
                            <h1>
                                {detailedList.title}
                            </h1>
                            <h2>
                                {detailedList.subtitle}
                            </h2>
                            {detailedList.content.split('\n').map((line,key)=>
                                {   
                                    if(line.length===0){
                                        /*애초에 split함수로 개행문자를 기준으로 나눴다는 건 
                                        개행문자는 나눠진 원소에 들어가지 않는다는 뜻,
                                        따라서 변수 line에 개행문자가 들어갈 일은 없으므로
                                        그냥 공간만 차지하는 빈 원소일 뿐*/
                                        return <br key = {key}/>
                                    }
                                    else
                                        return <h3 key = {key} >{line}</h3>
                                }
                                        )}
                        </div>
                    </TextBoard>
                </MainBoard>
            </Wrapper>
        </div>
    )
}

export default Detail_Noti;
const FlexBox_Row = styled.div`
width:100vw;
display:flex;
justify-content:center;
align-items:center;
`;

const MainBoard = styled.div`
width:390px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;

background-color:white;
`;

const TextBoard = styled.div`
width:390px;
display:flex;
justify-content:center;
align-items:flex-start;
div{
    width: 390px;
    flex-shrink: 0;

    padding:12px;
    padding-top:16px;
    box-sizing:border-box;
    z-index:2;
    h1{
        color: #000;
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
    }
    h2{
        color: #000;
        font-family: Pretendard;
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
    }
    h3{
        color: #46515B;
        font-family: Pretendard;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;

        padding:0;
        margin:0;
    }
}
`