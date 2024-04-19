import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { infoState } from 'recoils/atoms_assign';
import { Flex } from 'asset/Style';

import AssignThumbnail from '../AssignThumbnail';
import {
  Input,
  InputContainer,
  InputDiv,
  TextArea,
  TextAreaDiv,
} from 'Routes/assign/AssignPage_Home';

function AssignBasicInfo_Missing() {
  //*****전역 recoil모음*****
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****

  // console.log('info (AssignBasicInfo_Missing.js):', info);
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
    // console.log(e);
    let [value, id] = [e.target.value, e.target.id];
    if (id === 'age') {
      //age인 경우 숫자로 변환
      value = Number(value);
      if (value == 0)
        //but 0인 경우는 문자열 빈칸으로 돌려서 placeholder 출력
        value = '';
    }
    setInfo({ ...info, [id]: value });
  };

  // useEffect(() => { deleteETC(); }, []);

  return (
    <InputContainer ref={boxRef}>
      <Flex>
        <AssignThumbnail />
        <MissingPersonDiv>
          <InputDiv>
            <Input
              onChange={handleInfo}
              id="name"
              value={info.name}
              placeholder="실종자 이름"
            ></Input>
          </InputDiv>

          <InputDiv>
            <Input
              onChange={handleInfo}
              id="age"
              type="number"
              value={info.age}
              placeholder="실종자 나이"
            ></Input>
          </InputDiv>

          <InputDiv>
            <Input
              onChange={handleInfo}
              id="gender"
              value={info.gender}
              placeholder="실종자 성별"
            ></Input>
          </InputDiv>
        </MissingPersonDiv>
      </Flex>

      <InputDiv>
        <Input
          onChange={handleInfo}
          id="missingLocation"
          value={info.missingLocation}
          placeholder="실종 위치"
        ></Input>
      </InputDiv>

      <InputDiv>
        <Input
          onChange={handleInfo}
          id="missingTime"
          value={info.missingTime}
          placeholder="실종 시간"
        ></Input>
      </InputDiv>

      <TextAreaDiv>
        <TextArea
          value={info.content}
          onChange={handleResizeHeight}
          id="content"
          rows={1}
          ref={textRef}
          placeholder="기타 특이사항"
        ></TextArea>
      </TextAreaDiv>

      <InputDiv>
        <Input
          onChange={handleInfo}
          id="parentName"
          value={info.parentName}
          placeholder="보호자 성함"
        ></Input>
      </InputDiv>

      <InputDiv>
        <Input
          onChange={handleInfo}
          id="parentNo"
          value={info.parentNo}
          placeholder="보호자 연락처"
        ></Input>
      </InputDiv>
    </InputContainer>
  );
}
export default AssignBasicInfo_Missing;

export const MissingPersonDiv = styled(Flex)`
  margin-left: 4px;

  flex-direction: column;
  gap: 4px;
  ${InputDiv} {
    width: 204px;
    ${Input} {
      width: 80%;
    }
  }
`;
