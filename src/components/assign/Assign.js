import styled from 'styled-components';
import { Flex } from '../../asset/Style';
import { useState } from 'react';
import AssignBasicInfo from './AssignBasicInfo';
import AssignImage from './AssignImage';
import AssignBtn from './AssignBtn';

function Assign() {
  const [info, setInfo] = useState({ isOperation: true, type: '주점' });
  const [category, setCategory] = useState('store');
  const [img, setImg] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  console.log(img);
  return (
    <div>
      <AssignImage
        img={img}
        thumbnail={thumbnail}
        setImg={setImg}
        setThumbnail={setThumbnail}
      />
      <AssignBasicInfo
        setInfo={setInfo}
        setCategory={setCategory}
        info={info}
        category={category}
      />

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
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  height: 38px;
  width: 336px;
  border-radius: 4px;
  background: #fafafa;
  border: 0;
`;
export const SemiTitle = styled.div`
  display: flex;
  height: 30px;
`;
export const Category = styled.select`
  width: 200px;
  height: 30px;
`;
export const InputLatLng = styled(Input)`
  margin-left: 4px;
  width: 116px;
  height: 40px;
  flex-shrink: 0;
  background-color: ${(props) => {
    return props.disabled ? '#DDD' : '';
  }};
`;
