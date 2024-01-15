import styled from 'styled-components';
import { Flex } from '../../asset/Style';
import { useEffect, useRef, useState } from 'react';
import { assignApi } from '../../apis/apis';

function Assign() {
  const [info, setInfo] = useState({ isOperation: true, type: '주점' });
  const [category, setCategory] = useState('store');

  const deleteType = () => {
    const { type, ...rest } = info;
    setInfo({ ...rest });
  };
  const handleInfo = (e) => {
    const [value, id] = [e.target.value, e.target.id];
    if (id == 'category') {
      setCategory(value);
      if (value != 'store') {
        deleteType();
      } else {
        setInfo({ ...info, ['type']: '주점' });
      }
    } else {
      setInfo({ ...info, [id]: value });
    }
  };
  const assignMarker = (e) => {
    assignApi(info, category)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(info);
  return (
    <div>
      <InputBox>
        <semiTitle>이름</semiTitle>
        <Input onChange={handleInfo} id="name" placeholder="이름"></Input>
      </InputBox>
      <InputBox>
        <semiTitle>요약설명</semiTitle>
        <Input
          onChange={handleInfo}
          id="summary"
          placeholder="요약 설명"
        ></Input>
      </InputBox>
      <InputBox>
        <semiTitle>운영 시간</semiTitle>
        <Input
          onChange={handleInfo}
          id="operationHours"
          placeholder="00:00 ~ 00:00"
        ></Input>
      </InputBox>
      <InputBox>
        <semiTitle>위도 / 경도</semiTitle>
        <Input onChange={handleInfo} id="latitude" placeholder="위도"></Input>
        <Input onChange={handleInfo} id="longitude" placeholder="경도"></Input>
      </InputBox>
      <InputBox>
        <semiTitle>세부 위치</semiTitle>
        <Input onChange={handleInfo} id="location" placeholder="위치"></Input>
      </InputBox>
      <InputBox>
        <semiTitle>카테고리</semiTitle>
        <Category id="category" onChange={handleInfo}>
          <option value="store">주점/푸드트럭</option>
          <option value="event">이벤트</option>
          <option value="booth">부스</option>
          <option value="amenity">편의시설</option>
        </Category>
      </InputBox>
      {category == 'store' ? (
        <InputBox>
          <semiTitle>주점/푸드트럭</semiTitle>
          <Category id="type" onChange={handleInfo}>
            <option value="주점">주점</option>
            <option value="푸드트럭">푸드트럭</option>
          </Category>
        </InputBox>
      ) : (
        ''
      )}
      <AssignButton onClick={assignMarker}>마커 등록하기</AssignButton>
    </div>
  );
}

// {
//     "name" :"주점1",
//     "summary": "전과 막걸리를 팔고 있어요",
//     "isOperation": true,
//     "operationHours" : "16:00~22:00",
//     "latitude":37.550991791122394,
//     "longitude":127.07476720170447,
//     "type": "주점"
// }
export default Assign;

const InputBox = styled(Flex)`
  width: 400px;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
`;
const Input = styled.input`
  height: 30px;
`;
const semiTitle = styled.div`
  display: flex;
  height: 30px;
`;
const Category = styled.select`
  width: 200px;
  height: 30px;
`;

const AssignButton = styled.button`
  margin-top: 20px;
  width: 400px;
  height: 40px;
`;
