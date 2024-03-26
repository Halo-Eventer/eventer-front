import { useEffect, useRef, useState } from 'react';
import { imageUploadApi } from '../../apis/apis';
import styled from 'styled-components';

import images_preview from 'asset/assign/input_images.png';
import delete_images from 'asset/assign/delete_images.svg';
import { Flex } from 'asset/Style';
import AssignThumbnail from './AssignThumbnail';
import { useRecoilState } from 'recoil';
import { infoState, itemIDState, modeState } from 'recoils/atoms_assign';
import { Input } from 'Routes/assign/AssignPage_Home';



function AssignImage() {
    //*****전역 recoil모음*****
    const [mode,setMode]=useRecoilState(modeState);
    const [itemID, setItemID] = useRecoilState(itemIDState);
    const [info, setInfo] = useRecoilState(infoState);
    //*****전역 recoil모음*****

  const imagesInput = useRef(null);

  const handleImg = (e) => {
    imageUploadApi(e.target.files[0])
      .then((res) => {
        console.log("res.data, info.images:",res.data, info.images);
        let tmp = [...info.images, res.data]
        setInfo({...info,images:tmp});
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDeleteImages = (deleteImg) => {
    const processedImages = info.images.filter((images) => {
      return deleteImg != images;
    });

    setInfo({...info,images:processedImages});
  };


  console.log("info",info);
  useEffect(()=>{
    console.log("mode",mode);
    }
    ,[info.images,
      mode,
      itemID]);

  return (
    <div>
      <AssignThumbnail/>
      <Flex style={{ marginTop: '8px'}}>

        <InputImages
          onClick={() => {
            imagesInput.current.click();
          }}
          src={images_preview}
        ></InputImages>

        <ImagesPreviewBox ImagesPreview={info.image}>
          {info.images?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: '96px',
                  height: '96px',
                  marginLeft: '4px',
                }}
              >
                <DeleteImages
                  onClick={() => handleDeleteImages(item)}
                  src={delete_images}
                ></DeleteImages>
                <ImagesPreview src={item} />
                <IndexImage>{index + 1}</IndexImage>
              </div>
            );
          })}
        </ImagesPreviewBox>
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

export default AssignImage;

const InputImages = styled.img`
  width: 96px;
  height: 96px;
  &:hover {
    cursor: pointer;
  }
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

  border: 1px solid #eee;
`;

const DeleteImages = styled.img`
  position: absolute;
  left: 4px;
  top: 4px;

  width: 20px;
  height: 20px;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
  }
`;

const IndexImage = styled.p`
  position: absolute;
  bottom: 4px;
  right: 4px;

  width: 16px;
  height: 16px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;

  text-align: center;
  font-size: 12px;
  line-height: 18px;
  color: #333;
`;
