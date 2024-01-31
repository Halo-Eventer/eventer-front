import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import styled from 'styled-components';

import {GlobalStyles, Wrapper, TopFixedDiv,
    UpperBar,Title, HomeBtn, BkBtn} from './Info';
// import {eventList,noticeList} from '../components/info/DataBase';

import {getAll} from '../apis/apis';

import Event from '../components/info/Event';
import Notice from '../components/info/Notice';

function FestivalNotice(){
    const navigate = useNavigate();

    const festivalId = 1;
    // const EVENTLISTURL = "http://3.34.24.140:9998/event/1/list";
    // const NOTILISTURL = "http://3.34.24.140:9998/notice/1/list";
    // 이렇게 관리하지 말 것 

    const [color1, setColor1] = useState("black");
    const [color2, setColor2] = useState("gray");
    const [transForm,setTransForm]=useState("-92.5px");
    const [showNotice,setShoeNotice]=useState(true);

    const [eventList, setEventList]=useState([]);
    const [noticeList,setNoticeList]=useState([]);

    const fetchList = (category) => {
        let type="";
        getAll(festivalId,category,type)
        .then((response)=>{
          if(response.data){
            console.log("fetch List success",response.data);
            if(category==='notice')
                setNoticeList(response.data);
            else if(category==='event')
                setEventList(response.data);
          }else{
            console.log("fetch List no data ;(",response);
            if(category==='notice')
                setNoticeList([]);
            else if(category==='event')
                setEventList([]);
          }
        }).catch((error)=>{
          console.log('fetch List error',error);
        })
      }
    const onClick_bkBtn = () => {
        navigate(-1);
        //그냥 뒤로가는 기능
    }
    
    const onClick_notice = () => {
        setColor1("black");
        setColor2("gray");
        setTransForm("-193%");
        setShoeNotice(true);
    }
    const onClick_event = () => {
        setColor1("gray");
        setColor2("black");
        setTransForm("193%");
        setShoeNotice(false);
    }

    useEffect(()=>{
        fetchList('notice');
        fetchList('event');},[]);

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
                    onClick={onClick_notice}
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
            
                <MainBlock>
                    {
                        showNotice
                        ?<Notice noticeList = {noticeList}/>
                        :<Event eventList = {eventList}/>
                    }
                </MainBlock>
            </Wrapper>
        </div>
    )

}

export default FestivalNotice;

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
margin-top:108px;

overflow:auto;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`;




