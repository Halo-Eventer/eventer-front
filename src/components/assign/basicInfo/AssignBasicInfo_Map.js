import styled from 'styled-components';
import { Flex } from 'asset/Style';
import { useEffect, useRef, useState } from 'react';
import Assign_latlng from '../Assign_latlng';
import { useRecoilState } from 'recoil';
import { categoryState_assign, infoState } from 'recoils/atoms_assign';
import AssignMenu from '../AssignMenu';
import AssignImage from '../AssignImage';
import { Input, InputContainer, InputDiv, TextArea, TextAreaDiv } from 'Routes/assign/AssignPage_Home';

function AssignBasicInfo_Map() {

  //*****전역 recoil모음*****
  const [category, setCategory] = useRecoilState(categoryState_assign);
  const [info, setInfo] = useRecoilState(infoState);
  //*****전역 recoil모음*****


  const [active, setActive] = useState(true);
  const textRef = useRef();
  const boxRef = useRef();
  const handleResizeHeight = (e) => {
    // textarea 자동 줄바꿈
    if (e.keyCode == 13 || 8) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
      boxRef.current.style.height = `auto`;
      boxRef.current.style.height = `${boxRef.current.scrollHeight}px`;
    }
    handleInfo(e);
  };

  useEffect(() => {
    if (active) deleteLatLng();
  }, [active]);


  // const deleteType = () => {
  //   const { type, ...rest } = info;
  //   setInfo({ ...rest });
  // };

  
  const deleteLatLng = () => {
    // const { latitude, longitude, ...rest } = info;
    setInfo({ ...info, ['latitude']: '', ['longitude']: '' });
  };
  const handleInfo = (e) => {
    const [value, id] = [e.target.value, e.target.id];

    setInfo({ ...info, [id]: value });
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <div>
      {category != 'amenity' &&
        (category == 'store'
          ? <AssignMenu />
          : <AssignImage />
        )}

      <InputContainer ref={boxRef}>

        <InputDiv>
          <Input onChange={handleInfo} id="name"
            value={info.name} placeholder="제목"></Input>
        </InputDiv>

        {
          category === 'event'
          &&
          <InputDiv>
            <Input onChange={handleInfo} id="subtitle"
              value={info.subtitle} placeholder="부제목"></Input>
          </InputDiv>
        }

        <InputDiv>
          <Input
            onChange={handleInfo} id="summary"
            value={info.summary} placeholder="요약 설명"
          ></Input>
        </InputDiv>

        <InputDiv>
          <Input
            onChange={handleInfo} id="operationHours"
            value={info.value} placeholder="00:00 ~ 00:00"
          ></Input>
        </InputDiv>
        {!active ? (
          <Assign_latlng />
        ) : (
          ''
        )}
        <MapInput>
          <div style={{ marginLeft: '4px' }}>지도 표시</div>
          <CheckBox
            onClick={() => {
              setActive((prev) => !prev);
            }}
            value={active}
            type="checkbox"
          ></CheckBox>
          <InputLatLng
            disabled={true}
            onChange={handleInfo}
            id="latitude"
            value={info.latitude}
          ></InputLatLng>
          <InputLatLng
            disabled={true}
            onChange={handleInfo}
            value={info.longitude}
            id="longitude"
          ></InputLatLng>
        </MapInput>

        <InputDiv>
          <Input onChange={handleInfo} id="location"
            value={info.location} placeholder="위치"></Input>
        </InputDiv>

        {category !== 'amenity'
          &&
          <TextAreaDiv>
            <TextArea
              value={info.content}
              onChange={handleResizeHeight}
              id="content"
              rows={1}
              ref={textRef}
              placeholder="본문 내용"
            ></TextArea>
          </TextAreaDiv>
        }

      </InputContainer>
    </div>

  );
}
export default AssignBasicInfo_Map;

const MapInput = styled(Flex)`
  margin-top: 4px;
  align-items: center;
`;
const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin: 0 4px 0 4px;
`;

const InputLatLng = styled(Input)`
  width: 112px;
  height: 40px;


  padding: 0;
  margin: 0;
  margin-left: 4px;
  padding-left: 8px;

  flex-shrink: 0;
  
  background-color: ${(props) => {
    return props.disabled ? '#DDD' : '';
  }};

  color: #111;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 160% */
`;