import { useRef, useState, useEffect } from 'react';
import { Input, InputBox } from './Assign';
import thumbnail_preview from 'asset/assign/input_thumbnail.png';
import { imageUploadApi } from 'apis/apis';
import styled from 'styled-components';

function AssignThumbnail(props) {
  const thumbnailInput = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const handleImg = (e) => {
    if(e.target.files[0]!=undefined){
    imageUploadApi(e.target.files[0])
      .then((res) => {
        props.setThumbnail(res.data);
        setThumbnailPreview(res.data);
      })
      .catch((err) => {
        alert(err.response.data.error)
      });
    }
  };

  useEffect(()=>{
    console.log("THUMBNAIL RERENDERING : ",props.mode,thumbnailPreview);
    if (props.mode==='a')
      setThumbnailPreview(thumbnail_preview)
    else if (props.mode==='r')
      setThumbnailPreview(props.thumbnail)}
  ,[props.thumbnail,props.mode,props.itemID]);

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
  width: 350px;
  height: 352px;
  border-radius: 4px;
  margin-top: 8px;
  border: 1px solid #eee;
  &:hover {
    cursor: pointer;
  }
`;

export default AssignThumbnail;
