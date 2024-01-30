import styled from 'styled-components';

import { Flex } from '../../asset/Style';
import { useState, useEffect } from 'react';

import Assign_latlng from './Assign_latlng';
import AssignBasicInfo from './AssignBasicInfo';
import AssignImage from './AssignImage';
import AssignBtn from './AssignBtn';
import AssignMenu from './AssignMenu';
import AssignBasicInfo_BoardOnly from './AssignBasicInfo_Board';

function Assign(props) {
  //const [info, setInfo] = useState(props.itemInfo);

  /*const [category,setCategory] = useState(props.category);
   => 이렇게 하면 하위 컴포넌트에서 렌더링이 한박자 늦게됨. 
   그냥 fucntion Assign({category})를 하던가
   props.category처럼 일일이 props.를 달아주던가 해야함 */


  const [img, setImg] = useState(props.info.images);
  const [thumbnail, setThumbnail] = useState(props.info.thumbnail);
  const [menus, setMenus] = useState([]);
  console.log(menus);
  console.log('category', props.category);
 

  useEffect(() => {
    if (props.category == 'store') {
      props.setInfo({ ...props.info, ['type']: props.type });
    }
  }, [props.category, props.type]);
  console.log(props.info, props.category, thumbnail, menus);


  useEffect(()=>{
    console.log("RERENDERING!! NOT MOUNTING!: ",props.info);
    setImg(props.info.images);
    setThumbnail(props.info.thumbnail);
    setMenus(props.info.menus)
  },
  [props.info.images,
    props.info.thumbnail,
    props.info.menus,
    props.itemID,
    props.mode]);
  //for rerendering("상위 컴포넌트의 setState 비동기 변화"에 같이 리렌더링 되도록)

  return (
    <AssignContainer>
      <AssignBtn
        itemID={props.itemID}
        info={props.info}
        category={props.category}
        img={img}
        thumbnail={thumbnail}
        menus={menus}

        cancle={props.cancle}
        setCancle={props.setCancle}
        mode = {props.mode}
        setMode = {props.setMode}
        setUpdated={props.setUpdated}
      />
      <InfoContainer>
        {props.category == 'store' ? (
          <AssignMenu
            menus={menus}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            setMenus={setMenus}

            info={props.info}
            setInfo={props.setInfo}

            itemID={props.itemID}
            mode={props.mode}
          />
        ) : (
          <AssignImage
            img={img}
            setImg={setImg}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}

            info={props.info}
            setInfo={props.setInfo}

            itemID={props.itemID}
            mode={props.mode}
          />
        )}

        {props.category == 'notice'
        ?
        <AssignBasicInfo_BoardOnly
          setInfo={props.setInfo}
          setCategory={props.setCategory}
          info={props.info}
          category={props.category}
        />
        :
        <AssignBasicInfo
          setInfo={props.setInfo}
          setCategory={props.setCategory}
          info={props.info}
          category={props.category}
        />
        }
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
`;

const InfoContainer = styled.div`
  width: 352px;
  height: 536px;
  padding: 0;
  flex-shrink: 0;
  overflow-y: scroll;
  /* &::-webkit-scrollbar {
  } */
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
