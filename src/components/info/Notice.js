import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import styled from 'styled-components';

import barItem from '../../images/BarItem.svg';

function Notice({noticeList}){
    const navigate=useNavigate();

    const onClick_detail = (event) =>{
        event.preventDefault();
        const notiId = event.currentTarget.dataset.value; 
        //target과 currentTarget의 차이 =>
        //target : 해당 태그의 가장 하위태그까지의 속성값 조사
        //currentTarget : 이벤트가 발생한 딱 그 태그만 조사

        console.log("noticeId : ",event.currentTarget.dataset.value);
        navigate(`/notice/${notiId}`);
    }

    console.log(noticeList,typeof(noticeList)==='object');
    return (
        <div>
            {
            typeof(noticeList)==='object'
            && noticeList.map((item,key)=>
            <Section 
            onClick={onClick_detail} 
            key={key}
            data-value={key}>
                <ImageDiv url={item.thumbnail}/>
                <TextDiv>
                    <h1>{item.title}</h1>
                    <h2>{item.simpleExplanation}</h2>
                </TextDiv>
            </Section>)}
            {/* <Section onClick={onClick_detail} data-value={1}>
                <ImageDiv url={barItem}/>
                <TextDiv>
                    <h1>반입 금지 물품 안내</h1>
                    <h2>안전하고 편안한 무대 관람을 위한 반입 금지 묵품을...</h2>
                </TextDiv>
            </Section> */}
        </div>
    )
}

export default Notice;


const ImageDiv = styled.div`
background-image: url(${(props)=>props.url});
`;
const TextDiv = styled.div``;
const Section = styled.div`
width:350px;
margin-bottom:12px;
cursor: pointer;

${ImageDiv}{
width: 350px;
height: 350px;
flex-shrink: 0;
border-radius: 12px 12px 0px 0px;
background-size : cover;
}
${TextDiv}{
box-sizing:border-box;
width: 350px;
flex-shrink: 0;
background-color: white;
border-radius: 0px 0px 12px 12px;

padding:12px;
    h1{
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    margin:0;
    margin-bottom:4px;
    }
    h2{
    color: #46515B;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height:18px;
    margin:0;
}
}
`;