import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styled from 'styled-components';

import birthDay from '../../images/BirthDay.svg';

function Event({ eventList }) {
  const navigate = useNavigate();

  const onClick_detail = (event) => {
    event.preventDefault();
    const eventId = event.currentTarget.id; 
    //target과 currentTarget의 차이 =>
    //target : 해당 태그의 가장 하위태그까지의 속성값 조사
    //currentTarget : 이벤트가 발생한 딱 그 태그만 조사

    console.log('eventId : ', eventId);
    navigate(`/event/${eventId}`);
  };
  return (
    <div>
      {
      typeof(eventList)==='object'
      &&
      eventList.map((item, key) => (
      <Section 
      onClick={onClick_detail} 
      key={key}
      id={item.id}>
          <ImageDiv url={item.thumbnail} />
          <TextDiv>
            <h1>{item.name}</h1>
            <h2>{item.summary}</h2>
          </TextDiv>
        </Section>
      ))}
    </div>
  );
}

export default Event;

const ImageDiv = styled.div`
  background-image: url(${(props) => props.url});
`;
const TextDiv = styled.div``;
const Section = styled.div`
  width: 350px;
  margin-bottom: 12px;

  cursor: pointer;

  padding: 0;

  ${ImageDiv} {
    width: 350px;
    height: 350px;
    flex-shrink: 0;
    border-radius: 12px 12px 0px 0px;
    background-size: cover;
  }
  ${TextDiv} {
    box-sizing: border-box;
    width: 350px;
    flex-shrink: 0;
    background-color: white;
    border-radius: 0px 0px 12px 12px;

    padding: 12px;
    h1 {
      color: #000;
      font-family: Pretendard;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      margin: 0;
      margin-bottom: 4px;
    }
    h2 {
      color: #46515b;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      margin: 0;
    }
  }
`;
