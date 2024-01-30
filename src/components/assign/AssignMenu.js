import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { Flex } from 'asset/Style';
import AssignThumbnail from './AssignThumbnail';
import AssignMenuBox from './AssignMenuBox';

import images_preview from 'asset/assign/input_images.png';

function AssignMenu(props) {
  const handleAddMenu = () => {
    props.setMenus([...props.menus, {image:images_preview}]);
  };
  const handleDeleteMenuBox = (menuI) => {
    const filteredMenus = props.menus?.filter((e, i) => i !== menuI);
    props.setMenus(filteredMenus);
  };

  useEffect(()=>{
      props.setInfo({...props.info,
        thumbnail:props.thumbnail, 
        menus:props.menus});
  },[props.thumbnail,props.menus])


  return (
    <div style={{ width: '352px' }}>
      <AssignThumbnail
        thumbnail={props.thumbnail}
        setThumbnail={props.setThumbnail}

        mode={props.mode}
        itemID={props.itemID}/>
        
      <AddMenuBox onClick={handleAddMenu}>메뉴 추가하기</AddMenuBox>
      {props.menus?.map((e, i) => {
        return (
          <AssignMenuBox
            i={i}
            onDelete={() => handleDeleteMenuBox(i)}
            setMenus={props.setMenus}
            menus={props.menus}
            fetchedImage = {e.image}
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
