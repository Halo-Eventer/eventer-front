import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { infoState } from 'recoils/atoms_assign';
import AssignThumbnail from '../AssignThumbnail';
import { Input, InputContainer, InputDiv } from 'Routes/assign/AssignPage_Home';

function AssignBasicInfo_Lost() {

  //*****전역 recoil모음*****
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****


  console.log("info (AssignBasicInfo_Lost.js):", info);
  const [active, setActive] = useState(true);
  const textRef = useRef();
  const boxRef = useRef();



  const handleResizeHeight = (e) => {
    if (e.keyCode == 13 || 8) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
      //scrollHeight : 콘텐츠 자체 높이 / clientHeight : 보이는 높이
      boxRef.current.style.height = `auto`;
      boxRef.current.style.height = `${boxRef.current.scrollHeight}px`;
    }
    handleInfo(e);
  };
  // const deleteETC = () => {
  //   const { type, isOperation, ...rest } = info;
  //   setInfo({ ...rest });
  // };
  const handleInfo = (e) => {
    console.log(e);
    const [value, id] = [e.target.value, e.target.id];
    setInfo({ ...info, [id]: value });
  };


  // useEffect(() => { deleteETC(); }, []);



  return (
    <div>
      <AssignThumbnail />

      <InputContainer ref={boxRef}>
        <InputDiv>
          <Input onChange={handleInfo} id="type"
            value={info.type} placeholder="물건 카테고리 입력"></Input>
        </InputDiv>

        <InputDiv>
          <Input onChange={handleInfo} id="name"
            value={info.name} placeholder="물건 이름 입력"></Input>
        </InputDiv>

        <InputDiv>
          <Input
            onChange={handleInfo} id="findDate"
            value={info.findDate} placeholder="발견 날짜 입력"
          ></Input>
        </InputDiv>

      </InputContainer>
    </div>
  );
}
export default AssignBasicInfo_Lost;


