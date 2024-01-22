import { useEffect, useRef, useState } from 'react';
import { imageUploadApi } from '../../apis/apis';
import { Input, InputBox, SemiTitle } from './Assign';
import styled from 'styled-components';
import images_preview from 'asset/assign/input_images.png';
import delete_images from 'asset/assign/delete_images.svg';

import { Flex } from 'asset/Style';
import AssignThumbnail from './AssignThumbnail';
import AssignMenuBox from './AssignMenuBox';

function AssignMenu(props) {
  const imagesInput = useRef(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [menus, setMenus] = useState([]);
  const handleImg = (e) => {
    imageUploadApi(e.target.files[0])
      .then((res) => {
        props.setImg([...props.img, res.data]);
        setImagePreview([...props.img, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddMenu = () => {
    setMenus([...menus, {}]);
  };
  const handleDeleteMenuBox = (menuI) => {
    console.log(menus);
    const filteredMenus = menus?.filter((e, i) => i !== menuI);

    setMenus(filteredMenus);
  };
  console.log(menus);
  return (
    <div>
      <AssignThumbnail setThumbnail={props.setThumbnail} />
      <AddMenuBox onClick={handleAddMenu}>메뉴 추가하기</AddMenuBox>
      {menus?.map((e, i) => {
        return (
          <AssignMenuBox
            i={i}
            onDelete={() => handleDeleteMenuBox(i)}
            setMenus={setMenus}
            menus={menus}
          />
        );
      })}

      <Flex style={{ marginTop: '8px' }}>
        {/* <ImagesPreviewBox ImagesPreview={imagePreview}>
          {imagePreview.map((e) => {
            return (
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  marginLeft: '4px',
                }}
              >
                <DeleteImages
                  onClick={() => handleDeleteImages(e)}
                  src={delete_images}
                ></DeleteImages>
                <ImagesPreview src={e} />
              </div>
            );
          })}
        </ImagesPreviewBox> */}
        <Input
          style={{ display: 'none' }}
          accept="image/*"
          id="images"
          onChange={handleImg}
          type="file"
          ref={imagesInput}
        ></Input>
      </Flex>
    </div>
  );
}

export default AssignMenu;

const AddMenuBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 352px;
  height: 48px;
  border-radius: 4px;
  background: #f2f2f2;
  color: #111;

  font-size: 15px;
  font-weight: 700;
  line-height: 32px; /* 213.333% */

  margin-top: 8px;

  &:hover {
    cursor: pointer;
  }
`;
const MenuBox = styled.div`
  width: 352px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #eee;
  margin-top: 8px;
`;

const ImagesPreviewBox = styled.div`
  display: flex;

  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  width: 252px;
  height: 96px;
  border-radius: 4px;
  background: ${(props) => {
    if (props.ImagesPreview == []) {
      return '#ddd';
    }
  }};
`;

const ImagesPreview = styled.img`
  width: 96px;
  height: 96px;
  flex-shrink: 0;
`;

const DeleteImages = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  &:hover {
    cursor: pointer;
  }
`;
