import styled from 'styled-components';
import { Input } from '../Assign';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { infoState } from 'recoils/atoms_assign';

function AssignBasicInfo_Missing() {

    //*****전역 recoil모음*****
    const [info, setInfo] = useRecoilState(infoState);
    //*****전역 recoil모음*****


  console.log("info (AssignBasicInfo_Missing.js):",info);
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
        value = {info.title} placeholder="실종자 이름"></Input>
      </InputDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input onChange={handleInfo} id="subtitle" 
        value = {info.subtitle} placeholder="실종자 나이"></Input>
      </InputDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input
          onChange={handleInfo} id="simpleExplanation"
          value = {info.simpleExplanation} placeholder="실종자 성별"
        ></Input>
      </InputDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input
          onChange={handleInfo} id="simpleExplanation"
          value = {info.simpleExplanation} placeholder="실종 위치"
        ></Input>
      </InputDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input
          onChange={handleInfo} id="simpleExplanation"
          value = {info.simpleExplanation} placeholder="실종 시간"
        ></Input>
      </InputDiv>

      <TextAreaDiv style={{ width: '336px' }}>
        <TextArea
          value={info.content}
          onChange={handleResizeHeight}
          id="content"
          rows={1}
          ref={textRef}
          placeholder="기타 특이사항"
          style={{ marginTop: '12px', height: '96px' }}
        ></TextArea>
      </TextAreaDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input
          onChange={handleInfo} id="simpleExplanation"
          value = {info.simpleExplanation} placeholder="보호자 성함"
        ></Input>
      </InputDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input
          onChange={handleInfo} id="simpleExplanation"
          value = {info.simpleExplanation} placeholder="보호자 연락처"
        ></Input>
      </InputDiv>
      
    </InputContainer>
  );
}
export default AssignBasicInfo_Missing;

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
  height: 112px;

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