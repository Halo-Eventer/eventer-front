import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styled from 'styled-components';

import {ImageDiv,TextDiv, Section} from '../../Routes/FestivalNotice';


function Notice({ noticeList }) {
    const navigate = useNavigate();

    const onClick_detail = (event) => {
        event.preventDefault();
        const notiId = event.currentTarget.id;
        //target과 currentTarget의 차이 =>
        //target : 해당 태그의 가장 하위태그까지의 속성값 조사
        //currentTarget : 이벤트가 발생한 딱 그 태그만 조사

        console.log("noticeId : ", notiId);
        navigate(`/notice/${notiId}`);
    }

    console.log(noticeList, typeof (noticeList) === 'object');
    return (
        <div>
            {
                noticeList?.map((item, index) => {
                    let tmp = '0';
                    if(index == 0)
                        tmp = '8px'
                    return <Section
                        onClick={onClick_detail}
                        key={index}
                        id={item.id}
                        marginTop={tmp}
                        >
                        <ImageDiv url={item.thumbnail} />
                        <TextDiv>
                            <h1>{item.title}</h1>
                            <h2>{item.simpleExplanation}</h2>
                        </TextDiv>
                    </Section>
                })}
        </div>
    )
}

export default Notice;


