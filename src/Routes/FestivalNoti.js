import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import styled from 'styled-components';

import {GlobalStyles, Wrapper, TopFixedDiv,
    UpperBar,Title, HomeBtn, BkBtn} from './Info';
import {eventList,notiList} from '../components/info/DataBase';

import {getEventList,getNotiList} from '../apis/apis';

import Event from '../components/info/Event';
import Noti from '../components/info/Noti';

function FestivalNoti(){
    const navigate = useNavigate();

    const festivalId = 1;
    // const EVENTLISTURL = "http://3.34.24.140:9998/event/1/list";
    // const NOTILISTURL = "http://3.34.24.140:9998/notice/1/list";
    // 이렇게 관리하지 말 것 

    const [color1, setColor1] = useState("black");
    const [color2, setColor2] = useState("gray");
    const [transForm,setTransForm]=useState("-92.5px");
    const [showNoti,setShoeNoti]=useState(true);

    // const [eventList, setEventList]=useState([]);
    // const [notiList,setNotiList]=useState([]);

    const onClick_bkBtn = () => {
        navigate(-1);
        //그냥 뒤로가는 기능
    }
    
    const onClick_noti = () => {
        setColor1("black");
        setColor2("gray");
        setTransForm("-193%");
        setShoeNoti(true);
    }
    const onClick_event = () => {
        setColor1("gray");
        setColor2("black");
        setTransForm("193%");
        setShoeNoti(false);
    }

    // useEffect(
    //     ()=>
    //     {
    //         getNotiList(festivalId).then
    //         (
    //             (response)=>
    //             {
    //                 if(response.data.length>0)
    //                 {
    //                     setNotiList(response.data);
    //                     console.log("notiList fetch success : ", response.data);
    //                 }else
    //                 {
    //                     console.log("notiList fetch no data ;(");
    //                 }
    //             }
    //         ).catch
    //         (
    //             (error)=>
    //             {
    //                     console.log("notiList fetch failed ;(", error);
    //             }
    //         );

    //         getEventList(festivalId).then
    //         (
    //             (response)=>
    //             {
    //                 if(response.data.length>0)
    //                 {
    //                     setEventList(response.data);
    //                     console.log("eventList fetch success : ", response.data);
    //                 }else
    //                 {
    //                     console.log("eventList fetch no data ;(");
    //                 }
    //             }
    //         ).catch
    //         (
    //             (error)=>
    //             {
    //                     console.log("eventList fetch failed ;(", error);
    //             }
    //         );
    //     }
    // ,[]);

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
                <SecondBar>
                    <SecondBtn 
                    onClick={onClick_noti}
                    color={color1}>
                        공지사항</SecondBtn>
                    <UnderBar transForm={transForm}></UnderBar>
                    <SecondBtn 
                    onClick={onClick_event}
                    color={color2}>
                        이벤트</SecondBtn>
                </SecondBar>
            </TopFixedDiv>
            <Wrapper>
                <GlobalStyles/>
            
                <MainBlock style={{marginTop:'108px'}}>
                    {
                        showNoti
                        ?<Noti notiList = {notiList}/>
                        :<Event eventList = {eventList}/>
                    }
                </MainBlock>
            </Wrapper>
        </div>
    )

}

export default FestivalNoti;

const UnderBar = styled.div`
transform:translateX(${(props)=>props.transForm});
`;
const SecondBtn = styled.div`
color: ${(props)=>props.color};
`;
const SecondBar = styled.div`
position:relative;
width: 100%;
height: 48px;
flex-shrink: 0;

background: #FFF;

display:flex;
justify-content:center;
align-items:center;

${SecondBtn}{
width:185px;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 800;
line-height: 24px; /* 150% */
cursor: pointer;
}

${UnderBar}{
position:absolute;
bottom:2px;
width: 48px;
height: 2px;
flex-shrink: 0;
background: #46515B;
transition: transform 0.2s ease-out;
}
`

const MainBlock = styled.div`
width:100vw;

margin-top:16px;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`;




