import { useEffect, useRef, useState } from 'react';
import { imageUploadApi } from '../../apis/apis';
import { Input, InputBox, SemiTitle } from './Assign';
import styled from 'styled-components';

import images_preview from 'asset/assign/input_images.png';
import delete_images from 'asset/assign/delete_images.svg';
import { Flex } from 'asset/Style';
import AssignThumbnail from './AssignThumbnail';
function AssignImage(props) {
  const imagesInput = useRef(null);

  const [imagePreview, setImagePreview] = useState([]);
  const handleImg = (e) => {
    imageUploadApi(e.target.files[0])
      .then((res) => {
        props.setImg([...props.img, res.data]);
        setImagePreview([...props.img, res.data]);
      })
      .catch((err) => {
        alert(err.response.data.error)
      });
  };

  const handleDeleteImages = (deleteImg) => {
    const processedImages = props.img.filter((images) => {
      return deleteImg != images;
    });

    props.setImg(processedImages);
    setImagePreview(processedImages);
    // const { type, ...rest } = props.img;
    // props.setImg([...rest]);
  };

  return (
    <div>
      <AssignThumbnail setThumbnail={props.setThumbnail} />
      <Flex style={{ marginTop: '8px' }}>
        <InputImages
          onClick={() => {
            imagesInput.current.click();
          }}
          src={images_preview}
        ></InputImages>
        <ImagesPreviewBox ImagesPreview={imagePreview}>
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
`;

const DeleteImages = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  &:hover {
    cursor: pointer;
  }
`;
