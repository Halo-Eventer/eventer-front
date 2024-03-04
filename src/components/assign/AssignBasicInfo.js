import styled from 'styled-components';
import { Category, Input, InputLatLng, SemiTitle } from './Assign';
import { Flex } from 'asset/Style';
import { useCallback, useEffect, useRef, useState } from 'react';
import Assign_latlng from './Assign_latlng';

function AssignBasicInfo(props) {
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

  let info = props.info;

  const deleteType = () => {
    const { type, ...rest } = info;
    props.setInfo({ ...rest });
  };
  const deleteLatLng = () => {
    // const { latitude, longitude, ...rest } = info;
    props.setInfo({ ...info, ['latitude']: '', ['longitude']: '' });
  };
  const handleInfo = (e) => {
    const [value, id] = [e.target.value, e.target.id];

    props.setInfo({ ...info, [id]: value });
  };
  
  useEffect(() => {
    console.log(props.info);
  }, [props.info]);

  return (
    <InputContainer ref={boxRef}>
      <InputDiv style={{ marginTop: '4px' }}>
        <Input onChange={handleInfo} id="name" 
        value = {props.info.name} placeholder="제목"></Input>
      </InputDiv>

      {
      props.category==='event'
      &&
      <InputDiv style={{ marginTop: '4px' }}>
        <Input onChange={handleInfo} id="subtitle" 
        value = {props.info.subtitle} placeholder="부제목"></Input>
      </InputDiv>
      }

      <InputDiv style={{ marginTop: '4px' }}>
        <Input
          onChange={handleInfo} id="summary"
          value = {props.info.summary} placeholder="요약 설명"
        ></Input>
      </InputDiv>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input
          onChange={handleInfo} id="operationHours"
          value = {props.info.value} placeholder="00:00 ~ 00:00"
        ></Input>
      </InputDiv>
      {!active ? (
        <Assign_latlng info={props.info} setInfo={props.setInfo} />
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
          value={props.info.latitude}
        ></InputLatLng>
        <InputLatLng
          disabled={true}
          onChange={handleInfo}
          value={props.info.longitude}
          id="longitude"
        ></InputLatLng>
      </MapInput>

      <InputDiv style={{ marginTop: '4px' }}>
        <Input onChange={handleInfo} id="location" 
        value = {props.info.location}placeholder="위치"></Input>
      </InputDiv>

      {props.category!=='amenity'
      &&
      <TextAreaDiv style={{ width: '336px' }}>
        <TextArea
          value={props.info.content}
          onChange={handleResizeHeight}
          id="content"
          rows={1}
          ref={textRef}
          placeholder="본문 내용"
          style={{ marginTop: '12px', height: '96px' }}
        ></TextArea>
      </TextAreaDiv>
      }
      
    </InputContainer>
  );
}
export default AssignBasicInfo;

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
  width: 352px;
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

const MapInput = styled(Flex)`
  margin-top: 4px;
  margin-left: 8px;
  align-items: center;
`;
const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin: 0 4px 0 4px;
`;
