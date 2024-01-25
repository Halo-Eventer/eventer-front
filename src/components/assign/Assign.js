import styled from 'styled-components';
import { Flex } from '../../asset/Style';
import { useState } from 'react';
import AssignBasicInfo from './AssignBasicInfo';
import AssignImage from './AssignImage';
import AssignBtn from './AssignBtn';
import AssignMenu from './AssignMenu';

function Assign(props) {
  const [info, setInfo] = useState({ isOperation: true, type: '주점' });

  const [category, setCategory] = useState(props.category);

  const [img, setImg] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [menus, setMenus] = useState([]);
  console.log(menus);
  console.log(category);
  return (
    <AssignContainer>
      <AssignBtn
        info={info}
        category={category}
        img={img}
        thumbnail={thumbnail}
        menus={menus}
      />
      <InfoContainer>
        {category == 'store' ? (
          <AssignMenu
            menus={menus}
            thumbnail={thumbnail}
            setMenus={setMenus}
            setThumbnail={setThumbnail}
          />
        ) : (
          <AssignImage
            img={img}
            thumbnail={thumbnail}
            setImg={setImg}
            setThumbnail={setThumbnail}
          />
        )}

        <AssignBasicInfo
          setInfo={setInfo}
          setCategory={setCategory}
          info={info}
          category={category}
        />
      </InfoContainer>
    </AssignContainer>
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

const AssignContainer = styled.div`
  margin-left: 32px;
`;

const InfoContainer = styled.div`
  width: 352px;
  height: 536px;
  padding: 0;
  flex-shrink: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const InputBox = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  padding: 0;
  margin-left: 8px;
  margin-top: 8px;
  background: #fafafa;
  height: 24px;
  width: 300px;
  border-radius: 4px;
  border: 0;

  color: #111;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 160% */

  &::placeholder {
    display: flex;
    align-items: center;
  }
  &:focus {
    outline: none;
  }
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
  padding: 0;
  margin: 0;
  margin-left: 4px;
  padding-left: 8px;
  width: 116px;
  height: 40px;
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
