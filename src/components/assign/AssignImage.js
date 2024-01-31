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



  useEffect(()=>{
    console.log("IMAGE RERENDERING!! NOT MOUNTING",props.mode);
    setImagePreview(props.img);
    }
    ,[props.img,props.mode,props.itemID]);

  useEffect(()=>{
      props.setInfo({...props.info,
        thumbnail:props.thumbnail,
        images:props.img,
        menus:props.menus});
  },[props.thumbnail,props.img])

  return (
    <div>
      <AssignThumbnail 
      thumbnail = {props.thumbnail}
      setThumbnail={props.setThumbnail}

      mode={props.mode}
      itemID={props.itemID}
      />

      <Flex style={{ marginTop: '8px'}}>
        <InputImages
          onClick={() => {
            imagesInput.current.click();
          }}
          src={images_preview}
        ></InputImages>
        <ImagesPreviewBox ImagesPreview={imagePreview}>
          {imagePreview.map((item, index) => {
            return (
              <div key={index}
                style={{
                  position:'relative',
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
                <IndexImage>{index+1}</IndexImage>
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

  border:1px solid #EEE;
`;

const DeleteImages = styled.img`
  position:absolute;
  left:4px;
  top:4px;

  width: 20px;
  height: 20px;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
  }
`;

const IndexImage = styled.p`
position:absolute;
bottom:4px;
right:4px;

width:16px;
height:16px;
background-color:rgba(255,255,255,0.7);
border-radius:12px;


text-align:center;
font-size:12px;
line-height:18px;
color:#333;
`;