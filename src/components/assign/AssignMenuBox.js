import { Flex } from 'asset/Style';
import delete_menuBox from 'asset/assign/delete_menuBox.svg';
import images_preview from 'asset/assign/input_images.png';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Input } from './Assign';
import { imageUploadApi } from 'apis/apis';

function AssignMenuBox(props) {
  const [info, setInfo] = useState({});
  const [menuImg, setMenuImg] = useState(images_preview);
  const handleMenu = (e) => {
    const [id, value] = [e.target.id, e.target.value];
    setInfo({ ...info, [id]: value });
    console.log(props.menus);
  };

  useEffect(() => {
    const updatedMenus = props.menus.map((menu, i) => {
      if (i === props.i) {
        return { ...menu, ...info };
      }
      return menu;
    });
    console.log(updatedMenus);
    props.setMenus(updatedMenus);
  }, [info]);

  console.log(info);
  const handleImg = (e) => {
    imageUploadApi(e.target.files[0])
      .then((res) => {
        setInfo({ ...info, ['image']: res.data });
        setMenuImg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
            />
          </InputBox>
          <InputBox style={{ marginTop: '4px' }}>
            <MenuNamePrice
              onChange={handleMenu}
              id="price"
              placeholder="가격"
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
  width: 352px;
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
