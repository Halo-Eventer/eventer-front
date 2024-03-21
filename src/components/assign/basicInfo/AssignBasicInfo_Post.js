import styled from 'styled-components';
import {Input} from '../Assign';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { infoState } from 'recoils/atoms_assign';

function AssignBasicInfo_Post() {

    //*****전역 recoil모음*****
    const [info, setInfo] = useRecoilState(infoState);
    //*****전역 recoil모음*****



  console.log("info (AssignBasicInfo_Post.js):",info);
  const [active, setActive] = useState(true);
  const textRef = useRef();
  const boxRef = useRef();



  const handleResizeHeight = (e) => 
  {
    if (e.keyCode == 13 || 8) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
      //scrollHeight : 콘텐츠 자체 높이 / clientHeight : 보이는 높이
      boxRef.current.style.height = `auto`;
      boxRef.current.style.height = `${boxRef.current.scrollHeight}px`;
    }
    handleInfo(e);
  };
  const deleteETC = () => 
  {
    const { type, isOperation, ...rest } = info;
    setInfo({ ...rest });
  };
  const handleInfo = (e) => 
  {
    console.log(e);
    const [value, id] = [e.target.value, e.target.id];
    setInfo({ ...info, [id]: value });
  };


  useEffect(()=>{deleteETC();},[]);



  return (
    <InputContainer ref={boxRef}>
      <InputDiv style={{ marginTop: '4px' }}>
        <Input onChange={handleInfo} id="title" 
        value = {info.title} placeholder="제목"></Input>
      </InputDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input onChange={handleInfo} id="subtitle" 
        value = {info.subtitle} placeholder="부제목"></Input>
      </InputDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input
          onChange={handleInfo} id="simpleExplanation"
          value = {info.simpleExplanation} placeholder="요약 설명"
        ></Input>
      </InputDiv>


      <TextAreaDiv style={{ width: '336px' }}>
        <TextArea
          value={info.content}
          onChange={handleResizeHeight}
          id="content"
          rows={1}
          ref={textRef}
          placeholder="본문 내용"
          style={{ marginTop: '12px', height: '96px' }}
        ></TextArea>

      </TextAreaDiv>
      
    </InputContainer>
  );
}
export default AssignBasicInfo_Post;

const TextAreaDiv = styled.div`
  background: #fafafa;
  margin-left: 8px;
  margin-top: 4px;
`;
const InputDiv = styled.div`
  background: #fafafa;
  width: 336px;
  height: 40px;

  margin-left: 8px;
`;

const InputContainer = styled.div`
  margin-top: 8px;
  width: 350px;
  height: auto;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #eee;
  padding-bottom: 8px;
`;
const TextArea = styled.textarea`
  margin-left: 8px;
  width: 320px;
  height: 96px;

  background: #fafafa;

  color: #111;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px; /* 160% */

  resize: none;

  overflow-y: visible;
  border: none;

  white-space: pre-wrap;

  &:focus {
    outline: none;
  }
`;