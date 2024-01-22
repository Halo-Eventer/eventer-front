import { useRef, useState } from 'react';
import { Input, InputBox } from './Assign';
import thumbnail_preview from 'asset/assign/input_thumbnail.png';
import { imageUploadApi } from 'apis/apis';
import styled from 'styled-components';

function AssignThumbnail(props) {
  const thumbnailInput = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(thumbnail_preview);
  const handleImg = (e) => {
    imageUploadApi(e.target.files[0])
      .then((res) => {
        props.setThumbnail(res.data);
        setThumbnailPreview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
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
  );
}

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

export default AssignThumbnail;
