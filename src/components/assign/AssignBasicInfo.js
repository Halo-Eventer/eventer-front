import styled from 'styled-components';
import { Category, Input, InputLatLng, SemiTitle } from './Assign';
import { Flex } from 'asset/Style';
import { useEffect, useState } from 'react';

function AssignBasicInfo(props) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (active) deleteLatLng();
    console.log(props);
  }, [active]);
  console.log(active);
  let info = props.info;
  let category = props.category;
  const deleteType = () => {
    const { type, ...rest } = info;
    props.setInfo({ ...rest });
  };
  const deleteLatLng = () => {
    // const { latitude, longitude, ...rest } = info;
    props.setInfo({ ...info, ['latitude']: 0, ['longitude']: 0 });
  };
  const handleInfo = (e) => {
    const [value, id] = [e.target.value, e.target.id];
    if (id == 'category') {
      props.setCategory(value);
      if (value != 'store') {
        deleteType();
      } else {
        props.setInfo({ ...info, ['type']: '주점' });
      }
    } else {
      props.setInfo({ ...info, [id]: value });
    }
  };

  return (
    <InputContainer>
      <Input onChange={handleInfo} id="name" placeholder="제목 작성"></Input>

      <Input
        style={{ marginTop: '4px' }}
        onChange={handleInfo}
        id="summary"
        placeholder="요약 설명"
      ></Input>

      <Input
        style={{ marginTop: '4px' }}
        onChange={handleInfo}
        id="operationHours"
        placeholder="00:00 ~ 00:00"
      ></Input>
      <MapInput>
        <div>지도 표시</div>
        <CheckBox
          onClick={() => {
            setActive((prev) => !prev);
          }}
          value={active}
          type="checkbox"
        ></CheckBox>
        <InputLatLng
          disabled={active}
          onChange={handleInfo}
          id="latitude"
          value={props.info.latitude}
          placeholder="위도 입력"
        ></InputLatLng>
        <InputLatLng
          disabled={active}
          onChange={handleInfo}
          value={props.info.longitude}
          id="longitude"
          placeholder="경도 입력"
        ></InputLatLng>
      </MapInput>
      <Input
        style={{ marginTop: '4px' }}
        onChange={handleInfo}
        id="location"
        placeholder="위치"
      ></Input>
      <Input
        style={{ marginTop: '12px', height: '96px' }}
        onChange={handleInfo}
        id="content"
        placeholder="본문 내용"
      ></Input>

      <Category id="category" onChange={handleInfo}>
        <option value="store">주점/푸드트럭</option>
        <option value="event">이벤트</option>
        <option value="booth">부스</option>
        <option value="amenity">편의시설</option>
      </Category>

      {category == 'store' ? (
        <div>
          <SemiTitle>주점/푸드트럭</SemiTitle>
          <Category id="type" onChange={handleInfo}>
            <option value="주점">주점</option>
            <option value="푸드트럭">푸드트럭</option>
          </Category>
        </div>
      ) : (
        ''
      )}
    </InputContainer>
  );
}
export default AssignBasicInfo;

const InputContainer = styled.div`
  padding: 8px;
  margin-top: 8px;
  width: 352px;
  height: 304px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #eee;
`;

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
