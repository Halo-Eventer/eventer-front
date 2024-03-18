import { useState, useEffect } from 'react';
import {
    Link, useNavigate,
    useParams
} from 'react-router-dom';

import {
    Wrapper, TopFixedDiv,
    Title, BkBtn, HomeBtn,
    ImgBlock, StyledSlider, ImgBoard,
    MainBoard, TextBoard, LineDiv
} from '../Home';

import { getDetail } from '../../apis/apis';
import { UpperBar } from '../Home';

//import * as axios from 'axios';
/*import * as axios from 'axios';
는 JavaScript의 ES6 모듈 구문입니다. 
이 구문은 "axios"라는 모듈에서 
모든 export를 가져와서 axios라는 객체로 묶어
사용하겠다는 뜻입니다.*/


function Detail_Event() {
    const navigate = useNavigate();

    const eventId = useParams().id;


    var settings = {
        dots: true,  // 슬라이드 바닥에 점을 보이게 할 것인지 설정
        infinite: true,  // 무한 반복되게 할 것인지 설정
        speed: 500,  // 슬라이드하는데 걸리는 시간 설정
        slidesToShow: 1,  // 한 번에 보여줄 슬라이드 개수
        slidesToScroll: 1,  // 슬라이드 넘어갈 때마다 몇 개의 슬라이드를 넘길 것인지 설정
        autoplay: true,  // 자동으로 슬라이드를 넘길 것인지 설정
    };

    const [detailedList, setDetailedList] = useState([]);


    const onClick_bkBtn = () => {
        navigate(-1);
        //그냥 뒤로가는 기능
    }
    useEffect(() => {
        getDetail('event', eventId)
            .then((response) => {
                if (typeof (response.data) === 'object') {
                    setDetailedList(response.data);
                    console.log("detail fetch success : ",
                        response.data);
                } else {
                    console.log("detail fetch no data ;(");
                }
            }).catch((error) => {
                console.log("detail fetch failed ;(", error);
            })
    }, []);


    //useEffect(()=>{fetchDetail();},[]);

    return (
        <div>
            <TopFixedDiv>
                <UpperBar>
                    <BkBtn onClick={onClick_bkBtn}></BkBtn>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <HomeBtn />
                    </Link>
                    <Title>공지사항 / 이벤트</Title>
                </UpperBar>
            </TopFixedDiv>
            <Wrapper>
                <MainBoard>
                    <ImgBlock>
                        <StyledSlider {...settings}>
                            {detailedList.images?.map((item, key) =>
                                <ImgBoard key={key} src={item}></ImgBoard>)}
                        </StyledSlider>
                    </ImgBlock>
                    <TextBoard>
                        <div>
                            <h1>
                                {detailedList.name}
                            </h1>
                            <h2>
                                {detailedList.subtitle}
                            </h2>
                            {detailedList.content?.split('\n').map((line, key) => {
                                if (line.length === 0) {
                                    /*애초에 split함수로 개행문자를 기준으로 나눴다는 건 
                                    개행문자는 나눠진 원소에 들어가지 않는다는 뜻,
                                    따라서 변수 line에 개행문자가 들어갈 일은 없으므로
                                    그냥 공간만 차지하는 빈 원소일 뿐*/
                                    return <br key={key} />
                                }
                                else
                                    return <h3 key={key} >{line}</h3>
                            }
                            )}
                        </div>
                    </TextBoard>
                </MainBoard>
            </Wrapper>
        </div>
    )
}

export default Detail_Event;