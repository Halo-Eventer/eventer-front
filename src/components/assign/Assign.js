import styled from 'styled-components';
import { Flex } from '../../asset/Style';
import { useEffect, useRef, useState } from 'react';
import { assignApi } from '../../apis/apis';
import AssignBtn from './AssignBtn';
import AssignImage from './AssignImage';
import AssignBasicInfo from './AssignBasicInfo';

function Assign() {
  const [info, setInfo] = useState({ isOperation: true, type: '주점' });
  const [category, setCategory] = useState('store');
  const [img, setImg] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  return (
    <div>
      <AssignBasicInfo
        setInfo={setInfo}
        setCategory={setCategory}
        info={info}
        category={category}
      />
      <AssignImage img={img} setImg={setImg} setThumbnail={setThumbnail} />
      <AssignBtn
        info={info}
        category={category}
        img={img}
        thumbnail={thumbnail}
      />
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

export const InputBox = styled(Flex)`
  width: 400px;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
`;
export const Input = styled.input`
  height: 30px;
`;
export const SemiTitle = styled.div`
  display: flex;
  height: 30px;
`;
export const Category = styled.select`
  width: 200px;
  height: 30px;
`;
