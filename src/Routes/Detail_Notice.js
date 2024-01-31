import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import styled from 'styled-components';

import {GlobalStyles, Wrapper, TopFixedDiv,
    UpperBar,Title, BkBtn, HomeBtn,
    ImgBlock, StyledSlider,ImgBoard} from './Info';

import {getDetailNotice} from '../apis/apis';

function Detail_Notice(){
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

    const [detailedList, setDetailedList]=useState([]);

    const onClick_bkBtn = () => {
        navigate(-1);
        //그냥 뒤로가는 기능
    }

    useEffect(() => {
        getDetailNotice('notice',id_param)
        .then((response)=>{
            if(typeof(response.data) === 'object'){
                setDetailedList(response.data.content);
                console.log("detail fetch success : ",
                response.data);
            }else{
                console.log("detail fetch no data ;(");
            }
        }).catch((error)=>{
            console.log("detail fetch failed ;(", error);
        })
    },[]);


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

export default Detail_Notice;
const FlexBox_Row = styled.div`
width:100vw;
display:flex;
justify-content:center;
align-items:center;
`;

const MainBoard = styled.div`
width:390px;

border:1px solid #ccc;

display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;

background-color:white;
`;

const TextBoard = styled.div`
width:390px;
overflow:auto;

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
        margin-top:12px;
        
        line-height:160%;
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

    }
}
`