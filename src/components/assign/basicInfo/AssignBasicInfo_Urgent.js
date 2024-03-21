import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { infoState } from 'recoils/atoms_assign';
import { Input, InputContainer, InputDiv, TextArea, TextAreaDiv } from 'Routes/assign/AssignPage_Home';

function AssignBasicInfo_Urgent() {

    //*****전역 recoil모음*****
    const [info, setInfo] = useRecoilState(infoState);
    //*****전역 recoil모음*****


  console.log("info (AssignBasicInfo_Urgent.js):",info);
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
      <InputDiv>
        <Input onChange={handleInfo} id="title" 
        value = {info.title} placeholder="제목"></Input>
      </InputDiv>


      <TextAreaDiv>
        <TextArea
          value={info.content}
          onChange={handleResizeHeight}
          id="content"
          rows={1}
          ref={textRef}
          placeholder="내용"
        ></TextArea>
      </TextAreaDiv>
      
    </InputContainer>
  );
}
export default AssignBasicInfo_Urgent;
