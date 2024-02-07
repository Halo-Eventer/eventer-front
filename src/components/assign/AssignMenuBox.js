import { Flex } from 'asset/Style';
import delete_menuBox from 'asset/assign/delete_menuBox.svg';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Input } from './Assign';
import { imageUploadApi } from 'apis/apis';

function AssignMenuBox(props) {
  const [menuInfo, setMenuInfo] = useState({});
  const [menuImg, setMenuImg] = useState("");
  const handleMenu = (e) => {
    const [id, value] = [e.target.id, e.target.value];
    setMenuInfo({ ...menuInfo, [id]: value });
  };

  useEffect(()=>{
    setMenuImg(props.fetchedImage);
  },[]);
  useEffect(() => {
    const updatedMenus = props.info.menus.map((menu, i) => {
      if (i === props.i) {
        return { ...menu, ...menuInfo };
      }
      return menu;
    });
    props.setInfo({...props.info,menus:updatedMenus});
  }, [menuInfo]);

  const handleImg = (e) => {
    if(e.target.files[0]!=undefined){
    imageUploadApi(e.target.files[0])
      .then((res) => {
        setMenuInfo({ ...menuInfo, ['image']: res.data });
        setMenuImg(res.data);
      })
      .catch((err) => {
        alert(err.response.data.error)
            });
          }
  };
  const handleDeleteMenuBox = () => {
    props.onDelete(); // props.setmenus();
  };

  const menuInput = useRef(null);
  return (
    <MenuContainer>
      <Flex style={{ marginTop: '8px' }}>
        <InputImages
          onClick={() => {
            menuInput.current.click();
          }}
          src={menuImg}
        ></InputImages>
        <Input
          style={{ display: 'none' }}
          accept="image/*"
          id="image"
          onChange={handleImg}
          type="file"
          ref={menuInput}
        ></Input>
        <div style={{ marginLeft: '4px', width: '212px' }}>
          <InputBox>
            <MenuNamePrice
              onChange={handleMenu}
              id="name"
              placeholder="메뉴 이름 작성"
              value={props.e.name}
            />
          </InputBox>
          <InputBox style={{ marginTop: '4px' }}>
            <MenuNamePrice
              onChange={handleMenu}
              id="price"
              placeholder="가격"
              value={props.e.price}
            />
          </InputBox>
        </div>
        <DeleteMenuBox onClick={handleDeleteMenuBox} src={delete_menuBox} />
      </Flex>
    </MenuContainer>
  );
}
const MenuContainer = styled(Flex)`
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid #eee;
  width: 350px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #eee;
  flex-shrink: 0;
`;

const InputImages = styled.img`
  width: 84px;
  height: 84px;
  margin-left: 8px;
  &:hover {
    cursor: pointer;
  }
`;

const MenuNamePrice = styled.input`
  color: #777;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px; /* 160% */

  border: 0;
  background: #fafafa;
  margin-top: 8px;
  margin-left: 8px;
`;
const DeleteMenuBox = styled.img`
  margin-left: 4px;
  width: 32px;
  height: 84px;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
  }
`;

const InputBox = styled.div`
  width: 212px;
  height: 40px;
  flex-shrink: 0;
  background: #fafafa;
`;
export default AssignMenuBox;
