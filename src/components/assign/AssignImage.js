import { useEffect, useRef, useState } from 'react';
import { imageUploadApi } from '../../apis/apis';
import { Input, InputBox, SemiTitle } from './Assign';
import styled from 'styled-components';
import thumbnail_preview from 'asset/assign/input_thumbnail.png';
import images_preview from 'asset/assign/input_images.png';
import delete_images from 'asset/assign/delete_images.svg';
import { Flex } from 'asset/Style';
function AssignImage(props) {
  const thumbnailInput = useRef(null);
  const imagesInput = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(thumbnail_preview);
  const [imagePreview, setImagePreview] = useState([]);
  const handleImg = (e) => {
    imageUploadApi(e.target.files[0])
      .then((res) => {
        if (e.target.id == 'thumbnail') {
          props.setThumbnail(res.data);
          setThumbnailPreview(res.data);
        } else {
          props.setImg([...props.img, res.data]);
          setImagePreview([...props.img, res.data]);
        }
        // fileReader.onload = function (e) {
        //   setThumbnailPreview(e.target);
        // };
        // const fileReader = new FileReader();
        // fileReader.readAsDataURL(e.target.files[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteImages = (deleteImg) => {
    console.log(props.img);
    console.log(deleteImg);

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
      <InputBox>
        <InputThumbnail
          onClick={() => {
            thumbnailInput.current.click();
          }}
          src={thumbnailPreview}
        />
        <Input
          style={{ display: 'none' }}
          accept="image/*"
          id="thumbnail"
          onChange={handleImg}
          type="file"
          ref={thumbnailInput}
        ></Input>
      </InputBox>
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

const InputThumbnail = styled.img`
  width: 352px;
  height: 352px;
  border-radius: 4px;
  margin-top: 8px;
  border: 1px solid #eee;
  &:hover {
    cursor: pointer;
  }
`;
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
